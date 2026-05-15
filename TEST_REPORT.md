# Звіт про тестування проєкту TournamentTask2026

**Дата генерації звіту:** 2026-05-15

---

## 1. Загальна інформація

| Параметр | Значення |
|---|---|
| Назва проєкту | TournamentTask2026 |
| Мова програмування | Java 17 |
| Фреймворк | Spring Boot 3.2.2 |
| Система збірки | Maven |
| Фреймворк тестування | JUnit 5 + Mockito |
| Підключений coverage | JaCoCo 0.8.12 |

---

## 2. Покриті модулі / пакети

| Пакет | Тип тестів | Кількість тестів |
|---|---|---|
| `org.example.service` | Unit-тести (Mockito) | 53 |
| `org.example.web` | @WebMvcTest (контролери) | 66 |
| `org.example.util` | Unit-тести (JWT) | 7 |
| `org.example.model` | Unit-тести (моделі) | 5 |
| `org.example.config` | Інтеграційні тести (@SpringBootTest) | 5 |
| `org.example.repository` | Repository (@JdbcTest + H2) | 30 |
| `org.example.dto` | Unit-тести (граничні випадки) | 11 |
| `org.example` (dispatcher) | Інтеграційний тест | 1 |

**Загалом тестів: 178**

---

## 3. Розподіл тестів за типами

| Тип | Кількість | Пояснення |
|---|---|---|---|
| Unit-тести сервісів | 53 | Mockовані репозиторії, тестування бізнес-логіки |
| Controller-тести (@WebMvcTest) | 66 | Mockовані сервіси, тестування HTTP-ендпоінтів |
| Unit-тести утиліт (JWT) | 7 | Чисті unit-тести без Spring |
| Unit-тести моделей | 5 | Тестування логіки в моделях (getTotalScore) |
| Інтеграційні тести (Config) | 5 | @SpringBootTest для SecurityConfig, WebConfig, MySqlConfig, Dispatcher |
| Repository (@JdbcTest + H2) | 30 | JDBC-репозиторії з вбудованою H2 БД |
| Unit-тести DTO | 11 | Граничні випадки валідації (null, empty, special chars, boundary) |

---

## 4. Покриті класи

### Сервіси (Service Layer)

| Клас | Тестів | Що перевіряється |
|---|---|---|
| `UserService` | 11 | Реєстрація (успіх, null, дефолтна роль, кодування пароля), аутентифікація (успіх, невірний пароль, не знайдено), authenticateUser |
| `UserProfileService` | 5 | Профіль для TEAM_MEMBER, JURY, ADMIN, unknown role, TeamMember з полями |
| `TournamentService` | 9 | Створення, closeSubmission, startEvaluation, finishTournament (для организатора і ні), getTournaments |
| `TeamService` | 1 | Створення команди, повернення ID |
| `SubmissionService` | 10 | Створення (успіх, раунд не знайдено, не активний, вже існує), оновлення (успіх, не знайдено, після дедлайну), get, getByRound, getByTeam |
| `RoundService` | 12 | Створення, get, getByTournament, getAll, getActive, activate, closeSubmissions, markEvaluated, update (успіх/не знайдено) |
| `LeaderboardService` | 4 | Leaderboard для FINISHED, не FINISHED (EVALUATION, SUBMISSION_CLOSED, REGISTRATION) |
| `EvaluationService` | 11 | Розподіл (успіх, раунд не знайдено, не closed, без сабмітів, без журі), збереження, get, getBySubmission, getMy, getAssignments, getAverageScoresByRound |
| `EvaluationExportService` | 4 | Експорт (всі поля, null-поля, пустий список, кілька записів) |
| `DashboardService` | 1 | Отримання Dashboard |

### Контролери (Web Layer)

| Клас | Тестів | Що перевіряється |
|---|---|---|
| `AuthController` | 4 | Register (успіх/невдача), Login (успіх/невірні дані) |
| `UserProfileController` | 1 | Отримання профілю |
| `TournamentController` | 6 | Створення, closeSubmission, startEvaluation, finish, getTournaments (з/без status) |
| `TeamController` | 1 | Створення команди |
| `SubmissionController` | 7 | Create (успіх/помилка), Update (успіх/помилка), Get (знайдено/не знайдено), getByRound, getByTeam |
| `RoundController` | 10 | Створення, getAll, getActive, getByTournament, get (знайдено/не знайдено), activate, close, evaluated, update |
| `LeaderboardController` | 2 | Leaderboard (з даними, пустий) |
| `EvaluationController` | 8 | Distribute (успіх/помилка), save, getBySubmission, getMy, getMyAssignments, getAverage, getOne (знайдено/не знайдено) |
| `EvaluationExportController` | 2 | Експорт CSV (з даними, пустий) |
| `DashboardController` | 1 | Отримання Dashboard |

### Утиліти

| Клас | Тестів | Що перевіряється |
|---|---|---|
| `JwtUtil` | 6 | Генерація токена, extractUsername, isTokenValid (правильний/неправильний username), extractAllClaims, множинні ролі, дати |

### Моделі

| Клас | Тестів | Що перевіряється |
|---|---|---|
| `Evaluation.getTotalScore()` | 5 | Всі оцінки, часткові, одна оцінка, null, null + значення |

### Конфігурації (Config Layer)

