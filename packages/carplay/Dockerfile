FROM node

# TODO: download assets on build
RUN apt update && apt install -y ffmpeg

COPY . .

RUN yarn install

ENV NODE_ENV="production"

RUN yarn build

ENTRYPOINT [ "yarn", "start" ]
