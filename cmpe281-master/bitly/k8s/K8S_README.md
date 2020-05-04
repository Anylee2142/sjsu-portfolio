
## Deploying NoSQL Cluster with GKE on Cloud
0. Create VPC and Private Subnet
    - By enabling `Private Google Access`

0. Attach Cloud NAT to the subnet

0. Launch GKE Cluster, and make the cluster size 5
    - Check instance IP from cloud console

1. Label each Node
	- kubectl get nodes --show-labels
	- kubectl label nodes <your-first-node> nosql-pod=1
	- kubectl label nodes <your-second-node> nosql-pod=2
	- kubectl label nodes <your-third-node> nosql-pod=3
	- kubectl label nodes <your-fourth-node> nosql-pod=4
	- kubectl label nodes <your-fifth-node> nosql-pod=5

2. At GKE master console
	- `make start-nosql`
	
3. Go to jumpbox & Execute `bitly/k8s/configureNoSQLGKE.sh` after fixing each Cloud IP.
    - Check Cloud IP by `kubectl get pod -o wide`

4. Copy External IP of Load Balancer by `kubectl get service`

______________________________________________

## Deploying NoSQL Cluster with Local K8S
1. Deployment
    - kubectl apply -f nosql_deployment.yml
2. Service
    - kubectl apply -f nosql_service.yml
3. Run configure.sh
    - kubectl get pod -o wide
    - Copy `IP`s there
    - docker ps
    - Copy `Container ID`s there
    - Execute `/bitly/go/configureNoSQLCloud.sh` after modifying IPs and running Docker IDs from 5   
    (or `/nosql/tests/api/configure.sh`)
4. Check if all nodes are registered
    - curl localhost:8888/node
______________________________________________

Load Balancer external IP
1. kubectl apply -f YOUR_LOAD_BALANCER_SERVICE.yml

2. kubectl get service

3. Check the External IP of Load Balancer service you just added