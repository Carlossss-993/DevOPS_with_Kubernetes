# The project, step 6

This is a simple Node.js application that creates a server that returns a random photo which is fetched from the Lorem Picsum like service, then it saves the photo to a persistent volume. Each 10 minutes, the application fetches a new photo and saves it to the persistent volume.

To deploy the application, use the following command:

```bash
kubectl apply -f manifests
```