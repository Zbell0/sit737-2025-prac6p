# Todo App Docker & Kubernetes Deployment Guide

This repository contains a Todo application deployment configuration using Docker and Kubernetes. This guide provides step-by-step instructions for building, containerizing, and deploying the application.

## Project Structure

```
.
├── app.js                # Express application entry point
├── Dockerfile            # Docker build instructions
├── docker-compose.yml    # Docker Compose configuration
├── deployment.yaml       # Kubernetes deployment configuration
├── service.yaml          # Kubernetes service configuration
└── README.md             # This documentation file
```

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Kubernetes](https://kubernetes.io/docs/setup/) (Minikube or any Kubernetes cluster)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Node.js](https://nodejs.org/) (required for local development only)

## Step 1: Understanding the Application

This Todo application is built using:
- Node.js and Express for the backend
- EJS for templating
- MongoDB for data storage

The main entry point is `app.js`, which sets up the Express server, connects to MongoDB, and defines routes.

## Step 2: Containerizing with Docker

### Dockerfile Explanation

```dockerfile
FROM node:18           # Base image
WORKDIR /app           # Set working directory
COPY package*.json ./  # Copy package files first (for caching)
RUN npm install        # Install dependencies
COPY . .               # Copy application code
EXPOSE 3000            # Expose application port
CMD ["npm", "start"]   # Start command
```

### Building the Docker Image

```bash
# Build the Docker image
docker build -t todo-app .
```

## Step 3: Docker Compose Setup

The `docker-compose.yml` file provides a convenient way to run the application:

```yaml
version: "3"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/healthz"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Running with Docker Compose

```bash
# Start the application with Docker Compose
docker-compose up

# Stop the application
docker-compose down
```

## Step 4: Kubernetes Deployment

### Deployment Configuration

The `deployment.yaml` file creates a Kubernetes Deployment that manages the Todo application pods:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: todo-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: todo
  template:
    metadata:
      labels:
        app: todo
    spec:
      containers:
        - name: todo
          image: but05051/todo-app
          ports:
            - containerPort: 3000
```

### Service Configuration

The `service.yaml` file exposes the application to external traffic:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: todo-service
spec:
  selector:
    app: todo
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
  type: NodePort
```

### Deploying to Kubernetes

```bash
# Apply the deployment
kubectl apply -f deployment.yaml

# Apply the service
kubectl apply -f service.yaml

# Check deployment status
kubectl get deployments

# Check service status
kubectl get services

# Get the URL (if using Minikube)
minikube service todo-service --url
```

## Step 5: Accessing the Application

After deployment, the Todo application will be accessible:

- **Docker Compose:** Visit http://localhost:3000
- **Kubernetes:** Use the NodePort provided by `kubectl get services` or the URL from Minikube

