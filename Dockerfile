FROM --platform=linux/amd64 node:20.10.0

WORKDIR ./project/js

RUN apt-get update && apt-get install -y -v

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

EXPOSE 3000
CMD ["node", "index.js"]