#!/bin/bash
cd "$(dirname "$0")" || exit 1

cms_nvm_script="${NVM_DIR:-$HOME/.nvm}/nvm.sh"
if [ -s "$cms_nvm_script" ]; then
  . "$cms_nvm_script"
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "Bitte zuerst Node.js 22.12 oder neuer installieren: https://nodejs.org/"
  read -r -p "Zum Schließen Enter drücken … "
  exit 1
fi

if [ ! -f package.json ] || [ ! -f package-lock.json ] || [ ! -f apps/web/package.json ] || [ ! -f scripts/dev-cms.mjs ]; then
  echo "Bitte den vollständigen Website-Ordner aus dem Komplettpaket öffnen. Der Korrekturordner allein enthält keine vollständige Website."
  read -r -p "Zum Schließen Enter drücken … "
  exit 1
fi

if [ ! -f node_modules/vite/bin/vite.js ] || [ ! -f node_modules/decap-server/dist/index.js ]; then
  echo "Die benötigten Pakete werden installiert …"
  if ! npm ci --no-audit --no-fund; then
    read -r -p "Die Installation ist fehlgeschlagen. Zum Schließen Enter drücken … "
    exit 1
  fi
fi

npm run dev:cms -- --open
cms_start_status=$?
if [ "$cms_start_status" -ne 0 ]; then
  read -r -p "Bitte die Meldung oben prüfen. Zum Schließen Enter drücken … "
fi
exit "$cms_start_status"
