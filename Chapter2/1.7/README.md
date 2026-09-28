# Log Output 2 Application

This is a simple Node.js application that creates a server that returns a random string on the root path with a timestamp. We have a service manifest that exposes the application on port 3000, and an ingress manifest that exposes it via a hostname.

Deploy with the following command:

```bash
kubectl apply -f manifests
```