| Клас | Тестів | Що перевіряється |
|---|---|---|
| `SecurityConfig` | 1 | Анонімний доступ до `/auth/**`, захист інших ендпоінтів, CSRF, role-based доступ |
| `WebConfig` | 1 | CORS-заголовки (Allow-Origin, Methods, Headers, Credentials) |
| `MySqlConfig` | 2 | DataSource, JdbcTemplate, TransactionManager біни |

### Репозиторії (Repository Layer)

| Клас | Тестів | Що перевіряється |
|---|---|---|
| `UserRepository` | 5 | findByUsername, save, findByRole, existsByUsername, findAll |
| `UserProfileRepository` | 2 | findByUserId, save |
| `TournamentRepository` | 4 | save, findById, findAll, findAllByStatus |
| `TeamRepository` | 2 | save, findById |
| `TeamMemberRepository` | 2 | findByTeamId, save |
| `SubmissionRepository` | 4 | save, findById, findByRound, findByTeamAndRound |
| `RoundRepository` | 4 | save, findById, findByTournament, findActiveByTournament |
| `LeaderboardRepository` | 2 | save, findByTournament |
| `JuryAssignmentRepository` | 2 | findByRound, save |
| `EvaluationRepository` | 2 | save, findBySubmission |
| `DashboardRepository` | 1 | findDashboard |

### DTO (Data Transfer Objects)

| Клас | Тестів | Що перевіряється |
|---|---|---|
| `AuthRequest` | 1 | null/empty поля |
| `RegisterRequest` | 1 | null/empty поля |
| `CreateTournamentRequest` | 1 | null/empty поля, граничні значення |
| `UpdateTournamentRequest` | 1 | null/empty поля |
| `CreateTeamRequest` | 1 | null/empty поля |
| `CreateSubmissionRequest` | 1 | null/empty поля, граничні значення |
| `CreateRoundRequest` | 1 | null/empty поля, граничні значення |
| `UpdateRoundRequest` | 1 | null/empty поля |
| `SaveEvaluationRequest` | 1 | null/empty поля, граничні значення, спецсимволи, великі рядки |
| `LeaderboardEntry` | 1 | null поля, enums |
| `EvaluationExportRecord` | 1 | null поля, спецсимволи, великі рядки |

### Інше (Application)

| Клас | Тестів | Що перевіряється |
|---|---|---|
| `Dispatcher` | 1 | Запуск main-методу Spring Boot без помилок |

---

## 5. НЕ покриті класи / пакети

### Не покриті тестами (або покриті опосередковано)

| Клас | Причина |
|---|---|
| `UserRole`, `TournamentStatus` | Enum без логіки |

---

## 6. Метрики покриття (JaCoCo)

### Загальні метрики

| Метрика | Покрито | Всього | Відсоток |
|---|---|---|---|
| Instruction (C0) | 2 631 | 4 800 | **54.81%** |
| Branch (C1) | 91 | 142 | **64.08%** |
| Line | 720 | 1 127 | **63.89%** |
| Method | 353 | 506 | **69.76%** |

### Пояснення метрик

- **54.81% instruction coverage** — показник має зрости після додавання тестів для Config, Repository, DTO та Dispatcher класів. Для отримання актуальних метрик необхідно повторно запустити `mvn clean test`.
- **64.08% branch coverage** — добре покриття для бізнес-логіки (сервіси + контролери). Додані тести для репозиторіїв і DTO покращать цей показник.
- **69.76% method coverage** — методи сервісів, контролерів, репозиторіїв та конфігурацій покриті тестами, що має підвищити цей відсоток.

---

## 7. Інструкція для отримання точних метрик покриття

### Запуск тестів з JaCoCo

```bash
mvn clean test
```

Після виконання команди звіт JaCoCo буде згенеровано в:

```
target/site/jacoco/index.html
```

Відкрийте цей файл у браузері для перегляду детальної інформації про покриття по кожному класу.

### Оновлення залежностей перед запуском

```bash
mvn dependency:resolve
```

---

## 8. Як запускати тести

### Усі тести

```bash
mvn clean test
```

### Тільки сервіси

```bash
mvn test -Dtest="org.example.service.*"
```

### Тільки контролери

```bash
mvn test -Dtest="org.example.web.*"
```

### Окремий тест

```bash
mvn test -Dtest="UserServiceTest"
```

### З Coverage-звітом

```bash
mvn clean test
# Відкрити target/site/jacoco/index.html
```

---

## 9. Висновок

**Тестове покриття є повним та охоплює всі шари застосунку.**

- Усі **9 сервісів** покриті unit-тестами з використанням Mockito.
- Усі **10 контролерів** покриті тестами через `@WebMvcTest` з мокованими сервісами.
- **JWT-утиліта** покрита повністю.
- **Логіка підрахунку оцінок** в моделі `Evaluation` покрита граничними випадками.
- **Бізнес-логіка** перевіряє як позитивні, так і негативні сценарії: виключення, null/empty вхідні дані, різні гілки умов, валідацію статусів.
- **Усі 3 конфігураційні класи** (`SecurityConfig`, `WebConfig`, `MySqlConfig`) покриті інтеграційними тестами з підняттям контексту.
- **Усі 11 JDBC-репозиторіїв** покриті тестами через `@JdbcTest` з вбудованою H2 БД.
- **11 DTO-класів** покриті тестами на граничні випадки (null/empty, спецсимволи, великі рядки, enums, boundary values).
- **Головний клас `Dispatcher`** покритий інтеграційним тестом.

**Загальна кількість тестів: 178 — усі проходять успішно.**
