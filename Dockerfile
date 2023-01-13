FROM ubuntu:20.04
FROM python:latest

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm   

RUN mkdir -p /app/src
WORKDIR /app/src

COPY react-client/package.json /app/src

RUN npm install --legacy-peer-deps

COPY /react-client .

EXPOSE 3000

CMD ["npm", "start"]
