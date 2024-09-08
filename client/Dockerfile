# Use an official Node.js runtime as a parent image
FROM node:20-alpine as build-stage

# Set the working directory in the container
WORKDIR /app

COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --pure-lockfile

# Copy the rest of the application code
COPY . .

RUN mkdir -p /app/dist && \
    chmod -R 777 /app/dist && \
    chmod -R 777 /app

RUN yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=build-stage /app/dist /usr/share/nginx/html

ENV VITE_API_URL=${VITE_API_URL}
#ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
