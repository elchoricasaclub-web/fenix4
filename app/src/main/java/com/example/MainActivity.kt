package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.List
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.domain.CropBatch
import com.example.ui.theme.*
import com.example.ui.viewmodel.ComplianceViewModel

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      MyApplicationTheme {
        MainAppScreen()
      }
    }
  }
}

@Composable
fun MainAppScreen() {
    var selectedTab by remember { mutableStateOf(0) }
    val viewModel = remember { ComplianceViewModel() }

    Scaffold(
      modifier = Modifier.fillMaxSize(),
      bottomBar = {
        NavigationBar(containerColor = MaterialTheme.colorScheme.surface) {
          NavigationBarItem(
            selected = selectedTab == 0,
            onClick = { selectedTab = 0 },
            icon = { Icon(Icons.Filled.Home, contentDescription = "Dashboard") },
            label = { Text("Dashboard") },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = EmeraldGreen,
                selectedTextColor = EmeraldGreen,
                indicatorColor = MaterialTheme.colorScheme.surface
            )
          )
          NavigationBarItem(
            selected = selectedTab == 1,
            onClick = { selectedTab = 1 },
            icon = { Icon(Icons.Filled.Build, contentDescription = "Extracción") },
            label = { Text("Extracción") },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = EmeraldGreen,
                selectedTextColor = EmeraldGreen,
                indicatorColor = MaterialTheme.colorScheme.surface
            )
          )
          NavigationBarItem(
            selected = selectedTab == 2,
            onClick = { selectedTab = 2 },
            icon = { Icon(Icons.Filled.List, contentDescription = "GACP") },
            label = { Text("GACP") },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = EmeraldGreen,
                selectedTextColor = EmeraldGreen,
                indicatorColor = MaterialTheme.colorScheme.surface
            )
          )
          NavigationBarItem(
            selected = selectedTab == 3,
            onClick = { selectedTab = 3 },
            icon = { Icon(Icons.Filled.Info, contentDescription = "Regulatorio") },
            label = { Text("Regulatorio") },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = EmeraldGreen,
                selectedTextColor = EmeraldGreen,
                indicatorColor = MaterialTheme.colorScheme.surface
            )
          )
        }
      },
      floatingActionButton = {
        if (selectedTab == 0) {
            FloatingActionButton(
              onClick = { /* TODO: Nueva Evidencia */ },
              containerColor = EmeraldGreen,
              contentColor = Color.White
            ) {
              Icon(Icons.Filled.Add, contentDescription = "Nueva Actividad")
            }
        }
      }
    ) { innerPadding ->
      when (selectedTab) {
        0 -> {
          Fenix1Dashboard(
            viewModel = viewModel,
            modifier = Modifier.padding(innerPadding)
          )
        }
        1 -> {
          LiveResinExtractionScreen(
              modifier = Modifier.padding(innerPadding)
          )
        }
        2 -> {
          GacpSuiteScreen(
              modifier = Modifier.padding(innerPadding)
          )
        }
        3 -> {
          RegulatorySuiteScreen(
              modifier = Modifier.padding(innerPadding)
          )
        }
      }
    }
}

