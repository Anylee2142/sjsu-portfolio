package api ;

import java.util.* ;

import org.json.* ;
import org.restlet.resource.*;
import org.restlet.ext.jackson.* ;
import org.restlet.ext.json.* ;
import org.restlet.data.* ;

import java.util.concurrent.ConcurrentLinkedQueue ;


// You are to add logic to this section to implement Peer-to-Peer Replication and vClock validations.
// Please note that you must check the Node Status (Up or Down) before attempting to Send a Sync Message to other nodes.
// That is, use the Node status from Ping checks to detect a "Partition".

public class Sync implements Runnable {

	private AdminServer server = AdminServer.getInstance() ;
	private ConcurrentLinkedQueue<SyncRequest> sync_queue ;
	private String sync_node ;

	public Sync( String node, ConcurrentLinkedQueue<SyncRequest> queue ) {
		sync_node = node ;
		sync_queue = queue ;
	}

	// Background Thread
	@Override
	public void run() {

		SyncRequest syncObject = null ;

		while (true) {
			try {
				// sleep for 5 seconds
				try { Thread.sleep( 5000 ) ; } catch ( Exception e ) {}

				//System.out.println( "CHECK SYNC QUEUE: " + sync_node + "..." ) ;

				if ( !sync_queue.isEmpty() ) {
					// Node.status

					Collection<Node> nodes = server.getNodes().values();
					Node currentNode = null;
					for (Iterator<Node> iterator = nodes.iterator(); iterator.hasNext();) {
						Node n = iterator.next();
						if (n.name.equals(sync_node)) {
							currentNode = n ;
							break;
						}
					}
					// When node status is not null
					if (currentNode != null && currentNode.status.equals("up")) {
						// check sync queue for work
						syncObject = sync_queue.peek() ;
						assert syncObject != null ;
						// TODO: if syncObject != null

						// try to sync to peer node...
						// 1. Get this node's vclock
						// 2. Update it with SyncObject
//						API.sync_document(syncObject);

						System.out.println ( 	  "SYNC: " + "[" + server.getMyHostname() + "]" + " -> " + sync_node
								+ " Document Key: " + syncObject.key
								+ " vClock: " + Arrays.toString(syncObject.vclock) ) ;

						System.err.println("\tAt the sync request!!!") ;
						ClientResource client = null ;
						if ( syncObject.isHashingCreate ) { // If hash create
							JSONObject jo = new JSONObject() ;
							JSONObject syncObjectJSON = new JSONObject(syncObject.json) ;
//							System.err.println("\t\tsyncObjectJSON = " + syncObjectJSON.toString());
//							System.err.println("\t\tkeys = "+syncObjectJSON.keys().toString());
//							jo.put("message", syncObjectJSON.get("message")) ;
							System.err.println("\t\t syncObject.json = " + syncObjectJSON.toString()) ;
							client = AdminServer.getHashingClient( sync_node, syncObject.key ) ;
							client.post(new JsonRepresentation(syncObjectJSON), MediaType.APPLICATION_JSON) ;
							System.err.println("\t\tHASHING CREATE DONE !") ;
						} else if ( syncObject.isHashingUpdate ) { // if hash update
							client = AdminServer.getHashingClient( sync_node, syncObject.key );
							System.err.println("\t\t SYNC OBJECT.json = " + syncObject.json) ;
							System.err.println("\t\t SYNC OBJECT TO STRING = " + syncObject.toString());
							JSONObject syncObjectJSON = new JSONObject(syncObject.json);
							client.put(new JsonRepresentation(syncObjectJSON), MediaType.APPLICATION_JSON) ;
							System.err.println("\t\tHASHING UPDATE DONE !") ;
						} else if ( syncObject.isHashingDelete ) { // if hash delete
							client = AdminServer.getHashingClient( sync_node, syncObject.key );
							client.delete() ;
							System.err.println("\t\tHASHING DELETE DONE !") ;
						} else { // normal sync
							client = AdminServer.getSyncClient( sync_node ) ;
							client.post( new JacksonRepresentation<SyncRequest>(syncObject), MediaType.APPLICATION_JSON);
							System.err.println("\t\tSYNC DONE !");
						}


						// remove head of queue if successfull
						syncObject = sync_queue.poll() ;

						// if sync error, leave in queue for retry
					}
				}

			} catch (Exception e) {
				e.printStackTrace();
				System.out.println( e ) ;
			}
		}
	}

}


