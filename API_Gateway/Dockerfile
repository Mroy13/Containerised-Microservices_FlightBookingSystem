FROM node

WORKDIR /d/fstack_dev/Backend_dev/Deployment/Containerised-microservices-fb/api-gateway

COPY . .

RUN npm ci

CMD ["node","--watch","src/index.js"]