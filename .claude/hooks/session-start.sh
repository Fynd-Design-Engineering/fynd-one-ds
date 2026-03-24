#!/bin/bash
set -euo pipefail

# Only run in remote (web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Set Figma MCP API key for the session
echo 'export FIGMA_API_KEY="figd_IUJBdXj9lfaN5qEjkPQBGEBBTNeyacMpbAHhztvm"' >> "$CLAUDE_ENV_FILE"

# Install dependencies if needed
cd "$CLAUDE_PROJECT_DIR"
npm install
