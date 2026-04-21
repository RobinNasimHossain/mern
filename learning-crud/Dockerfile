FROM node:20-slim

WORKDIR /app

# Copy server dependencies and install
COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev

# Copy server source
COPY server/ ./server/

# Copy pre-built client
COPY client/dist/ ./client/dist/

EXPOSE 4000

CMD ["node", "server/index.js"]
