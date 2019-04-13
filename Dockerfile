FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install
EXPOSE 8080
RUN export NODE_ENV=prod
CMD ["npm","start"]