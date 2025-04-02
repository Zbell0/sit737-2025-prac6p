



# toDo App – Dockerized and Published to GCP Artifact Registry

##   Overview  ##

This is a simple Node.js + Express application that allows basic to-do functionality. The app is containerized using Docker, and the image is pushed to **Google Cloud Artifact Registry** for production-ready deployment.

---

##   Technologies Used ##

- Node.js
- Express.js
- Docker
- Docker Compose
- Google Cloud Platform (Artifact Registry)

---

 ## 📋 Prerequisites  ##

Before running or deploying this app, make sure the following are installed and configured:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Google Cloud CLI (gcloud)](https://cloud.google.com/sdk/docs/install)
- A Google Cloud Project
- Artifact Registry API enabled on GCP

---

 ## 🛠️ Setup & Local Docker Usage ##

### 1. Clone the Repository

 #### git clone https://github.com/your-username/sit737-2025-prac5d.git
#### cd sit737-2025-prac5d

### 2. Build Docker Image Locally

#### docker build -t todo-app .

### 3. Run Locally

#### docker run -p 3000:3000 todo-app

#### Then open your browser and go to: http://localhost:3000/todos

---

##  Publishing to Google Cloud Artifact Registry

### 1. Authenticate Google Cloud

gcloud init
gcloud auth configure-docker

### 2. Tag the Docker Image

docker tag todo-app australia-southeast1-docker.pkg.dev/YOUR_PROJECT_ID/todo-repo/todo-app

Replace YOUR_PROJECT_ID with your actual GCP project ID, for example:

docker tag todo-app australia-southeast1-docker.pkg.dev/sit737-25t1-eunji-kim-c5e40ce/todo-repo/todo-app

### 3. Push the Image to GCP

docker push australia-southeast1-docker.pkg.dev/sit737-25t1-eunji-kim-c5e40ce/todo-repo/todo-app



---

##  Verifying the Published Image

### 1. Run the Cloud Image Locally

docker run -p 3000:3000 australia-southeast1-docker.pkg.dev/sit737-25t1-eunji-kim-c5e40ce/todo-repo/todo-app

### 2. Check it in Your Browser

Visit: http://localhost:3000

---

##  Health Check (Optional)

A health check route has been implemented at:

GET /healthz → returns 200 OK



