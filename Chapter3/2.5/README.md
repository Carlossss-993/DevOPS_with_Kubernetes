# 2.5 Configmaps

This is a simple Node.js application that creates a server that returns a random string on the root path with a timestamp and the pong counter if the request is at the root path, and returns 'pong' and a counter that increments with each request if the request is at the '/pingpong' path. The difference between this application and the previous one is that this application uses a ConfigMap to store some of the configuration like one file information.txt and one environment variable MESSAGE.

To deploy the application, use the following command:

```bash
kubectl apply -f manifests
```