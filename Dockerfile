FROM node:18

WORKDIR /app

COPY . .
RUN npm i -g typescript
RUN npm i

EXPOSE 3000

CMD ["npm", "start"]
