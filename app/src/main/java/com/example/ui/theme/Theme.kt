package com.example.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val Fenix1ColorScheme = darkColorScheme(
    primary = EmeraldGreen,
    secondary = EmeraldGreenDark,
    background = NavyBlue,
    surface = NavyBlueLight,
    onPrimary = Color.White,
    onSecondary = Color.White,
    onBackground = Color.White,
    onSurface = Color.White,
    error = AlertRed
)

@Composable
fun MyApplicationTheme(
  content: @Composable () -> Unit,
) {
  MaterialTheme(
    colorScheme = Fenix1ColorScheme,
    typography = Typography,
    content = content
  )
}
