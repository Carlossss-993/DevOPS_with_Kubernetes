# 3.6 The project, step 15

This is a simple Node.js application that creates a server that returns a random photo which is fetched from the Lorem Picsum like service, then it saves the photo to a persistent volume. Each 10 minutes, the application fetches a new photo and saves it to the persistent volume. Additional it has an input field where the user can enter a task and it will be saved to memory. Also, It has an endpoint /todos that returns the list of tasks in memory. The difference with the previous step is that now the application has a configmap that contains every url and port of the services that the application needs to connect to. The application reads the configmap and uses the values to connect to the services. Additionaly, this application uses postgres as a database to save the tasks. The application connects to the database using the values from the configmap. Also, the application uses cron job to create a new task every hour and, in this version it uses Loki, Alloy, Grafana and Prometheus to monitor the application. 

In 3.5, the aplication is deployed using kustomize and the docker images are in kustomization.yaml file, in the deployments we only have the image tag and the imagePullPolicy.

In 3.6, the application uses GitHub Actions to build and push the docker images to Google Artifact Registry, then it deploys the application to GKE using kustomize

To deploy the application, use the following command:

```bash
kubectl apply -f manifests
```