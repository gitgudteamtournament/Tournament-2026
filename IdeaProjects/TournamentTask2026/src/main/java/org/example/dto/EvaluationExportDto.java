package org.example.dto;

import java.time.LocalDateTime;

public record EvaluationExportDto(
        Long submissionId,
        String juryName,
        Integer backendQuality,
        Integer databaseScore,
        Integer frontendQuality,
        Integer functionalityScore,
        Integer usabilityScore,
        Integer mustHaveCompleteness,
        Double totalScore,
        String comment,
        LocalDateTime evaluatedAt
) {}