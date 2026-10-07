# The project, step 8

This is a simple Node.js application that creates a server that returns a random photo which is fetched from the Lorem Picsum like service, then it saves the photo to a persistent volume. Each 10 minutes, the application fetches a new photo and saves it to the persistent volume. Additional it has an input field where the user can enter a task and it will be saved to memory. Also, It has an endpoint /todos that returns the list of tasks in memory. 

To deploy the application, use the following command:

```bash
kubectl apply -f manifests
```