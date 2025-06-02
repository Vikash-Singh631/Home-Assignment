# ---------- Stage 1: Build ----------
FROM node:18 AS builder

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# ---------- Stage 2: Production ----------
FROM node:18-slim

# Create non-root user
RUN useradd -m -d /home/nodeuser nodeuser

# Create app and npm cache directories with correct ownership
RUN mkdir -p /usr/src/app /home/nodeuser/.npm \
 && chown -R nodeuser:nodeuser /usr/src/app /home/nodeuser

# Set working directory
WORKDIR /usr/src/app

# Copy only the necessary artifacts from the builder stage
COPY --chown=nodeuser:nodeuser --from=builder /usr/src/app .

# Switch to non-root user
USER nodeuser

# Expose port
EXPOSE 3000

# Start app
CMD [ "npm", "start" ]

