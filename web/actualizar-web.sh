#!/usr/bin/env bash
set -e

echo "====================================="
echo " FENIX4 - ACTUALIZAR WEB"
echo "====================================="

echo "1. Verificando carpeta..."
if [ ! -f "package.json" ]; then
  echo "ERROR: No estas en la carpeta principal de la web (donde esta package.json)."
  exit 1
fi

echo "2. Verificando Git..."
git status
RAMA=$(git branch --show-current)
echo "Rama actual: $RAMA"

echo "3. Instalando dependencias..."
npm install

echo "4. Ejecutando build para validar que no haya errores..."
npm run build

echo "5. Guardando cambios..."
git add .

if git diff --cached --quiet; then
  echo "No hay cambios nuevos para subir."
else
  FECHA=$(date +"%Y-%m-%d_%H-%M-%S")
  git commit -m "actualizacion web FENIX4 $FECHA"
fi

echo "6. Subiendo a GitHub..."
git push -u origin "$RAMA"

echo "====================================="
echo " FENIX4 ACTUALIZADO EN GITHUB"
echo "====================================="
echo "Ahora verifica el panel del hosting y confirma que el deploy se ejecuto correctamente."
