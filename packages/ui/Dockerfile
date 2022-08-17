FROM node

COPY . .

ENV NODE_ENV="production"

RUN yarn install && yarn build

ENTRYPOINT [ "yarn", "start" ]
