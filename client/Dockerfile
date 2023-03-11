FROM node:16
	
WORKDIR /app

COPY ./package.json ./package.json
COPY ./public ./public

	
COPY ./src ./src
COPY ./img ./img
COPY ./public ./public

COPY ./postcss.config.js ./postcss.config.js
COPY ./tailwind.config.js ./tailwind.config.js 
	
RUN npm install

	
EXPOSE 3000

CMD ["npm","start"]