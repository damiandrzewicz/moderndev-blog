ARG VARIANT=1-20-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT}

# Set the working directory
WORKDIR /workspace