# Stage 1: Build stage
FROM golang:1.22.5-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the entire backend source code
COPY . .

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux go build -o backend ./cmd/main.go


FROM alpine:latest

WORKDIR /root/

# Install required tools
RUN apk --no-cache add ca-certificates mariadb-client netcat-openbsd

# Copy built Go binary
COPY --from=builder /app/backend .

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD nc -z localhost 8080 || exit 1

CMD ["./backend"]
