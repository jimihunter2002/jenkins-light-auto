FROM node:12.22.9-alpine
WORKDIR app
COPY . .
RUN npm install
CMD [ "npm","test" ]
