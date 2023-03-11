FROM node:16
WORKDIR /app
COPY ./package.json ./package.json
COPY ./server.js ./server.js
COPY ./config ./config
COPY ./controllers ./controllers
COPY ./middleware ./middleware
COPY ./models ./models
COPY ./routes ./routes
COPY ./ebdjango ./ebdjango
COPY ./uploads ./uploads
COPY ./utils ./utils
COPY ./views ./views
COPY ./config.env ./config.env 
COPY ./s3.js ./s3.js

RUN npm install
EXPOSE 5000
CMD ["node", "server.js"]
