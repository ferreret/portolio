#!/bin/bash
# Type-check the project after Claude edits a TypeScript file.
# Runs `npx tsc` from the project root (tsconfig has noEmit:true).
# If type errors are found, exit 2 so Claude sees them via stderr and can fix.

set -u

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Skip if not a TypeScript file
if [[ ! "$FILE_PATH" =~ \.(ts|tsx)$ ]]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR" || exit 1

OUTPUT=$(npx tsc 2>&1)
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo "tsc found type errors after editing $FILE_PATH:" >&2
  echo "$OUTPUT" >&2
  exit 2
fi

exit 0
