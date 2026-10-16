# 3.4 Rewritten Route

This is a simple Node.js application that creates a server that returns a random string on the root path with a timestamp and the pong counter if the request is at the root path, and returns 'pong' and a counter that increments with each request if the request is at the '/pingpong' path. The difference between this application and the previous one is that this application uses a ConfigMap to store some of the configuration like one file information.txt and one environment variable MESSAGE. Also, in this version it uses a postgreSQL database to store the pong counter.

Additionally, in 3.1 the application is deployed on GKE (Google Kubernetes Engine) and uses a LoadBalancer service to expose the application to the internet.

Additionally, in 3.2 the full application, including log-output, is deployed on GKE and uses a LoadBalancer service to expose the application to the internet

In 3.3, the application is deployed on GKE and uses a Gateway API to expose the application to the internet.

In 3.4, the application uses rewritten api to rewrite the /pingpong path to root path and return the pong counter.

To deploy the application, use the following command:

```bash
kubectl apply -f manifests
```