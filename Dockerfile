FROM node:18-alpine
RUN apk add --no-cache python3 make g++ krb5-dev
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
