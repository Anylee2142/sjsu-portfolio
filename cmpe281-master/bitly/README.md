# Project Bitly Clone Journal

1. Pre-requisite
    - Java 1.8
    - Gradle 4.9

2. Libraries & Tools
    - Go 1.13
    - MySQL
    - RabbitMQ
    - Docker version 19.03.5, build 633a0ea838
    - Kong 2.0.2 + Cassandra 3

___________________________________________________________

### For details on overall architecture, Refer to `/bitly/DeploymentAWSGKE.asta`  

### For Extra Credit, `Option: 2, GKE` was selected. Refer to `/bitly/k8s/`
- NoSQL Cluster is deployed in GKE
- 5 Pods
    - Each pod is deployed in separate node by `NodeSelector`
    - Each Node is labeled with its own unique value
- 1 Service whose type is Load Balancer
- Execute `/bitly/configureNoSQLGKE.sh` at Jumpbox
    - to notify all the nodes to each node for designating each other
___________________________________________________________

## Local Steps with Kong
0. NoSQL cluster launching
    - `make docker-build-cloud` at /nosql/api
    - `./admin.sh` -> `u` at /nosql/tests/api (note that `docker-compose.yml` changed)
    - Note that docker image tag is no more `nosql`

0. Servers, MySQL, and RabbitMQ launching
    - `gopath` at /bitly/go (configure GOPATH here)
    - sudo `make local-setup`
    
Refer to `/bitly/postman/` for details of API requests

0. To Shorten Link
    - POST: http://localhost:8000/link
        - Request body JSON: {"Original": "YOUR_ORIGINAL_LINK"}
        - Copy `Shortened` from Response

0. To Redirect 
    - GET: http://localhost:8000/{`Shortened`} at browser
        - Using Chrome browser may use redirection caching.
        - In this case, `Click` event is not properly updated.

0. To Retrieve All the Events (Generate + Click Link) 
    - GET: http://localhost:8000/all
    
0. To Retrieve All the Generate Events
    - GET: http://localhost:8000/generate
    
0. To Retrieve All the Click Events
    - GET: http://localhost:8000/click
    
0. To Aggregate Click Events (How many each Link has been clicked)
    - GET: http://localhost:8000/aggregate

### Note
- **Check MySQL and NoSQL if events are stored.**
    - MySQL = Bash to container and `mysql` ...
    - NoSQL = `http://localhost:9001/api`
- **Note that Most of app's port is not hidden for debugging purporse.**
- **If wanna hide, Modify mapping rules**
    - e.g. Go `/nosql/tests/api/docker-compose.yml` and comment `ports` for NoSQL
    - Go `/bitly/go/Makefile` and delete `-p` rule for cp, lr, ts and any others

___________________________________________________________

## AWS Deploying steps
0. Pre-requisite
    - Public subnet
    - Private subnet with IGW or NAT Gateway
    - Jumpbox (in Public Subnet)
0. Build & Push below images
    - Control Panel : jkl2142/cp:v1.0
    - Link Redirect : jkl2142/lr:v1.0
    - Trend Server : jkl2142/ts:v1.0
    - NoSQL Cluster : jkl2142/nosql:v1.0
0. Launch EC2 instances with Security group (ICMP for ping each instance)
    - One for Kong in Public Subnet (22, 8000, All ICMP)
    - One for Control Panel in Private Subnet (22, 3000, All ICMP)
    - One for Link Redirect in Private Subnet (22, 3001, All ICMP)
    - One for Trend Server in Private Subnet (22, 3002, All ICMP)
    - One for MySQL in Private Subnet (22, 3306, All ICMP)
    - One for RabbitMQ in Private Subnet (22, 5672, 15672. All ICMP)
    - Five for NoSQL Cluster in Private Subnet (22, 8888, 9090, **ALL ICMP**)
