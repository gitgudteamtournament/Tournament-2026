# Tournament Task 2026 — Backend

Система керування турнірними раундами (Rounds), подачею результатів (Submissions) та оцінюванням журі (Jury Evaluation).

---

## Структура нових файлів

### 1. Models (`src/main/java/org/example/model/`)

**`Round.java`** — модель раунду (завдання). Відображає таблицю `rounds`. Поля:
- `id`, `tournamentId`, `title`, `description`, `techRequirements`, `requirements` (must have критерії), `materials` (додаткові матеріали), `roundOrder` (порядковий номер), `startTime`, `endTime`, `status` (DRAFT → ACTIVE → SUBMISSION_CLOSED → EVALUATED), `createdAt`, `updatedAt`

**`Submission.java`** — модель сабміту (робота команди). Таблиця `submissions`. Поля:
- `id`, `roundId`, `teamId`, `githubLink` (обов'язковий), `videoLink` (обов'язковий), `liveDemoLink`, `description`, `status` (SUBMITTED), `submittedAt`, `updatedAt`, `teamName` (denormalized для зручності)

**`JuryAssignment.java`** — модель призначення роботи члену журі. Таблиця `jury_assignments`. Поля:
- `id`, `submissionId`, `juryId`, `assignedAt`, `status`

**`Evaluation.java`** — модель оцінки. Таблиця `evaluations`. Поля:
- `id`, `submissionId`, `juryId`, `backendQuality`, `databaseScore`, `frontendQuality`, `functionalityScore`, `usabilityScore`, `mustHaveCompleteness`, `comment`, `evaluatedAt`, `juryName`
- Метод `getTotalScore()`: середнє арифметичне всіх заповнених категорій (0-100)

---

### 2. DTOs (`src/main/java/org/example/dto/`)

**`CreateRoundRequest.java`** — вхідні дані для створення/оновлення раунду. Містить ті самі поля що й `Round`, але без `id`, `status`, `createdAt`, `updatedAt` — їх встановлює сервер.

**`SubmissionRequest.java`** — вхідні дані для створення сабміту. Поля: `roundId`, `teamId`, `githubLink`, `videoLink`, `liveDemoLink`, `description`.

**`EvaluationRequest.java`** — вхідні дані для оцінки. Поля: `submissionId`, `juryId`, `backendQuality`, `databaseScore`, `frontendQuality`, `functionalityScore`, `usabilityScore`, `mustHaveCompleteness`, `comment`.

**`DistributeRequest.java`** — параметри розподілу: `roundId`, `evaluationsPerSubmission` (скільки журі на одну роботу, default 2), `maxSubmissionsPerJuror` (максимум робіт на одного журі, default 5).

---

### 3. Repositories (`src/main/java/org/example/repository/`)

**`RoundRepository.java`** — JDBC-репозиторій для `rounds`. Використовує `@Qualifier("mysqlJdbcTemplate")`. Методи:
- `save(Round)` — INSERT зі статусом DRAFT
- `findById(Long)` — пошук за ID
- `findByTournamentId(Long)` — всі раунди турніру, відсортовані за `round_order`
- `findAll()` — всі раунди
- `findActive()` — тільки ACTIVE, сортування за дедлайном
- `updateStatus(Long, String)` — зміна статусу
- `update(Round)` — оновлення полів

**`SubmissionRepository.java`** — JDBC-репозиторій для `submissions`. JOIN з `teams` для отримання `teamName`. Методи:
- `save(Submission)` — INSERT зі статусом SUBMITTED
- `findById(Long)` — з teamName
- `findByRoundId(Long)` — сабміти раунду
- `findByTeamId(Long)` — сабміти команди
- `existsByRoundAndTeam(Long, Long)` — перевірка дубліката

**`JuryAssignmentRepository.java`** — JDBC-репозиторій для `jury_assignments`. Методи:
- `assign(Long submissionId, Long juryId)` — INSERT IGNORE
- `clearByRoundId(Long)` — DELETE через JOIN з submissions
- `findJuryIdsBySubmissionId(Long)` — хто призначений на роботу
- `findSubmissionIdsByJuryId(Long)` — які роботи призначені журі

**`EvaluationRepository.java`** — JDBC-репозиторій для `evaluations`. JOIN з `users` для `juryName`. Методи:
- `saveOrUpdate(Evaluation)` — INSERT … ON DUPLICATE KEY UPDATE (дозволяє переоцінювати)
- `findBySubmissionAndJury(Long, Long)` — конкретна оцінка
- `findBySubmissionId(Long)` — всі оцінки роботи
- `findByJuryId(Long)` — всі оцінки журі
- `findByRoundId(Long)` — всі оцінки раунду (через JOIN з submissions)

---

### 4. Services (`src/main/java/org/example/service/`)

**`RoundService.java`** — бізнес-логіка раундів:
- `createRound(CreateRoundRequest)` — створює раунд зі статусом DRAFT
- `activate(Long)` — статус → ACTIVE (помилка якщо раунд не знайдено)
- `closeSubmissions(Long)` — статус → SUBMISSION_CLOSED
- `markEvaluated(Long)` — статус → EVALUATED
- `updateRound(Long, CreateRoundRequest)` — оновлює поля існуючого раунду
- `getActiveRounds()` — делегує в `RoundRepository.findActive()`

