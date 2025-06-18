FROM debian:bookworm

RUN apt-get update && apt-get install -y \
    curl git sudo zsh \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd -g 1000 hagemanto && \
    useradd -m -u 1000 -g hagemanto hagemanto && \
    echo "hagemanto ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/hagemanto && \
    mkdir -p /home/hagemanto/.pnpm-store && chown -R hagemanto /home/hagemanto/.pnpm-store

USER hagemanto