FROM node:18

WORKDIR .

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node","service.js"]