**`SubmissionService.java`** — бізнес-логіка сабмітів:
- `createSubmission(SubmissionRequest)` — перевіряє: раунд існує → раунд ACTIVE → немає дубліката → INSERT
- `updateSubmission(Long, SubmissionRequest)` — перевіряє: сабміт існує → раунд ще ACTIVE → UPDATE
- `getSubmissionsByRound(Long)` / `getSubmissionsByTeam(Long)` — делегування

**`EvaluationService.java`** — бізнес-логіка оцінювання:
- `distribute(DistributeRequest)` — рандомний розподіл:
  1. Перевіряє що раунд у статусі SUBMISSION_CLOSED
  2. Очищає попередні призначення для цього раунду
  3. Отримує всі сабміти раунду та всіх користувачів з роллю JURY
  4. Для кожного сабміту випадково обирає `evaluationsPerSubmission` журі (з обмеженням `maxSubmissionsPerJuror`), виключаючи вже призначених
  5. Використовує `Collections.shuffle()` для випадковості
- `saveEvaluation(EvaluationRequest)` — зберігає/оновлює оцінку
- `getAverageScoresByRound(Long)` — групує оцінки за submissionId, рахує середнє арифметичне

---

### 5. Controllers (`src/main/java/org/example/web/`)

**`RoundController.java`** — REST API `/api/rounds`:
- `POST /api/rounds` — створити (body: CreateRoundRequest)
- `GET /api/rounds` — всі раунди
- `GET /api/rounds/active` — активні
- `GET /api/rounds/{id}` — один раунд (404 якщо нема)
- `GET /api/rounds/tournament/{id}` — раунди турніру
- `PUT /api/rounds/{id}` — оновити
- `PUT /api/rounds/{id}/activate` → `PUT /.../close` → `PUT /.../evaluated` — статуси

**`SubmissionController.java`** — REST API `/api/submissions`:
- `POST /api/submissions` — створити (body: SubmissionRequest). Повертає ID або 400 з помилкою
- `PUT /api/submissions/{id}` — оновити
- `GET /api/submissions/{id}` — один сабміт (404)
- `GET /api/submissions/round/{roundId}` — сабміти раунду
- `GET /api/submissions/team/{teamId}` — сабміти команди

**`EvaluationController.java`** — REST API `/api/evaluations`:
- `POST /api/evaluations/distribute` — розподіл (body: DistributeRequest). 400 при помилці
- `POST /api/evaluations` — зберегти оцінку (body: EvaluationRequest)
- `GET /api/evaluations/submission/{id}` — оцінки роботи
- `GET /api/evaluations/my/{juryId}` — оцінки журі
- `GET /api/evaluations/my-assignments/{juryId}` — ID призначених робіт
- `GET /api/evaluations/average/{roundId}` — середні бали по раунду (Map<submissionId, score>)
- `GET /api/evaluations/submission/{sid}/jury/{jid}` — конкретна оцінка (404)

---

### 6. Фронтенд (`src/main/resources/static/`)

**`admin.html`** — панель адміністратора. Дозволяє:
- Створювати раунди (всі поля)
- Змінювати статус раунду (DRAFT → ACTIVE → SUBMISSION_CLOSED → EVALUATED)
- Запускати рандомний розподіл робіт для журі
- Переглядати список раундів та сабмітів
- Переглядати середні бали оцінювання

**`team.html`** — панель команди. Дозволяє:
- Бачити активні раунди з дедлайнами та must have критеріями
- Завантажувати роботу (GitHub + відео + live demo + опис)
- Переглядати свої сабміти

**`jury.html`** — панель журі. Дозволяє:
- Отримати список призначених робіт
- Переглядати посилання (GitHub, відео, live demo) на роботу
- Виставляти бали по 6 категоріях (0-100): Backend, Database, Frontend, Функціональність, Зручність, Must have
- Додавати коментар
- Зберігати/редагувати оцінку

---

### 7. Змінені файли

**`SecurityConfig.java`** — спрощено до `.anyRequest().permitAll()` (всі ендпоінти відкриті для тестування).

**`UserRepository.java`** — додано `findById(Long)` та `findAllByRole(String)` для пошуку журі.

**`pom.xml`** — додано:
- `spring-security-test` (для CSRF у @WebMvcTest)
- byte-buddy 1.15.11 (сумісність з Java 25)

---

### 8. Тести (`src/test/java/org/example/`)

**`service/RoundServiceTest.java`** — 11 тестів:
- createRound: перевіряє що раунд створюється з DRAFT статусом і всіма полями
- getRound: success + null коли не знайдено
- getActiveRounds, getAllRounds, getRoundsByTournament: делегування
- activate: updateStatus("ACTIVE") + throw при відсутності
- closeSubmissions: updateStatus("SUBMISSION_CLOSED")
- markEvaluated: updateStatus("EVALUATED")
- updateRound: перевіряє що всі поля оновлюються + throw при відсутності

