#!/usr/bin/env bash

echo "====================================="
echo " FENIX3 - DIAGNOSTICO WEB"
echo "====================================="

echo ""
echo "Carpeta actual:"
pwd

echo ""
echo "Archivos principales:"
ls

echo ""
echo "Estado Git:"
git status || echo "Git no inicializado en esta carpeta"

echo ""
echo "Rama actual:"
git branch --show-current || echo "No se pudo obtener la rama"

echo ""
echo "Remoto GitHub:"
git remote -v || echo "No hay remotos configurados"

echo ""
echo "Ultimos commits:"
git log --oneline -5 || echo "No hay commits aun"

echo ""
echo "Scripts disponibles:"
npm run || echo "No se pudo ejecutar npm run"

echo ""
echo "Version Node:"
node -v || echo "Node no instalado"

echo ""
echo "Version NPM:"
npm -v || echo "NPM no instalado"

echo ""
echo "Verificando package.json:"
if [ -f "package.json" ]; then
  echo "package.json encontrado"
else
  echo "ERROR: package.json no encontrado"
fi

echo ""
echo "Verificando .git:"
if [ -d "../.git" ] || [ -d ".git" ]; then
  echo "Git encontrado"
else
  echo "ERROR: Git no inicializado en la raiz ni aqui"
fi

echo ""
echo "Diagnostico terminado."
