FROM node:12-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
EXPOSE 80
ENV PORT 80
CMD ["npm","start"]
