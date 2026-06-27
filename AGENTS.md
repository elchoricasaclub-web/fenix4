# Instrucciones y Reglas del Proyecto (FENIX3)

Este archivo sirve para que el asistente de IA recuerde configuraciones y pasos importantes para el desarrollo y actualización del proyecto.

## 1. Configuración de Variables de Entorno (Vite / React)
- Todas las variables de entorno en el archivo `.env` del frontend (dentro de la carpeta `web/`) **DEBEN** empezar con el prefijo `VITE_` para que puedan ser leídas por la aplicación web.
- Ejemplo: `VITE_FIREBASE_API_KEY=tu_clave`. Si no tienen este prefijo, los módulos fallarán al cargar y la app web mostrará un error en blanco o no funcionará.

## 2. Solución de Problemas de Inicio de Sesión en GitHub
- El botón de **"Acceder a GitHub"** en Google AI Studio abre una ventana emergente (pop-up) para autorizar la conexión.
- **Paso crítico**: Si no ocurre nada al hacer clic, el navegador (Edge, Chrome, etc.) está bloqueando las ventanas emergentes. Se debe buscar el ícono de ventana bloqueada en la barra de direcciones y seleccionar **"Permitir siempre"**.

## 3. Entorno de Desarrollo
- El agente de IA opera de forma remota en la nube de Google AI Studio, por lo tanto, **no tiene acceso remoto (AnyDesk, TeamViewer, etc.) a la PC local del usuario**.
- La forma correcta de sincronizar el trabajo entre la PC local (VS Code) y Google AI Studio es a través de **GitHub**. Subiendo los cambios desde VS Code al repositorio y luego sincronizando/importando en AI Studio (o viceversa).
