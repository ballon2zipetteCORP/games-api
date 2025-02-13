FROM node:20.16.0-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm@10.0.0

COPY package*.json .

RUN NODE_ENV=development pnpm import && pnpm install --frozen-lockfile

COPY . .

CMD ["npm", "run", "dev"]