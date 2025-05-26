FROM node:20-alpine

RUN npm install -g pnpm@latest

RUN corepack enable
# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies with retry logic and no frozen lockfile
RUN pnpm install --no-frozen-lockfile || pnpm install --no-frozen-lockfile || pnpm install --no-frozen-lockfile

# Copy source code
COPY . .

# Generate Payload types (if needed)
RUN pnpm payload generate:types

# Expose port 3000
EXPOSE 3000

# Start the development server
CMD ["pnpm", "run", "dev"]