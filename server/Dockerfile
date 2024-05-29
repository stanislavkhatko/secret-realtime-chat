# Use Node.js 22 base image
FROM node:22

# Set working directory
WORKDIR /app/server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port from .env
EXPOSE $PORT

# Command to run the server
CMD ["node", "index.js"]
