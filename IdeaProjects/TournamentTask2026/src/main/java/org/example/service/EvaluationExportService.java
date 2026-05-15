package org.example.service;

import org.example.dto.EvaluationExportDto;
import org.example.model.Evaluation;
import org.example.repository.EvaluationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class EvaluationExportService {

    private final EvaluationRepository evaluationRepository;

    public EvaluationExportService(EvaluationRepository evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }

    public List<EvaluationExportDto> getExportData() {

        return evaluationRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    private EvaluationExportDto mapToDto(Evaluation e) {

        return new EvaluationExportDto(
                e.getSubmissionId(),
                e.getJuryName(),
                e.getBackendQuality(),
                e.getDatabaseScore(),
                e.getFrontendQuality(),
                e.getFunctionalityScore(),
                e.getUsabilityScore(),
                e.getMustHaveCompleteness(),
                e.getTotalScore(),
                e.getComment(),
                e.getEvaluatedAt()
        );
    }
}