**`service/SubmissionServiceTest.java`** — 9 тестів:
- createSubmission: success + throw коли раунд не знайдено + throw коли не ACTIVE + throw при дублікаті
- updateSubmission: success + throw коли сабміт не знайдено + throw коли раунд не ACTIVE
- getSubmission, getSubmissionsByRound, getSubmissionsByTeam: делегування

**`service/EvaluationServiceTest.java`** — 10 тестів:
- distribute: success (assign викликається) + throw коли раунд не CLOSED + throw без сабмітів + throw без журі
- saveEvaluation: всі 7 полів + коментар зберігаються
- getEvaluation, getEvaluationsBySubmission, getMyEvaluations, getMyAssignedSubmissionIds: делегування
- getAverageScoresByRound: коректний підрахунок середнього (80+100)/2=90 + пустий результат

**`web/RoundControllerTest.java`** — 9 тестів: HTTP 200 для всіх успішних ендпоінтів, 404 для not found.

**`web/SubmissionControllerTest.java`** — 8 тестів: 200 + 400 (помилка валідації) + 404.

**`web/EvaluationControllerTest.java`** — 9 тестів: 200 + 400 + 404 для всіх ендпоінтів.

Використано: `@WebMvcTest` + `@MockBean` + `@Import(SecurityConfig.class)` + `MockMvc` + `.with(csrf())`.

---

## API Endpoints

### Auth
| Метод | Шлях | Опис |
|-------|------|------|
| POST | `/auth/register` | Реєстрація |
| POST | `/auth/login` | Логін, повертає JWT |

### Rounds
| Метод | Шлях | Опис |
|-------|------|------|
| GET | `/api/rounds` | Всі раунди |
| GET | `/api/rounds/active` | Активні |
| GET | `/api/rounds/{id}` | За ID |
| GET | `/api/rounds/tournament/{id}` | Раунди турніру |
| POST | `/api/rounds` | Створити |
| PUT | `/api/rounds/{id}` | Оновити |
| PUT | `/api/rounds/{id}/activate` | Активувати |
| PUT | `/api/rounds/{id}/close` | Закрити прийом |
| PUT | `/api/rounds/{id}/evaluated` | Позначити оціненим |

### Submissions
| Метод | Шлях | Опис |
|-------|------|------|
| POST | `/api/submissions` | Створити |
| PUT | `/api/submissions/{id}` | Редагувати |
| GET | `/api/submissions/{id}` | За ID |
| GET | `/api/submissions/round/{roundId}` | Сабміти раунду |
| GET | `/api/submissions/team/{teamId}` | Сабміти команди |

### Evaluations
| Метод | Шлях | Опис |
|-------|------|------|
| POST | `/api/evaluations/distribute` | Розподіл робіт |
| POST | `/api/evaluations` | Зберегти оцінку |
| GET | `/api/evaluations/submission/{id}` | Оцінки роботи |
| GET | `/api/evaluations/my/{juryId}` | Оцінки журі |
| GET | `/api/evaluations/my-assignments/{juryId}` | Призначені роботи |
| GET | `/api/evaluations/average/{roundId}` | Середні бали |
| GET | `/api/evaluations/submission/{sid}/jury/{jid}` | Конкретна оцінка |

## Схема БД

### rounds
`id`, `tournament_id`, `title`, `description`, `tech_requirements`, `requirements`, `materials`, `round_order`, `start_time`, `end_time`, `status` (DRAFT→ACTIVE→SUBMISSION_CLOSED→EVALUATED), `created_at`, `updated_at`

### submissions
`id`, `round_id`, `team_id`, `github_link`, `video_link`, `live_demo_link`, `description`, `status`, `submitted_at`, `updated_at`

### jury_assignments
`id`, `submission_id`, `jury_id`, `assigned_at`, `status`

### evaluations
`id`, `submission_id`, `jury_id`, `backend_quality`, `database_score`, `frontend_quality`, `functionality_score`, `usability_score`, `must_have_completeness`, `comment`, `evaluated_at`

## Фронтенд

| Файл | Опис |
|------|------|
| `/` | Головне меню |
| `/login.html` | Логін |
| `/register.html` | Реєстрація |
| `/admin.html` | Адмін: раунди, статуси, розподіл, результати |
| `/team.html` | Команда: активні раунди, сабміт |
| `/jury.html` | Журі: оцінювання |

## Запуск

1. MySQL та PostgreSQL з `application.properties` мають бути доступні
2. `mvn spring-boot:run`
3. `http://localhost:8080/`

## Тести

```
mvn test
```

Або через IntelliJ: правий клік на `src/test/java` → Run All Tests.

## Оцінювання

Категорії (0–100):
- `backend_quality` — якість бекенду
- `database_score` — база даних
- `frontend_quality` — якість фронтенду
- `functionality_score` — виконання вимог
- `usability_score` — зручність
- `must_have_completeness` — must have критерії

Формула: `total = (backend_quality + database_score + frontend_quality + functionality_score + usability_score + must_have_completeness) / 6`
При кількох оцінювачах: `final = average(всіх total)`
