FROM node:16.17.0-bullseye-slim
WORKDIR app
COPY . .
RUN npm install
CMD [ "npm","test" ]