#!/usr/bin/env bash
set -e

echo "====================================="
echo " BACKUP LOCAL DEL PROYECTO"
echo "====================================="

FECHA=$(date +"%Y-%m-%d_%H-%M-%S")

if [ ! -f "web/package.json" ] && [ ! -f "package.json" ]; then
  echo "ERROR: Ejecuta este comando dentro de la carpeta principal del proyecto."
  exit 1
fi

mkdir -p .backups

NOMBRE_BACKUP="backup-manual-$FECHA.tar.gz"

tar --exclude=node_modules \
    --exclude=web/node_modules \
    --exclude=.next \
    --exclude=.git \
    --exclude=.backups \
    -czf ".backups/$NOMBRE_BACKUP" .

echo "Backup local creado correctamente:"
echo ".backups/$NOMBRE_BACKUP"
