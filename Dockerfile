FROM node:18.18.1

COPY back.js ./
COPY index.html ./

RUN npm ci

CMD node back.js
