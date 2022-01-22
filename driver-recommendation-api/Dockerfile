FROM node:16-alpine

ENV NODE_ENV development
WORKDIR /code
COPY ["package.json", "yarn.lock", "./"]
RUN yarn
RUN yarn global add ts-node
COPY . .

CMD ["yarn", "dev"]