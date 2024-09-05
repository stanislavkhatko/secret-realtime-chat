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

ENV NODE_ENV=production
ENV DATABASE_URL='mongodb+srv://skhatko:HhdSRTEC2gVzM636@secret-chat-db-cluster.fgqy5yj.mongodb.net/?retryWrites=true&w=majority&appName=secret-chat-db-cluster'
ENV JWT_SECRET=secrethere
ENV PORT=5004
ENV VITE_SOCKET_PORT=5004


# Expose the port your app runs on
EXPOSE 8080

# Define the command to run your app
#CMD ["node", "src/index.js"]
CMD ["npm", "run", "start"]
