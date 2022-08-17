FROM node

COPY . .

ENV NODE_ENV="production"

RUN yarn install

ENTRYPOINT [ "yarn", "start" ]
