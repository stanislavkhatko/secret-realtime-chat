# Use Node.js 22 base image
FROM node:22 AS build

# Set working directory
WORKDIR /app/client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vue.js app
RUN npm run build

# Expose port for Vite (optional, if needed)
EXPOSE $VITE_PORT

# Command to run the production server (optional, if needed)
CMD ["npm", "run", "dev"]