@Composable
fun LiveResinExtractionScreen(modifier: Modifier = Modifier) {
    LazyColumn(
      modifier = modifier
        .fillMaxSize()
        .background(MaterialTheme.colorScheme.background)
        .padding(16.dp),
      verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
      item {
        Text(
          text = "Extracción Live Resin",
          fontSize = 28.sp,
          fontWeight = FontWeight.Bold,
          color = Color.White
        )
        Text(
          text = "Cadena de frío y control de calidad",
          fontSize = 14.sp,
          color = TextGray
        )
        Spacer(modifier = Modifier.height(16.dp))
      }

      item {
          Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
            shape = RoundedCornerShape(12.dp)
          ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Nuevo Lote de Extracción", fontWeight = FontWeight.Bold, color = EmeraldGreen, fontSize = 18.sp)
                Spacer(modifier = Modifier.height(16.dp))
                
                OutlinedTextField(
                    value = "",
                    onValueChange = {},
                    label = { Text("ID Lote Flor (Fresh Frozen)") },
                    modifier = Modifier.fillMaxWidth(),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = EmeraldGreen,
                        focusedLabelColor = EmeraldGreen,
                        unfocusedBorderColor = TextGray,
                        unfocusedLabelColor = TextGray,
                    )
                )
                Spacer(modifier = Modifier.height(12.dp))
                OutlinedTextField(
                    value = "",
                    onValueChange = {},
                    label = { Text("Tiempo a Congelador (minutos)") },
                    modifier = Modifier.fillMaxWidth(),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = EmeraldGreen,
                        focusedLabelColor = EmeraldGreen,
                        unfocusedBorderColor = TextGray,
                        unfocusedLabelColor = TextGray,
                    )
                )
                Spacer(modifier = Modifier.height(12.dp))
                OutlinedTextField(
                    value = "",
                    onValueChange = {},
                    label = { Text("Temp. Congelador (°C)") },
                    modifier = Modifier.fillMaxWidth(),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = EmeraldGreen,
                        focusedLabelColor = EmeraldGreen,
                        unfocusedBorderColor = TextGray,
                        unfocusedLabelColor = TextGray,
                    )
                )
                Spacer(modifier = Modifier.height(24.dp))
                Button(
                    onClick = { /* TODO */ },
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.buttonColors(containerColor = EmeraldGreen)
                ) {
                    Text("Registrar Cadena de Frío", fontWeight = FontWeight.Bold)
                }
            }
          }
      }

      item {
          Text(
            text = "Lotes Recientes",
            fontSize = 20.sp,
            fontWeight = FontWeight.SemiBold,
            color = Color.White,
            modifier = Modifier.padding(vertical = 8.dp)
          )
      }

      item {
          Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
            shape = RoundedCornerShape(12.dp)
          ) {
            Row(
              modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
              horizontalArrangement = Arrangement.SpaceBetween,
              verticalAlignment = Alignment.CenterVertically
            ) {
              Column {
                Text(text = "Lote: LR-2023-01", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                Text(text = "Flor: FF-OD-05", color = TextGray, fontSize = 14.sp)
                Text(text = "Temp: -40°C", color = TextGray, fontSize = 14.sp)
              }
              Column(horizontalAlignment = Alignment.End) {
                Icon(imageVector = Icons.Filled.CheckCircle, contentDescription = "Aprobado", tint = EmeraldGreen)
                Spacer(modifier = Modifier.height(4.dp))
                Text(text = "Liberado", color = EmeraldGreen, fontWeight = FontWeight.Medium, fontSize = 14.sp)
              }
            }
          }
      }
    }
}

@Composable
fun Fenix1Dashboard(viewModel: ComplianceViewModel, modifier: Modifier = Modifier) {
  val state by viewModel.state.collectAsState()

  LazyColumn(
    modifier = modifier
      .fillMaxSize()
      .background(MaterialTheme.colorScheme.background)
      .padding(16.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp)
  ) {
    item {
      Text(
        text = "Command Center",
        fontSize = 28.sp,
        fontWeight = FontWeight.Bold,
        color = Color.White
      )
      Text(
        text = "Resumen de Cumplimiento GACP/GMP",
        fontSize = 14.sp,
        color = TextGray
      )
      Spacer(modifier = Modifier.height(8.dp))
    }

    item {
      ComplianceSemaphore(score = state.scoreBreakdown?.totalScore ?: 0)
    }

    item {
      Spacer(modifier = Modifier.height(16.dp))
      Text(
        text = "Métricas de Cultivo (Humedad/Temp)",
        fontSize = 18.sp,
        fontWeight = FontWeight.SemiBold,
        color = Color.White
      )
      Spacer(modifier = Modifier.height(8.dp))
      SimpleGrowthChart()
    }

    item {
      Spacer(modifier = Modifier.height(8.dp))
      Text(
        text = "Lotes Activos (${state.batches.size})",
        fontSize = 20.sp,
        fontWeight = FontWeight.SemiBold,
        color = Color.White,
        modifier = Modifier.padding(bottom = 8.dp)
      )
    }

    items(state.batches) { batch ->
      LoteCard(batch = batch)
    }
  }
}

@Composable
fun ComplianceSemaphore(score: Int) {
  val isCompliant = score >= 80
  val statusColor = if (isCompliant) EmeraldGreen else AlertYellow
  val statusIcon = if (isCompliant) Icons.Filled.CheckCircle else Icons.Filled.Warning
  val statusText = if (isCompliant) "Conforme ($score/100)" else "Atención ($score/100)"

  Card(
    modifier = Modifier.fillMaxWidth(),
    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
    shape = RoundedCornerShape(12.dp)
  ) {
    Row(
      modifier = Modifier.padding(16.dp),
      verticalAlignment = Alignment.CenterVertically
    ) {
      Icon(
        imageVector = statusIcon,
        contentDescription = "Cumplimiento Status",
        tint = statusColor,
        modifier = Modifier.size(48.dp)
      )
      Spacer(modifier = Modifier.width(16.dp))
      Column {
        Text(text = "Estado: $statusText", color = statusColor, fontWeight = FontWeight.Bold, fontSize = 18.sp)
        Text(text = "Basado en lineamientos WHO_GACP.", color = TextGray, fontSize = 14.sp)
      }
    }
  }
}

