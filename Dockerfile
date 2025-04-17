# Dockerfile
# aqui é uma polêmica a versão do nome podem ficar a vontade nas escolhas
FROM node:20-alpine 

WORKDIR /app
# Gosto de usa o pnpm em tudo mas é tranquilo usar o yarn
COPY package.json pnpm-lock.yaml ./ 

RUN npm install -g pnpm && pnpm install

COPY . /app

RUN pnpm build

CMD ["pnpm", "start"] 