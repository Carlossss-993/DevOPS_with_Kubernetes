# The project, step 10

This is a simple Node.js application that creates a server that returns a random photo which is fetched from the Lorem Picsum like service, then it saves the photo to a persistent volume. Each 10 minutes, the application fetches a new photo and saves it to the persistent volume. Additional it has an input field where the user can enter a task and it will be saved to memory. Also, It has an endpoint /todos that returns the list of tasks in memory. The difference with the previous step is that now the application has a configmap that contains every url and port of the services that the application needs to connect to. The application reads the configmap and uses the values to connect to the services.

To deploy the application, use the following command:

```bash
kubectl apply -f manifests
```