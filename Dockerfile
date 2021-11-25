FROM node:lts

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install

COPY . /usr/src/app/
RUN chown -R node:node /usr/src/app/
USER node

EXPOSE 8080
CMD npm run start
