FROM node

COPY . .

RUN yarn install

ENV NODE_ENV="production"

RUN yarn build

ENTRYPOINT [ "yarn", "start" ]
