FROM node:24-alpine3.22

WORKDIR /app/backend 

COPY backend/package*.json ./

RUN npm install

CMD ["npm", "run", "start:dev"]