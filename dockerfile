FROM alpine:3.15

WORKDIR /usr/app

RUN apk update && \
    apk add nodejs \
    npm

COPY package*.json .

# Config
ENV NODE_VERSION 16.15.1 \
    NODE_ENV=production
    
RUN npm install --global yarn

RUN yarn install

COPY . .


CMD [ "node", "dist/server.js" ]
