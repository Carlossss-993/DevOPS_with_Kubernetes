# 3.7. The project, step 16

In 3.7. I modified the GitHub Actions workflow to work with whatever branch is pushed to the repository. The workflow will create a new namespace if it doesn't exist, and it will deploy the application to that namespace. The workflow will also build and push the Docker images to the Google Artifact Registry.