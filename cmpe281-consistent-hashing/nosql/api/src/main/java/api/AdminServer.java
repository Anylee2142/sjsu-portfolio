package api ;

import org.restlet.*;
import org.restlet.data.Method;
import org.restlet.data.Protocol;
import org.restlet.routing.Router;

import org.restlet.resource.*;

import java.net.InetAddress;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap ;
import java.util.concurrent.ConcurrentLinkedQueue ;

public class AdminServer extends Application {

    private static Map<String, String> envField ;

    private static AdminServer _adminServer ;

   // Node Sync Queues
    private static ConcurrentLinkedQueue<SyncRequest> node1_sync_queue ; 
    private static ConcurrentLinkedQueue<SyncRequest> node2_sync_queue ; 
    private static ConcurrentLinkedQueue<SyncRequest> node3_sync_queue ; 
    private static ConcurrentLinkedQueue<SyncRequest> node4_sync_queue ;
    private static ConcurrentLinkedQueue<SyncRequest> node5_sync_queue ; 

    // Instance Variables
    private ConcurrentHashMap<String,Node> nodes = new ConcurrentHashMap<String,Node>() ;
    private ConcurrentHashMap<String,ClientResource> clients = new ConcurrentHashMap<String,ClientResource>() ;
    private String  my_ip = "" ;
    private String  my_host = "" ;

    // For update
    private int lastIndex = -1;
    private static boolean isDoable = true;

    // For create/delete
    private HashMap<String, Integer> history = null;

    private List<String> keys = new ArrayList<>();


    public synchronized static AdminServer getInstance()
    {
        if ( _adminServer == null ) {
            _adminServer = new AdminServer();
            _adminServer.initConfig() ;
        }
        return _adminServer;
    }

    public static void startup( Map<String, String> env  ) {
        try {
            System.err.println("ADMIN STARTUP STARTED !!") ;
            Component server = new Component() ;
            System.err.println("ENV BEFORE ADMIN !!") ;
            envField = env ;
            System.err.println("ENV AFTER ADMIN !!") ;
            server.getServers().add(Protocol.HTTP, 8888) ;
            server.getDefaultHost().attach(AdminServer.getInstance()) ;
            server.start() ;

            // start Ping Checks Thread to monitor cluster status
            PingChecks pings = new PingChecks() ;
            new Thread(pings).start();

            node1_sync_queue = new ConcurrentLinkedQueue<SyncRequest>() ; 
            node2_sync_queue = new ConcurrentLinkedQueue<SyncRequest>() ; 
            node3_sync_queue = new ConcurrentLinkedQueue<SyncRequest>() ; 
            node4_sync_queue = new ConcurrentLinkedQueue<SyncRequest>() ; 
            node5_sync_queue = new ConcurrentLinkedQueue<SyncRequest>() ; 

            // start Sync Threads to Sync Changes in cluster
            // retry attempted every Sync Cycle
            Sync sync1 = new Sync( "api_node_1", node1_sync_queue ) ;
            new Thread(sync1).start() ;             
            Sync sync2 = new Sync( "api_node_2", node2_sync_queue ) ;
            new Thread(sync2).start() ;              
            Sync sync3 = new Sync( "api_node_3", node3_sync_queue ) ;
            new Thread(sync3).start() ;              
            Sync sync4 = new Sync( "api_node_4", node4_sync_queue ) ;
            new Thread(sync4).start() ;              
            Sync sync5 = new Sync( "api_node_5", node5_sync_queue ) ;
            new Thread(sync5).start() ;

        } catch ( Exception e ) {
            System.out.println( e ) ;
        }
    }

    // TODO: refactor syncFunctions into one, or overload

