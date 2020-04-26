FROM node:10
WORKDIR /app


COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 9000
CMD [ "node", "server.js" ]