0. Now Deploy apps from Jumpbox
    1. NoSQL Cluster (If GKE, Skip this and Refer to `bitly/k8s/K8S_README.md`)
        - For each NoSQL instance
            - docker run --restart always --name nosql -td -p 9090:9090 -p 8888:8888 -e FIRST_NOSQL="YOUR_FIRST_NOSQL_IP" -e SECOND_NOSQL="YOUR_SECOND_NOSQL_IP" -e THIRD_NOSQL="YOUR_THIRD_NOSQL_IP" -e FOURTH_NOSQL="YOUR_FOURTH_NOSQL_IP" -e FIFTH_NOSQL="YOUR_FIFTH_NOSQL_IP"  jkl2142/nosql:v1.0
        - Go to Jumpbox and Execute `/bitly/go/configureNoSQLCloud.sh` after modifying IPs and running Docker IDs from 5 
    2. MySQL
        - Go to MySQL instance 
        - docker run --restart always -d --name mysql -e MYSQL_ROOT_PASSWORD=YOUR_MYSQL_PASSWORD -p 3306:3306 jkl2142/mysql:v1.0
        - mysql --user=root --password=YOUR_MYSQL_PASSWORD
        - Execute `bitly/go/mysql_setup.sql`
    3. RabbitMQ
        - Go to RabbitMQ instance
        - docker run --restart always -itd --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
    4. Control Panel
        - Go to Control Panel instance
        - docker run --restart always --name cp -td -p 3000:3000 -e PORT=3000 -e RABBITMQ_URL="amqp://guest:guest@YOUR_RABBITMQ_IP:5672/" jkl2142/cp:v1.0
    5. Link Redirect
        - Go to Link Redirect instance
        - docker run --restart always --name lr -td -p 3001:3001 -e PORT=3001 -e RABBITMQ_URL="amqp://guest:guest@YOUR_RABBITMQ_UP:5672/" -e NOSQL_URL="http://`ONE_OF_YOUR_NOSQL_IP:9090`/" -e MYSQL_URL="root:YOUR_MYSQL_PASSWORD@tcp(YOUR_MYSQL_IP:3306)/cmpe281" jkl2142/lr:v1.0
        - Note
            - If No Network ELB for the NoSQL Cluster, then type `ONE_OF_YOUR_NOSQL_IP:9090`
            - If Network ELB, `YOUR_NOSQL_NETWORK_ELB_IP:ITS_LISTENING_PORT`    
    6. Trend Server
        - Go to Trend Server instance
        - docker run --restart always --name ts -td -p 3002:3002 -e PORT=3002 -e NOSQL_URL="http://`ONE_OF_YOUR_NOSQL_IP:9090`/" jkl2142/ts:v1.0
        - Note
            - If No Network ELB for the NoSQL Cluster, then type `ONE_OF_YOUR_NOSQL_IP:9090`
            - If Network ELB, `YOUR_NOSQL_NETWORK_ELB_IP:ITS_LISTENING_PORT`
    7. Kong + API Setup (with Cassandra)
        - Go to Kong instance
        - docker run --restart always -d --name kong-database -p 9042:9042 cassandra:3
        - docker run --restart always --link kong-database:kong-database -e "KONG_DATABASE=cassandra" -e "KONG_PG_HOST=kong-database" -e "KONG_PG_PASSWORD=kong" -e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" kong:2.0.2 kong migrations bootstrap
        - docker run --restart always -d --name kong --link kong-database:kong-database -e "KONG_DATABASE=cassandra" -e "KONG_PG_HOST=kong-database" -e "KONG_PG_PASSWORD=kong" -e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" -e "KONG_PROXY_ACCESS_LOG=/dev/stdout" -e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" -e "KONG_PROXY_ERROR_LOG=/dev/stderr" -e "KONG_ADMIN_ERROR_LOG=/dev/stderr" -e "KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl" -p 8000:8000 -p 8443:8443 -p 8001:8001 -p 8444:8444 kong:2.0.2
        - Execute `/bitly/go/configureKongCloud` after modifying cp, lr and ts inside the script
0. Test with `/bitly/postman/` collections
    - Make sure `http://YOUR_KONG_PUBLIC_IP:8000`
    - e.g
        - http://YOUR_KONG_PUBLIC_IP:8000/ping
        - http://YOUR_KONG_PUBLIC_IP:8000/link
        - http://YOUR_KONG_PUBLIC_IP:8000/all
        - http://YOUR_KONG_PUBLIC_IP:8000/generate
        - http://YOUR_KONG_PUBLIC_IP:8000/click
        - http://YOUR_KONG_PUBLIC_IP:8000/aggregate
0. If that works, then `TRY_NETWORK_ELB_AND_AUTOSCALING_GROUP`
    - Make Network ELB for NoSQL Cluster
        - Launch by GKE
            - Refer to `bitly/k8s/K8S_README.d`
        - Launch by AWS
            - Target group for NoSQL = 5 NoSQL instances
            - Listening on 8080 -> Directing to 9090
    - Rerun docker container of Link Redirect and Trend Server
        - Change -e NOSQL_URL="http://`ONE_OF_YOUR_NOSQL_IP:9090`/" to -e NOSQL_URL="http://`YOUR_NOSQL_NETWORK_ELB_IP:ITS_LISTENING_PORT`/"
    - Make AMIs from Control Panel and Link Redirect
    - Make Auto Scale Group for Control Panel and Link Redirect
        - For each
            - From those AMIs, Launch Conf, Target Group, Auto Scaling Group
            - Min 1, Max 3 as Project Requirement
    - Make Network ELB for Control Panel, Link Redirect
        - Target group for Control Panel and Link Redirect = Target groups you link with the above scaling groups 
		- Control Panel
			- Listening on 8080 -> Directing to 3000
        - Link Redirect
			- Listening on 8080 -> Directing to 3001
    - Reconfigure Kong's API Setup
        - In `/bitly/go/configureKongCloud.sh`
            - change cp and lr respectively to have its Network ELB address and listening port you just made
        - Execute it

## Shutdown
0. (If with AWS Network ELB) Delete ELBs, target groups, auto scaling groups, and launch configurations.
0. (If with GKE NoSQL Cluster) Delete CLOUD NAT and K8S Cluster
0. Stop All the EC2 instances
0. Delete Kong Instance
    - (If First deploying) Make AMI for Kong instance

