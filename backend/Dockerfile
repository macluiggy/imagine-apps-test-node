FROM node:16-alpine3.16

WORKDIR /app

COPY package*.json ./
RUN npm i -g pnpm
RUN npm i -g sequelize-cli
RUN pnpm install

# RUN pnpm build

COPY . .

EXPOSE 3000

# CMD [ "npm", "start" ]