    public static void syncDocument( String key, String command ) {

        try {
            // TODO: add keys here?
            AdminServer server = AdminServer.getInstance() ;
            // this syncObject is updated document.
            // If other app servers receive this, then that's updated one.
            System.err.println("Stuck here");
            SyncRequest syncObject = API.get_sync_request( key ) ;
            System.err.println("\t\tSync Vclock just before sending sync request");
            syncObject.command = command ;
            int my_index = server.nodeIndex( server.getMyHostname() ) ;
            System.out.println(     "Sync Document: Key = " + key + " Command = " + command + " "
                                    + "[host:" + server.getMyHostname() 
                                    + " index:" + Integer.toString(my_index) + "]" 
                                     ) ;
            System.err.println(     "Sync Document: Key = " + key + " Command = " + command + " "
                    + "[host:" + server.getMyHostname()
                    + " index:" + Integer.toString(my_index) + "]"
            ) ;

            // This node did operation after partition
            if (server.lastIndex!=-1 || server.getHistory() != null) {
                System.err.println("##################### INVOKED HERE ##################");
                isDoable = false;
            }

            switch ( my_index ) {
                case 1:
                    //node1_sync_queue.add( syncObject ) ;
                    node2_sync_queue.add( syncObject ) ;
                    node3_sync_queue.add( syncObject ) ;
                    node4_sync_queue.add( syncObject ) ;
                    node5_sync_queue.add( syncObject ) ;
                    break ;
                case 2:
                    node1_sync_queue.add( syncObject ) ;
                    //node2_sync_queue.add( syncObject ) ;
                    node3_sync_queue.add( syncObject ) ;
                    node4_sync_queue.add( syncObject ) ;
                    node5_sync_queue.add( syncObject ) ;
                    break ;
                case 3:
                    node1_sync_queue.add( syncObject ) ;
                    node2_sync_queue.add( syncObject ) ;
                    //node3_sync_queue.add( syncObject ) ;
                    node4_sync_queue.add( syncObject ) ;
                    node5_sync_queue.add( syncObject ) ;
                    break ;
                case 4:
                    node1_sync_queue.add( syncObject ) ;
                    node2_sync_queue.add( syncObject ) ;
                    node3_sync_queue.add( syncObject ) ;
                    //node4_sync_queue.add( syncObject ) ;
                    node5_sync_queue.add( syncObject ) ;
                    break ;
                case 5:
                    node1_sync_queue.add( syncObject ) ;
                    node2_sync_queue.add( syncObject ) ;
                    node3_sync_queue.add( syncObject ) ;
                    node4_sync_queue.add( syncObject ) ;
                    //node5_sync_queue.add( syncObject ) ;
                    break ;
            }

        } catch ( Exception e ) {
            System.out.println( e ) ;
        }

    }

    public static void syncDocumentIdentified( String key, String value, String command, int identified_node) {
        try {
            // TODO: add keys here?
            AdminServer server = AdminServer.getInstance() ;
            // this syncObject is updated document.
            // If other app servers receive this, then that's updated one.
            System.err.println("Stuck here");
            SyncRequest syncObject = null ;
            if ( command.equals("create") ) { // if hash create
                syncObject = new SyncRequest() ;
                syncObject.key = key ;
                syncObject.json = value ;
                System.err.println("\t\tCREATE VALUE = " + value);
//            syncObject.vclock = doc.vclock ;
                syncObject.isHashingCreate = true ;
            } else if ( command.equals("update") ){ // if hash update
                syncObject = API.get_sync_request( key ) ;
                syncObject.json = value ;
                syncObject.isHashingUpdate = true ;
            } else if ( command.equals("delete") ) { // if hash delete
                syncObject = API.get_sync_request( key ) ;
                syncObject.isHashingDelete = true ;
            }
            syncObject.command = command ;
            System.err.println("@@SYNC OBJECT TO STRING = " + syncObject.toString());

            System.err.println("\t\tSync Vclock just before sending sync request");
            int my_index = server.nodeIndex( server.getMyHostname() ) ;
            System.out.println(     "Sync Document: Key = " + key + " Command = " + command + " "
                    + "[host:" + server.getMyHostname()
                    + " index:" + Integer.toString(my_index) + "]"
            ) ;
            System.err.println(     "Sync Document: Key = " + key + " Command = " + command + " "
                    + "[host:" + server.getMyHostname()
                    + " index:" + Integer.toString(my_index) + "]"
            ) ;

            // This node did operation after partition
            if (server.lastIndex!=-1 || server.getHistory() != null) {
                System.err.println("##################### INVOKED HERE ##################");
                isDoable = false;
            }

            ArrayList<ConcurrentLinkedQueue<SyncRequest>> sync_queues = new ArrayList<>();
            sync_queues.add(null); // dummy
            sync_queues.add(node1_sync_queue);
            sync_queues.add(node2_sync_queue);
            sync_queues.add(node3_sync_queue);
            sync_queues.add(node4_sync_queue);
            sync_queues.add(node5_sync_queue);
            System.err.println("\t identified sync queue = " + sync_queues.get(identified_node)) ;
            sync_queues.get(identified_node).add( syncObject );

        } catch ( Exception e ) {
            System.out.println( e ) ;
        }
    }