@Composable
fun SimpleGrowthChart() {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(200.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        shape = RoundedCornerShape(12.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.Bottom
        ) {
            val bars = listOf(0.4f, 0.6f, 0.8f, 0.5f, 0.9f, 0.7f, 0.85f)
            bars.forEachIndexed { index, heightFraction ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Bottom,
                    modifier = Modifier.fillMaxHeight()
                ) {
                    Box(
                        modifier = Modifier
                            .width(24.dp)
                            .fillMaxHeight(heightFraction)
                            .background(
                                color = if (index == bars.lastIndex) EmeraldGreen else EmeraldGreen.copy(alpha = 0.5f),
                                shape = RoundedCornerShape(topStart = 4.dp, topEnd = 4.dp)
                            )
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "D${index + 1}",
                        fontSize = 12.sp,
                        color = TextGray
                    )
                }
            }
        }
    }
}

@Composable
fun LoteCard(batch: CropBatch) {
  val statusColor = if (batch.status == "Conforme") EmeraldGreen else AlertYellow
  val statusIcon = if (batch.status == "Conforme") Icons.Filled.CheckCircle else Icons.Filled.Warning
  
  Card(
    modifier = Modifier.fillMaxWidth(),
    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
    shape = RoundedCornerShape(12.dp)
  ) {
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      Column {
        Text(text = "Lote: ${batch.id}", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 16.sp)
        Text(text = "Cepa: ${batch.strain}", color = TextGray, fontSize = 14.sp)
        Text(text = "Fase: ${batch.phase.name}", color = TextGray, fontSize = 14.sp)
      }
      Column(horizontalAlignment = Alignment.End) {
        Icon(imageVector = statusIcon, contentDescription = batch.status, tint = statusColor)
        Spacer(modifier = Modifier.height(4.dp))
        Text(text = batch.status, color = statusColor, fontWeight = FontWeight.Medium, fontSize = 14.sp)
      }
    }
  }
}

@Composable
fun GacpSuiteScreen(modifier: Modifier = Modifier) {
    LazyColumn(
      modifier = modifier
        .fillMaxSize()
        .background(MaterialTheme.colorScheme.background)
        .padding(16.dp),
      verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
      item {
        Text(
          text = "GACP Suite",
          fontSize = 28.sp,
          fontWeight = FontWeight.Bold,
          color = Color.White
        )
        Text(
          text = "Gestión Integral de Cumplimiento Normativo",
          fontSize = 14.sp,
          color = TextGray
        )
        Spacer(modifier = Modifier.height(16.dp))
      }

      items(listOf("Módulo 1: Control de Calidad", "Módulo 2: Trazabilidad Lote", "Módulo 3: Sanidad Vegetal", "Módulo 4: Capacitación")) { module ->
          Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
            shape = RoundedCornerShape(12.dp)
          ) {
            Row(
              modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
              horizontalArrangement = Arrangement.SpaceBetween,
              verticalAlignment = Alignment.CenterVertically
            ) {
              Text(text = module, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 16.sp)
              Icon(imageVector = Icons.Filled.CheckCircle, contentDescription = "Aprobado", tint = EmeraldGreen)
            }
          }
      }
    }
}

@Composable
fun RegulatorySuiteScreen(modifier: Modifier = Modifier) {
    LazyColumn(
      modifier = modifier
        .fillMaxSize()
        .background(MaterialTheme.colorScheme.background)
        .padding(16.dp),
      verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
      item {
        Text(
          text = "Regulatory Colombia Suite",
          fontSize = 28.sp,
          fontWeight = FontWeight.Bold,
          color = Color.White
        )
        Text(
          text = "Gestión de Cumplimiento Regulatorio y Entidades",
          fontSize = 14.sp,
          color = TextGray
        )
        Spacer(modifier = Modifier.height(16.dp))
      }

      items(listOf("Licencias Vigentes", "Próximos Vencimientos", "Radicados Abiertos", "Cupos Aprobados")) { module ->
          Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
            shape = RoundedCornerShape(12.dp)
          ) {
            Row(
              modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
              horizontalArrangement = Arrangement.SpaceBetween,
              verticalAlignment = Alignment.CenterVertically
            ) {
              Text(text = module, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 16.sp)
              Text(text = "Ver", color = EmeraldGreen, fontWeight = FontWeight.Medium, fontSize = 14.sp)
            }
          }
      }
    }
}

@Preview(showBackground = true)
@Composable
fun PreviewDashboard() {
  MyApplicationTheme {
    MainAppScreen()
  }
}
