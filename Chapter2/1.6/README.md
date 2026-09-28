# Project, step 4

This is a simple Node.js application that creates a server that returns 'Hello from 1.5 app!' on the root path and 'This is the help page for 1.5 app!' on the '/help' path. The default port is 3000, but it can be changed by setting the PORT environment variable. The difference between this and the previous version is that in this version, we have a new service that exposes the application on port 30080.

To run the application, use the following command:

```bash
kubectl apply -f manifests
```