## Relaunch (Without network ELB)
0. Start All the EC2 instances
0. Launch Kong instance from Kong AMI and relaunch kong containers
0. Go to Jumpbox and Execute `/bitly/go/configureNoSQLCloud.sh` you modified

## Relaunch (With network ELB)
0. Start All the EC2 instances
0. Launch Kong instance from Kong AMI and relaunch kong containers
0. (If AWS NoSQL) Go to Jumpbox, Wait Until NoSQL instances launched, and Execute `/bitly/go/configureNoSQLCloud.sh` you modified
0. Do `TRY_NETWORK_ELB_AND_AUTOSCALING_GROUP` with updated `NOSQL_URL`
    - for Link Redirect and Trend Server

___________________________________________________________

# Design Decisions
0. CQRS + Event Sourcing + Message Queue (RabbitMQ)
    - Publisher
        - Control Panel
            - REST API for shortening link (POST)
            - Publish to Link Redirect and User Query 
    - Subscriber
        - Link Redirect
            - Subscribe to Control Panel
            - Update MySQL and NoSQL for shortened Link (event handling)
            - REST API for redirection and retrieving link(s) (GET)
                - Fetch data from both NoSQL(cache hit) and MySQL(cache miss)


1. Main Database table design **Make sure DB is persistent, not ephemeral (e.g. not put in docker instance)**
    - Schema   
    = (User) 1 - * (Link)
        1. User(`user_pk`, user_uuid, id, pw)
        2. Link(`link_pk`, link_uuid, original_link, shortened_link, create_time, __user_pk__)
    = Why pk with uuid?
        - Index for PK = If entry too big, So is the size of indices -> may be detrimental to performance

2. CRUD Based REST API + CQRS Architecture Pattern and Event Sourcing
    - Command
        - Control Panel
            - POST: http://localhost:3000/link -> Shortening Link
                - { "Original" "YOUR_WEB_LINK" }
    - Query
        - Link Redirect
            - GET: http://localhost:3001/{shortenedLink} -> Redirecting to original link
    - Trend Server
        - GET: http://localhost:3002/all -> Retrieving all the Events 
        - GET: http://localhost:3002/generate -> Retrieving all the `Generate` Events
        - GET: http://localhost:3002/generate/{shortenedLink} -> Retrieving a `Generate` Event with the shortened Link
        - GET: http://localhost:3002/click -> Retrieving all the `Click` Events
        - GET: http://localhost:3002/click/{shortenedLink} -> Retrieving `Click` Event(s) with the shortened Link
        - GET: http://localhost:3002/aggregate    -> Aggregate and Sort how many times each Link clicked

3. Key Value Document in NoSQL Cluster
    - {"Event", "Uuid", "Original", "Shortened", "Time"}
        - Event = Either Generate or Click on `Link`
        - Uuid = Works as Primary Key
        - Original = Original Link
        - Shortened = Shortened Link
        - Time = Generated or Clicked time
    
4. NoSQL Cluster AWS deploying refactoring

5. Routing requests to both CP and LR by Kong API Gateway

___________________________________________________________

### How to set NoSQL Cluster in separate EC2 instances?
1. 5 EC2 Launch (Security group = 8888, 9999, 80, 22, ICMP)
2. Pass IP to the App and Build & Push to docker hub
3. Deploy docker at each instance
4. Pass (IP, Docker ID) to ./configureNoSQLCloud.sh and Execute at jumpbox

___________________________________________________________

### Resources

Event Sourcing
- https://eventuate.io/whyeventsourcing.html

CQRS
- https://hackernoon.com/cqrs-command-query-responsibility-segregation-8vb32x3
- https://martinfowler.com/bliki/CQRS.html

CQRS + Event Sourcing + message queue
- https://www.confluent.io/blog/event-sourcing-cqrs-stream-processing-apache-kafka-whats-connection/
- http://progressivecoder.com/event-sourcing-cqrs-using-spring-boot-rabbitmq-and-axon-part-1/

Trend Server
- http://www.nyangau.org/trendserver/trendserver.htm

GO's try/catch = Panic
- https://blog.golang.org/defer-panic-and-recover

GO Convert String to JSON withoput struct
- https://medium.com/@irshadhasmat/golang-simple-json-parsing-using-empty-interface-and-without-struct-in-go-language-e56d0e69968

HTTP Redirect Status Code
- https://www.contentkingapp.com/academy/redirects/
- https://stackoverflow.com/questions/9020162/avoiding-301-redirect-caching
- https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.3.8

Execute MySQL from command line
- https://stackoverflow.com/questions/8055694/how-to-execute-a-mysql-command-from-a-shell-script
- `mysql -u $user -p$passsword -Bse "command1;command2;....;commandn"`
- Don't put double-quote or back-tick in query when docker-mysql
    - You need to put \ every in front of those
    - If necessary, then just single-quote

Makefile
- https://stackoverflow.com/questions/649246/is-it-possible-to-create-a-multi-line-string-variable-in-a-makefile

___________________________________________________________
