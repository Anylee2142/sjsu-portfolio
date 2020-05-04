package api ;

import nojava.* ;
import java.util.Map ;

public class Main {

	private static SM db ;

    public static void main(String[] args) throws Exception {

        Map<String, String> env = System.getenv();
        String[] arguments = {env.get("FIRST_NOSQL"), env.get("SECOND_NOSQL"), env.get("THIRD_NOSQL"), env.get("FOURTH_NOSQL"), env.get("FIFTH_NOSQL")} ;
    	db = SMFactory.getInstance() ;          // startup DB Instance
        AppServer.startup() ;                   // startup App REST Service on port 9090
        AdminServer.startup(arguments) ;                 // startup Admin REST Service on port 8888

        // dump out environment variables
        System.err.println( "CLUSTER_NAME = " + env.get("CLUSTER_NAME") ) ;
        System.err.println( "CAP_MODE = " + env.get("CAP_MODE") ) ;
        System.err.println( "VERSION = " + env.get("VERSION") ) ;

        System.err.println( "FIRST NOSQL = " + env.get("FIRST_NOSQL") ) ;
        System.err.println( "SECOND_NOSQL = " + env.get("SECOND_NOSQL") ) ;
        System.err.println( "THIRD_NOSQL = " + env.get("THIRD_NOSQL") ) ;
        System.err.println( "FOURTH_NOSQL = " + env.get("FOURTH_NOSQL") ) ;
        System.err.println( "FIFTH_NOSQL = " + env.get("FIFTH_NOSQL") ) ;
    }

}



        