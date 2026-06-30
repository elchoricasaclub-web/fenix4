#!/usr/bin/env bash
set -e

echo "====================================="
echo " GUARDAR ULTIMO AVANCE DEL PROYECTO"
echo "====================================="

FECHA=$(date +"%Y-%m-%d_%H-%M-%S")
MENSAJE="avance proyecto - $FECHA"

# Asumimos que se ejecuta desde la raíz o dentro de web, buscaremos el package.json más cercano o nos saltamos esta validación estricta para que funcione bien.
if [ ! -f "web/package.json" ] && [ ! -f "package.json" ]; then
  echo "ERROR: No se encontro package.json. Ejecuta este comando dentro de la carpeta principal del proyecto."
  exit 1
fi

echo "1. Verificando Git..."

if [ ! -d ".git" ]; then
  echo "Git no esta inicializado. Inicializando repositorio..."
  git init
fi

echo "2. Verificando .gitignore..."

if [ ! -f ".gitignore" ]; then
  cat > .gitignore << 'EOF'
node_modules/
.next/
dist/
build/
.env
.env.local
.env.production
.env.development
*.log
.DS_Store
coverage/
.backups/
backup/
tmp/
firebase-debug.log
.firebaserc.local
EOF
fi

echo "3. Instalando dependencias si faltan (web)..."

if [ -d "web" ] && [ ! -d "web/node_modules" ]; then
  cd web && npm install && cd ..
elif [ ! -d "node_modules" ] && [ -f "package.json" ]; then
  npm install
fi

echo "4. Ejecutando build (web)..."

if [ -d "web" ]; then
  cd web && npm run build && cd ..
elif [ -f "package.json" ]; then
  npm run build
fi

echo "5. Creando backup local..."

mkdir -p .backups
NOMBRE_BACKUP="backup-proyecto-$FECHA.tar.gz"

tar --exclude=node_modules \
    --exclude=web/node_modules \
    --exclude=.next \
    --exclude=.git \
    --exclude=.backups \
    -czf ".backups/$NOMBRE_BACKUP" .

echo "Backup creado: .backups/$NOMBRE_BACKUP"

echo "6. Actualizando changelog..."

if [ ! -f "CHANGELOG.md" ]; then
  echo "# CHANGELOG DEL PROYECTO" > CHANGELOG.md
fi

{
  echo ""
  echo "## Avance $FECHA"
  echo "- Cambios guardados desde VS Code / terminal."
  echo "- Build ejecutado correctamente."
  echo "- Backup local creado: $NOMBRE_BACKUP"
} >> CHANGELOG.md

echo "7. Guardando cambios en Git..."

git add .

if git diff --cached --quiet; then
  echo "No hay cambios nuevos para guardar."
else
  git commit -m "$MENSAJE"
fi

echo "8. Verificando remoto GitHub..."

if git remote | grep -q origin; then
  echo "Remoto origin encontrado."
else
  echo "ERROR: No existe remoto origin de GitHub."
  echo "Agrega tu repositorio con:"
  echo "git remote add origin URL_DE_TU_REPOSITORIO"
  exit 1
fi

echo "9. Subiendo a GitHub..."

RAMA=$(git branch --show-current)

if [ -z "$RAMA" ]; then
  RAMA="main"
  git branch -M main
fi

git push -u origin "$RAMA"

echo "====================================="
echo " ULTIMO AVANCE GUARDADO CORRECTAMENTE"
echo "====================================="
echo "Commit: $MENSAJE"
echo "Backup: .backups/$NOMBRE_BACKUP"
echo "Rama: $RAMA"
