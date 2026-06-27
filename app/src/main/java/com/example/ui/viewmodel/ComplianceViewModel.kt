package com.example.ui.viewmodel

import androidx.lifecycle.ViewModel
import com.example.domain.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class ComplianceViewModel : ViewModel() {
    private val _state = MutableStateFlow(ComplianceState())
    val state: StateFlow<ComplianceState> = _state.asStateFlow()

    init {
        loadInitialData()
    }

    private fun loadInitialData() {
        _state.value = _state.value.copy(
            batches = listOf(
                CropBatch("LT-2026-01", "Lote Alpha", "Sour Diesel", CultivationPhase.FLOWERING, "Conforme"),
                CropBatch("LT-2026-02", "Lote Beta", "Blue Dream", CultivationPhase.VEGETATIVE, "Atención"),
                CropBatch("LT-2026-03", "Lote Gamma", "Cannatonic", CultivationPhase.SEEDING, "Conforme")
            ),
            scoreBreakdown = ScoreBreakdown(totalScore = 85, maxScore = 100)
        )
    }

    fun setBatches(batches: List<CropBatch>) {
        _state.value = _state.value.copy(batches = batches)
    }
    
    fun selectBatch(batch: CropBatch) {
        _state.value = _state.value.copy(selectedBatch = batch)
    }
    
    fun syncData() {
        _state.value = _state.value.copy(isSyncing = true)
        // Simulate sync
        _state.value = _state.value.copy(isSyncing = false)
    }
}
