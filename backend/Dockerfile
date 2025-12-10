# Stage 1: Build stage
FROM golang:1.22.5-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum first for caching
COPY go.mod go.sum ./
RUN go mod download

# Copy the entire backend source code
COPY . .

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux go build -o backend ./cmd

# Stage 2: Final minimal image
FROM alpine:latest

WORKDIR /root/

# Install ONLY certificates (not mariadb-client)
RUN apk --no-cache add ca-certificates

COPY --from=builder /app/backend .

EXPOSE 8080

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD nc -z localhost 8080 || exit 1

CMD ["./backend"]
