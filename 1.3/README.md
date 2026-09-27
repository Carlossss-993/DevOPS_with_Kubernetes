# Log Output Application

This is a simple Node.js application that generates a random string and logs it to the console every 5 seconds.The difference between this application and the previous one is that this application contains a deployment manifest that can be used to deploy the application to a Kubernetes cluster. The manifest is located in the `manifests` directory.

Deploy with the following command:

```bash
kubectl apply -f manifests
```