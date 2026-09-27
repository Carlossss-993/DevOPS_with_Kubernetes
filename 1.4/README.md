# Log Output Application

This is a simple Node.js application that creates a server and logs "Server started on port NNNN" when the server is started. The default port is 3000, but it can be changed by setting the PORT environment variable. The difference between this application and the previous one is that this application contains a deployment manifest that can be used to deploy the application to a Kubernetes cluster. The manifest is located in the `manifests` directory.

Deploy with the following command:

```bash
kubectl apply -f manifests
```