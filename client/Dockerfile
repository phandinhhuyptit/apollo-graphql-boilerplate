FROM node:10.16.0

WORKDIR /web/

ADD . /web/

RUN npm install -g yarn
RUN yarn install
RUN yarn build

CMD ["yarn","start:prod"]