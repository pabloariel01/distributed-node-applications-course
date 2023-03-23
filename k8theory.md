minikube

kubectl create deployment hello-minikube \
  --image=k8s.gcr.io/echoserver:1.10
$ kubectl get deployments
$ kubectl get pods
$ kubectl get rs

kubectl get deployments
  NAME             READY   UP-TO-DATE   AVAILABLE   AGE
  hello-minikube   0/1     1            0           3s
$ kubectl get pods
  NAME                            READY STATUS            RESTARTS AGE
  hello-minikube-6f5579b8bf-rxhfl 0/1   ContainerCreating 0        4s
$ kubectl get rs
  NAME                        DESIRED   CURRENT   READY   AGE
  hello-minikube-64b64df8c9   1         1         0       0s

  $ kubectl get deployments
  NAME             READY   UP-TO-DATE   AVAILABLE   AGE
  hello-minikube   1/1     1            1           7m19s
$ kubectl get pods -L app
  NAME                READY  STATUS   RESTARTS  AGE    APP
  hello-minikube-123  1/1    Running  0         7m24s  hello-minikube
$ kubectl get rs
  NAME                        DESIRED   CURRENT   READY   AGE
  hello-minikube-64b64df8c9   1         1         1       7m25s

  $ kubectl expose deployment hello-minikube \
  --type=NodePort --port=8080
$ kubectl get services -o wide

this service is set to NodePort, which essentially forwards the specified port on the node machine to the port used by the container within the pod


minikube service hello-minikube --url //to get the address

ocker build -t recipe-api:v1 .

minikube image load recipe-api:v1  // transfers the image to minikube images

 kubectl.exe apply -f .\recipe-api\recipe-deployment.yml

 kubectl.exe apply -f .\recipe-api\recipe-api-network.yml

 kubectl get services -o wide

 for ingress
    minikube addons enable ingress


 docker build -t web-api:v1 .
 minikube image load web-api:v1
$ kubectl apply -f web-api-deployment.yml
$ kubectl apply -f web-api-network.yml

kubectl get ingress web-api-ingress // to get address
kubectl get pods -l app=recipe-api
$ kubectl scale deployment.apps/recipe-api --replicas=10

 Horizontal Pod Autoscaler. This is used to dynamically scale the number of replicas based on various criteria such as CPU usage or even based on custom metrics

 update the deployment to renew pods

 kubectl apply -f web-api-deployment.yml --record=true allows to reuse the command in history

 kubectl rollout history deployment.v1.apps/web-api

 kubectl rollout undo deployment.v1.apps/web-api \
  --to-revision=<RELEASE_NUMBER>