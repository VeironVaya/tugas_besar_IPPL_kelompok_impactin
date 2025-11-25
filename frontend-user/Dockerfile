FROM node:22-alpine

WORKDIR /app

# Install deps
COPY package.json package-lock.json* ./
RUN npm install

# Copy only config files (not src — will be bind-mounted)
COPY vite.config.js postcss.config.cjs tailwind.config.js ./
COPY public ./public
COPY index.html ./

# Expose Vite dev port
EXPOSE 5174

# Use CHOKIDAR polling for reliable file watch in container/VMs
ENV CHOKIDAR_USEPOLLING=true

# Start dev server accessible from host
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5174"]
