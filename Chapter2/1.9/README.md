# Log output and ping pong application

This is a simple Node.js application that creates a server that returns a random string on the root path with a timestamp if the request is at the root path, and returns 'pong' and a counter that increments with each request if the request is at the '/pingpong' path.

To deploy the application, use the following command:

```bash
kubectl apply -f manifests
```