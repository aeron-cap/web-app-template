# Node image for build
FROM node:22-alpine AS builder
# Build tools for native modules
RUN apk add --no-cache python3 make g++
# Sets Current Working Dir
WORKDIR /app
# Install all deps
COPY package*.json ./
RUN npm ci
# Copy source files and build
COPY . .
RUN npm run build
# ------------------------------------
# For deps
FROM node:22-alpine AS deps
# reinstall tools
RUN apk add --no-cache python3 make g++
# Go to app dir
WORKDIR /app
# Install all deps except dev deps
COPY package*.json ./
RUN npm ci --omit=dev
# ------------------------------------
# Final
FROM node:22-alpine AS runner
# app/
WORKDIR /app
# Set env to production
ENV NODE_ENV=production
# Copy compiled code from builder
COPY --from=builder /app/dist ./dist
# Copy only production node_modules
COPY --from=deps /app/node_modules ./node_modules
# Copy package.json
COPY package.json ./
# User non-root 'node' user given by the image
USER node
# Expose port same as nestjs
EXPOSE 3000
# Start the app
COPY docker-entrypoint.sh /usr/local/bin
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["node", "dist/main"]