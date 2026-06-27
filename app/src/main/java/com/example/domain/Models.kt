package com.example.domain

enum class ComplianceStandard { WHO_GACP, EU_GMP }
enum class CultivationPhase { SEEDING, VEGETATIVE, FLOWERING, HARVEST, DRYING, ALL }

data class CropBatch(
    val id: String,
    val name: String,
    val strain: String,
    val phase: CultivationPhase,
    val status: String
)

data class ScoreBreakdown(
    val totalScore: Int,
    val maxScore: Int
)

data class AuditSystemLog(
    val id: String,
    val action: String,
    val timestamp: Long
)

data class ComplianceState(
    val batches: List<CropBatch> = emptyList(),
    val selectedBatch: CropBatch? = null,
    val complianceStandard: ComplianceStandard = ComplianceStandard.WHO_GACP,
    val activeFilterPhase: CultivationPhase = CultivationPhase.ALL,
    val isSyncing: Boolean = false,
    val scoreBreakdown: ScoreBreakdown? = null,
    val auditLogs: List<AuditSystemLog> = emptyList()
)
