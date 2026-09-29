# Log output divided into two applications

This is a simple Node.js application that has been divided into two separate applications. The first application, `log-output-1`, creates a random string and saves it to a file. The second application, `log-output-2`, reads the file and returns the contents on the root path with a timestamp.

To deploy the applications, run the following command:

```bash
kubectl apply -f manifests
```