    public static void syncDocumentNextTwo( String key, String command, String[] indice) {

        try {
            // TODO: add keys here?
            AdminServer server = AdminServer.getInstance() ;
            // this syncObject is updated document.
            // If other app servers receive this, then that's updated one.
            System.err.println("Stuck here");
            SyncRequest syncObject = API.get_sync_request( key ) ;
            System.err.println("\t\tNext two Sync Vclock just before sending sync request");
            System.err.println("\t\t syncObject = " + syncObject.toString()) ;
            syncObject.command = command ;
            int my_index = server.nodeIndex( server.getMyHostname() ) ;
            System.out.println(     "Sync Document: Key = " + key + " Command = " + command + " "
                    + "[host:" + server.getMyHostname()
                    + " index:" + Integer.toString(my_index) + "]"
            ) ;
            System.err.println(     "Sync Document: Key = " + key + " Command = " + command + " "
                    + "[host:" + server.getMyHostname()
                    + " index:" + Integer.toString(my_index) + "]"
            ) ;

            // This node did operation after partition
            if (server.lastIndex!=-1 || server.getHistory() != null) {
                System.err.println("##################### INVOKED HERE ##################");
                isDoable = false;
            }

            HashMap<String, ConcurrentLinkedQueue<SyncRequest>> queues = new HashMap<>();
            queues.put("1", node1_sync_queue) ;
            queues.put("2", node2_sync_queue) ;
            queues.put("3", node3_sync_queue) ;
            queues.put("4", node4_sync_queue) ;
            queues.put("5", node5_sync_queue) ;

            System.err.println("\t\tNEXT TWO INDICE = " + Arrays.toString(indice)) ;
            for(String index : indice) { queues.get(index).add( syncObject ) ; }

        } catch ( Exception e ) {
            System.out.println( e ) ;
        }

    }

    public static ClientResource getSyncClient( String node ) {
        String URL = "http://"+node+":8888/sync" ;
        //System.out.println( URL ) ;
        ClientResource resource = new ClientResource( URL ) ;
        /* Create a Client with the socketTimout parameter for HttpClient and "attach"
           it to the ClientResource. */
        Context context = new Context() ;
        context.getParameters().add("readTimeout", "1000") ;
        context.getParameters().add("idleTimeout", "1000");
        context.getParameters().add("socketTimeout", "1000");
        context.getParameters().add("socketConnectTimeoutMs", "1000") ;
        resource.setNext( new Client(context, Protocol.HTTP) ) ;
        // Set the client to not retry on error. Default is true with 2 attempts.
        resource.setRetryOnError(false) ;
        return resource ;
    }

