FROM node:10.16.3-alpine

RUN mkdir -p /app/server
WORKDIR /app/server

COPY package.json /app/server
COPY package-lock.json /app/server

RUN npm install

COPY . /app/server

CMD ["node", "index.js"]