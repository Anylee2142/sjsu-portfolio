package api ;

import org.restlet.*;
import org.restlet.data.Protocol;
import org.restlet.routing.Router;

import java.util.Map;

public class AppServer extends Application {

    private static Map<String, String> envField ;

    public static void startup( Map<String, String> env ) {
        try {
            System.err.println("APP STARTUP STARTED !!") ;

            Component server = new Component() ;
            System.err.println("ENV BEFORE APP !!") ;
            envField = env ;
            System.err.println("ENV AFTER APP !!") ;
            server.getServers().add(Protocol.HTTP, 9090) ;
            server.getDefaultHost().attach(new AppServer()) ;
            server.start() ;

            API api = new API() ;
            new Thread(api).start();                // start API Thread to Create New Documents

        } catch ( Exception e ) {
            System.out.println( e ) ;
        }
    }

    @Override
    public Restlet createInboundRoot() {
        System.err.println("INSIDE CREATE INBOUND ROOT APP !!!") ;
        Router router = new Router(getContext()) ;
        router.attach( "/", PingResource.class ) ;  
        router.attach( "/db", RecordResource.class ) ;
        router.attach( "/db/{key}", RecordResource.class ) ;
        router.attach( "/api", APIResource.class ) ;
        router.attach( "/api/{key}", APIResource.class ) ;
        System.err.println("JUST BEFORE ADDING HASHING SERVICE APP !!!") ;
        System.err.println("\tAPP ENV = " + envField.toString());
        if (envField.get("CAP_MODE").equals("AP") && envField.get("VERSION").equals("EXTRA")) {
            System.err.println("OKAY EXTRA VERSION HIT HERE APP SERVER") ;
            router.attach( "/hashing/{key}", HashingAppResource.class ) ; }

        return router;
    }


}



        