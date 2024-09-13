FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY app.js ./
COPY public ./public
COPY controllers ./controllers
COPY db ./db
COPY middlewares ./middlewares
COPY routes ./routes
COPY sessions  ./sessions
COPY views ./views
COPY .env ./
EXPOSE 3000
CMD ["npm", "start"]