    public static ClientResource getHashingClient(String node, String key ) {
        String URL = "http://"+node+":9090/hashing/" + key ;
        //System.out.println( URL ) ;
        /* Create a Client with the socketTimout parameter for HttpClient and "attach"
           it to the ClientResource. */
        Client client = new Client(new Context(), Protocol.HTTP);
        client.getContext().getParameters().add("useForwardedForHeader","false");
        ClientResource cr = new ClientResource( URL );
        cr.setRequest(new Request(Method.POST, URL));
        cr.setNext(client);
        return cr ;
    }


    /* Instance Methods */

    public void initConfig() {
        InetAddress ip;
        String hostname;
        try {

            ip = InetAddress.getLocalHost();
            hostname = ip.getHostName();
            System.out.println("IP address : " + ip);
            System.out.println("Hostname : " + hostname);
            my_ip = ip.toString() ;
            my_host = hostname.toString() ;
            Node node = new Node() ;
            node.id = my_host ;
            node.name = "localhost" ;
            nodes.put( my_host, node ) ; 

        } catch (Exception e) {
            System.out.println( e ) ;
        }
    }

    public String getMyHostname() {
        return this.my_host ;
    }

    public int nodeIndex( String id ) {
        
        Node n = nodes.get( id ) ;
        String name = n.name ;
        int index = 0 ;
        switch ( name ) {
            case "api_node_1": index = 1 ; break ;
            case "api_node_2": index = 2 ; break ;
            case "api_node_3": index = 3 ; break ;
            case "api_node_4": index = 4 ; break ;
            case "api_node_5": index = 5 ; break ;
            default: index = 0 ;
        }

        return index ;

    }

    public void registerNode( String id, String name, String admin_port, String api_port ) {
        // register node name
        Node node = new Node() ;
        node.id = id ;
        node.name = name ;
        node.admin_port = admin_port ;
        node.api_port = api_port ;
        nodes.put( id, node ) ;     
        System.out.println( "Register Node: " + id + " as: " + name ) ;     
    }

    public ConcurrentHashMap<String,Node> getNodes() {
        return nodes;
    }

    public void nodeUp( String id ) {
        Node node = nodes.get( id ) ;
        node.status = "up" ;
    }

    public void nodeDown( String id ) {
        Node node = nodes.get( id ) ;
        node.status = "down" ;
    }

    public void nodeSelf( String id ) {
        Node node = nodes.get( id ) ;
        node.status = "self" ;
    }

    public void setLastIndex(int i) { lastIndex = i; }

    public int getLastIndex() { return lastIndex; }

    public boolean getIsDoable() { return isDoable; }

    public void setHistory(HashMap<String, Integer> in) { this.history = in ; }

    public HashMap<String, Integer> getHistory() { return history ;}

    public void setHistoryLastIndex(String key, Integer value) { history.put(key, value) ;}

    public Integer getHistoryLastIndex(String key) {
        if (history == null) { return null; }

        Integer result = history.get(key);
        if (result == null) { return 0; }
        return result;
    }

    public List<String> getKeys() { return keys; }

    public void addKeys(String in) { keys.add(in); }

    @Override
    public Restlet createInboundRoot() {
        System.err.println("INSIDE CREATE INBOUND ROOT ADMIN !!!") ;
        Router router = new Router(getContext()) ;
        router.attach( "/", PingResource.class ) ;
        router.attach( "/node", NodeResource.class ) ;   
        router.attach( "/sync", SyncResource.class ) ;
        router.attach( "/sync/{key}", SyncResource.class ) ;
        System.err.println("JUST BEFORE ADDING HASHING SERVICE ADMIN !!!") ;
        System.err.println("\tADMIN ENV = " + envField.toString());
        if (envField.get("CAP_MODE").equals("AP") && envField.get("VERSION").equals("EXTRA")) {
            System.err.println("OKAY EXTRA VERSION HIT HERE ADMIN SERVER") ;
            router.attach( "/hashing/{key}", HashingAdminResource.class) ; }
        return router;
    }


}

