FROM node

COPY . .

ENV NODE_ENV="production"

RUN npm i -g yarn && yarn install

ENTRYPOINT [ "yarn", "start" ]
