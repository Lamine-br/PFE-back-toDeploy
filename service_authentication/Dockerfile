FROM node:18

WORKDIR .

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["node","service.js"]
