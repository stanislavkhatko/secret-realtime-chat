# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --pure-lockfile

# Copy the rest of the application code
COPY . .

USER node

# Expose the port your app runs on
EXPOSE 8080

# Define the command to run your app
CMD ["node", "index.js"]

