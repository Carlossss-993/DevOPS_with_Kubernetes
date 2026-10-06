# The project, step 7

This is a simple Node.js application that creates a server that returns a random photo which is fetched from the Lorem Picsum like service, then it saves the photo to a persistent volume. Each 10 minutes, the application fetches a new photo and saves it to the persistent volume. Additional it has an input field where the user can enter a task, for now it does not save the task, and it has an unordered list that shows some tasks, for now it is hardcoded.

To deploy the application, use the following command:

```bash
kubectl apply -f manifests
```