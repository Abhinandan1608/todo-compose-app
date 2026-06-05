FROM node:26-alpine3.23

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]