FROM node:16.14.2

WORKDIR /server

COPY package.json ./

RUN yarn

COPY . .

CMD [ "npm", "start" ]