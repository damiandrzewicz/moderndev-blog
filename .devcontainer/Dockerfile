# Base: Node 22 LTS with devcontainer niceties
FROM mcr.microsoft.com/devcontainers/javascript-node:22

# Use bash
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install extra tools & diagram deps:
# - git, curl, ca-certificates, jq
# - openjdk (for PlantUML local rendering), graphviz, plantuml
# - locales (en_US.UTF-8)
USER root
RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
      git curl ca-certificates jq locales \
      openjdk-21-jdk-headless graphviz plantuml \
 && rm -rf /var/lib/apt/lists/* \
 && sed -i 's/^# *\(en_US.UTF-8\)/\1/' /etc/locale.gen \
 && locale-gen

# --- Enable Corepack & activate pnpm as ROOT (writes to /usr/local/bin)
RUN corepack enable \
 && corepack prepare pnpm@latest --activate

# --- Switch to node user and set per-user pnpm config/store
USER node
ENV PNPM_HOME="/home/node/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
RUN mkdir -p /home/node/.pnpm-store \
 && pnpm config set store-dir /home/node/.pnpm-store \
 && npm config set fund false \
 && npm config set audit false

# --- Minimal init script, no scaffolding
USER root
COPY init.sh /usr/local/bin/init.sh
RUN chmod +x /usr/local/bin/init.sh

# --- Defaults
USER node
ENV LANG=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8