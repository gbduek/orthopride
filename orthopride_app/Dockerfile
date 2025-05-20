# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Fix vite permission if needed (optional fallback)
RUN chmod +x node_modules/.bin/vite || true

# Build app
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy built files to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port and start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
