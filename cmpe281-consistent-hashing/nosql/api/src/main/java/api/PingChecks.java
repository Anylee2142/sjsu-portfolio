package api ;

import java.util.* ;
import java.net.*;

public class PingChecks implements Runnable {

	private AdminServer server = AdminServer.getInstance() ;

    // Background Thread
	@Override
	public void run() {
		while (true) {
			try {
				int count = 0;
				// sleep for 1 second
				try { Thread.sleep( 1000 ) ; } catch ( Exception e ) {}
				List<String> partitionList = new ArrayList<>() ;
				// ping & sync nodes
				Collection<Node> nodes = server.getNodes().values() ;
    			for (Iterator<Node> iterator = nodes.iterator(); iterator.hasNext();) {
    				Node n = iterator.next() ;
    				String my_host = server.getMyHostname() ;
    				partitionList.add(n.id);
    				if ( !n.id.equals(my_host) ) {
						
	    				try {
							
	    					InetAddress inet = InetAddress.getByName(n.name) ;
	    					if (inet.isReachable(1000)) {
								//System.out.println( "Ping Node [id:" + n.id + "  name:" + n.name + "] ==> Node Up!" ) ;
								server.nodeUp( n.id ) ;      
							} else {
								System.out.println( "Ping Node [id:" + n.id + "  name:" + n.name + "] ==> Node Down!" ) ;
								server.nodeDown( n.id ) ;
//								partitionList.add( n.id ) ;
								count++;
							}
	  							
	  					} catch (Exception e) {
	  						server.nodeDown( n.id ) ; 
	  						System.out.println( e ) ;
						}   		    					
    				} else {
    					server.nodeSelf( n.id ) ;
    				}
    				
  				}

    			if (count > 0) { // Partition recovery begin
    				if (server.getLastIndex()==-1) {
						System.err.println("!!!!!!!!!!!!!!!!!!!!!1Partition recovery begin !");
						System.err.println("!!!!!!!!!!!!!!!!!1!!!Partition recovery begin !");
						server.setLastIndex(0);
						server.setHistory(new HashMap<String, Integer>());
    				}
    			}
//    			else if (0 < count && count < 4) { // Not all of them went down, but you need to get higher node here
//    				int maxIndex = -1;
//    				for(int i=0; i < partitionList.size() ; i++) {
//    					String id = partitionList.get(i) ;
//    					System.err.println("!!!ID = " + id) ;
//    					if (server.nodeIndex(id) > maxIndex ) { maxIndex = i; }
//					}
//    				assert maxIndex != -1;
//    				System.err.println("!!!Winner index = " + maxIndex + ", Winner name = " + partitionList.get(maxIndex)) ;
//    				if (maxIndex > server.getWinnerIndex())  {server.setWinnerIndex(maxIndex) ;}
//				}
			} catch (Exception e) {
				System.out.println( e ) ;
			}			
		}
	}    


}



