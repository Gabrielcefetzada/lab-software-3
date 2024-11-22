FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build  # Garante que o build seja rodado

EXPOSE 3000

CMD ["npm", "run", "start", "--watch"]
