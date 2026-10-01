#!/bin/bash
set -e
cd "$(dirname "$0")"
if [ -s "${NVM_DIR:-$HOME/.nvm}/nvm.sh" ]; then
  . "${NVM_DIR:-$HOME/.nvm}/nvm.sh"
fi
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 22.12 oder neuer wird benötigt."
  exit 1
fi
node scripts/update-project.mjs "$@"
