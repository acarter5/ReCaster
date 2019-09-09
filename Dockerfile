FROM node:latest

ADD . src/app

WORKDIR /src/app

RUN npm install
RUN npm run build:prod

EXPOSE 3000

CMD ["npm", "run", "start:prod"]