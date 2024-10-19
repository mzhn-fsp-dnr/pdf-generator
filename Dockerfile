FROM node:lts

EXPOSE 3010

WORKDIR /app
COPY . .

RUN npm ci

CMD ["npm", "start"]