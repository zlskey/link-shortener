FROM node:17-alpine3.14 AS build
WORKDIR /
COPY . .
RUN npm run build


FROM node:17-alpine3.14
WORKDIR /
COPY --from=build /package.json /package.json
RUN npm install

COPY --from=build /dist /dist 
COPY --from=build /views /views 
COPY --from=build /public /public 

ENV MONGODB_URL=mongodb://mongodb_url/name
ENV DOMAIN=http://localhost
ENV PORT=80

CMD [ "npm", "start" ] 
