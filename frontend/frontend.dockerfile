# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Ensure proper standalone setup
RUN cp -r .next/standalone/* ./
RUN mkdir -p .next/static
RUN mv .next/static/* .next/static/

EXPOSE 3000

# Start the application in standalone mode
CMD ["node", "server.js"]