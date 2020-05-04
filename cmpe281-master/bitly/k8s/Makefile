run-cluster:
        kubectl apply -f nosql_pod_1.yml
        kubectl apply -f nosql_pod_2.yml
        kubectl apply -f nosql_pod_3.yml
        kubectl apply -f nosql_pod_4.yml
        kubectl apply -f nosql_pod_5.yml
run-loadbalancer:
        kubectl apply -f nosql_service_loadbalancer.yml
run-nodeport:
        kubectl apply -f nosql_service_nodeport_1.yml
        kubectl apply -f nosql_service_nodeport_2.yml
        kubectl apply -f nosql_service_nodeport_3.yml
        kubectl apply -f nosql_service_nodeport_4.yml
        kubectl apply -f nosql_service_nodeport_5.yml
start-nosql: run-cluster run-loadbalancer
delete-cluster:
        kubectl delete pod nosql-pod-1 nosql-pod-2 nosql-pod-3 nosql-pod-4 nosql-pod-5
delete-loadbalancer:
        kubectl delete service nosql-service-loadbalancer
delete-nodeport:
        kubectl delete service nosql-service-nodeport-1
        kubectl delete service nosql-service-nodeport-2
        kubectl delete service nosql-service-nodeport-3
        kubectl delete service nosql-service-nodeport-4
        kubectl delete service nosql-service-nodeport-5
teardown: delete-loadbalancer delete-cluster
get-docker-id:
        kubectl describe pod nosql-pod-1 | grep docker:// | cut -c30-41
        kubectl describe pod nosql-pod-2 | grep docker:// | cut -c30-41
        kubectl describe pod nosql-pod-3 | grep docker:// | cut -c30-41
        kubectl describe pod nosql-pod-4 | grep docker:// | cut -c30-41
        kubectl describe pod nosql-pod-5 | grep docker:// | cut -c30-41