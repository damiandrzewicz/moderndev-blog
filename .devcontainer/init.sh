#!/usr/bin/env bash
set -euo pipefail

# Ensure corepack active for the runtime container as well
corepack enable >/dev/null 2>&1 || true
corepack prepare pnpm@latest --activate >/dev/null 2>&1 || true

# Create recommended editor configs if missing (safe, minimal)
if [ ! -f ".editorconfig" ]; then
  cat > .editorconfig <<'EOF'
root = true

[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
trim_trailing_whitespace = true
indent_style = space
indent_size = 2
EOF
fi

if [ ! -f ".prettierrc.json" ]; then
  cat > .prettierrc.json <<'EOF'
{ "singleQuote": true, "semi": true, "printWidth": 100 }
EOF
fi

echo "Dev container ready. You can now manually initialize your project at repo root."
