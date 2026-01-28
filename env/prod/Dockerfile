FROM node:22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache curl unzip bash
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

COPY package.json bun.lock* ./

RUN bun install --frozen-lockfile

COPY . .

ENV NODE_ENV=production
RUN bun run build:showcase


FROM nginxinc/nginx-unprivileged:latest AS runner

# Copy nginx configuration
COPY ./env/prod/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /var/www/html

# Set proper permissions for nginx directories
# RUN mkdir -p /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp && \
#     chown -R 1000:1000 /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp && \
#     chown -R 1000:1000 /usr/share/nginx/html

# Switch to non-root user (nginx user with uid 1000)
USER 1000

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
