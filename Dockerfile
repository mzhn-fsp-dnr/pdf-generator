FROM node:lts

EXPOSE 3000

WORKDIR /app
COPY . .

RUN npm ci

CMD ["npm", "start"]