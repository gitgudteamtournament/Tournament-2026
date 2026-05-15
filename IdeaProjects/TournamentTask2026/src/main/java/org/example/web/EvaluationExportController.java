package org.example.web;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.example.dto.EvaluationExportDto;
import org.example.service.EvaluationExportService;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@RestController
@RequestMapping("/api/export")
public class EvaluationExportController {

    private final EvaluationExportService exportService;

    public EvaluationExportController(EvaluationExportService exportService) {
        this.exportService = exportService;
    }

    @GetMapping(value = "/evaluations", produces = "text/csv")
    public void exportEvaluations(
            HttpServletResponse response
    ) throws IOException {

        response.setContentType("text/csv; charset=UTF-8");

        response.setHeader(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=evaluations.csv"
        );

        ServletOutputStream outputStream =
                response.getOutputStream();

        outputStream.write(0xEF);
        outputStream.write(0xBB);
        outputStream.write(0xBF);

        List<EvaluationExportDto> data =
                exportService.getExportData();

        try (
                PrintWriter writer =
                        new PrintWriter(outputStream, true);

                CSVPrinter csvPrinter = new CSVPrinter(
                        writer,
                        CSVFormat.DEFAULT.builder()
                                .setHeader(
                                        "Submission ID",
                                        "Jury Name",
                                        "Backend",
                                        "Database",
                                        "Frontend",
                                        "Functionality",
                                        "Usability",
                                        "Must Have",
                                        "Total Score",
                                        "Comment",
                                        "Evaluated At"
                                )
                                .build()
                )
        ) {

            for (EvaluationExportDto e : data) {

                csvPrinter.printRecord(
                        e.submissionId(),
                        e.juryName(),
                        e.backendQuality(),
                        e.databaseScore(),
                        e.frontendQuality(),
                        e.functionalityScore(),
                        e.usabilityScore(),
                        e.mustHaveCompleteness(),
                        e.totalScore(),
                        e.comment(),
                        e.evaluatedAt()
                );
            }

            csvPrinter.flush();
        }
    }
}