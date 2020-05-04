package api ;

import nojava.* ;

import java.util.* ;
import java.io.* ;

import java.util.concurrent.BlockingQueue ;
import java.util.concurrent.LinkedBlockingQueue ;
import java.util.concurrent.ConcurrentHashMap ;


public class API implements Runnable {

	// queue of new documents
    private static BlockingQueue<Document> CREATE_QUEUE = new LinkedBlockingQueue<Document>() ;						

    // key to record map
    private static ConcurrentHashMap<String,Document> KEYMAP_CACHE = new ConcurrentHashMap<String,Document>() ; 	


    // Background Thread
	@Override
	public void run() {
		while (true) {
			try {
				// sleep for 5 seconds
				try { Thread.sleep( 5000 ) ; } catch ( Exception e ) {}  

				// process any new additions to database
				Document doc = CREATE_QUEUE.take();
  				SM db = SMFactory.getInstance() ;
        		SM.OID record_id  ;
        		String record_key ;
        		SM.Record record  ;
        		String jsonText = doc.json ;
            	int size = jsonText.getBytes().length ;
            	record = new SM.Record( size ) ;
            	record.setBytes( jsonText.getBytes() ) ;
            	record_id = db.store( record ) ;
            	record_key = new String(record_id.toBytes()) ;
            	doc.record = record_key ;
            	doc.json = "" ;
            	doc.isDeleted = false;
            	KEYMAP_CACHE.put( doc.key, doc ) ;
                System.out.println( "Syncing Created Document: " + doc.key ) ;
                System.err.println("Key = "+doc.key+ ", Syncing Document's vclock =" +Arrays.toString(doc.vclock));
                // sync nodes
                // First called by `create_document`, and try to sync the new document to other nodes every SyncInterval
                AdminServer.syncDocument( doc.key, "create" ) ;

			} catch (InterruptedException ie) {
				ie.printStackTrace() ;
			} catch (Exception e) {
				System.out.println( e ) ;
			}			
		}
	}    


    public static Document[] get_hashmap() {
    	return (Document[]) KEYMAP_CACHE.values().toArray(new Document[0]) ;
    }


    public static void save_hashmap() {
		try {
		  FileOutputStream fos = new FileOutputStream("index.db");
		  ObjectOutputStream oos = new ObjectOutputStream(fos);
		  oos.writeObject(KEYMAP_CACHE);
		  oos.close();
		  fos.close();
		} catch(IOException ioe) {
		  ioe.printStackTrace();
		}
    }


    public static void load_hashmap() {
		 try {
		     FileInputStream fis = new FileInputStream("index.db") ;
		     ObjectInputStream ois = new ObjectInputStream(fis) ;
		     KEYMAP_CACHE = (ConcurrentHashMap) ois.readObject();
		     ois.close() ;
		     fis.close() ;
		  } catch(IOException ioe) {
		     ioe.printStackTrace() ;
		  } catch(ClassNotFoundException c) {
		     System.out.println("Class not found");
		     c.printStackTrace() ;
		  }
    }


   public static void sync_document(SyncRequest sync) throws DocumentException {
        String key = sync.key ;
        String value = sync.json ;
        String[] vclock = sync.vclock ;
        String command = sync.command ;

       try {

            AdminServer server = AdminServer.getInstance() ;
            String my_host = server.getMyHostname() ;
            int my_index = server.nodeIndex( my_host ) ;
            // TODO: your_index here
           // TODO: doc here
           // TODO: last_index here?
           System.err.println("My host = " + my_host);
           System.err.println("My index = " + my_index);
           System.err.println("YOUR vclock = " + Arrays.toString(vclock));
           System.err.println("Command = " + command);
           System.err.println("YOUR HOST NAME = " + vclock[0]);
           System.err.println("YOUR INDEX = " + server.nodeIndex(vclock[0]));
           System.err.println("VALUE = " + value);

            switch ( command ) {
                case "create":
                    Document doc = KEYMAP_CACHE.get(key);
                    int your_index = server.nodeIndex(vclock[0]);
                    int last_index = -1;


                    // First create
                    if (doc == null) {
                        doc = new Document() ;
                        doc.vclock[0] = my_host ;
                        doc.vclock[1] = vclock[1] ;
                        doc.vclock[2] = vclock[2] ;
                        doc.vclock[3] = vclock[3] ;
                        doc.vclock[4] = vclock[4] ;
                        doc.vclock[5] = vclock[5] ;
                        doc.vclock[my_index] = my_host + ":" + Integer.toString(0) ;

                        SM db = SMFactory.getInstance() ;
                        SM.OID record_id  ;
                        SM.Record record  ;
                        String jsonText = value ;
                        int size = jsonText.getBytes().length ;
                        record = new SM.Record( size ) ;
                        record.setBytes( jsonText.getBytes() ) ;
                        record_id = db.store( record ) ;
                        String record_key = new String(record_id.toBytes()) ;

                        doc.record = record_key ;
                        doc.json = "" ;
                        doc.key = key ;
                        doc.isDeleted = false;
                        KEYMAP_CACHE.put( key, doc ) ;

                        System.out.println( "SYNC: Created Document Key: " + key
                                + " Record: " + record_key
                                + " vClock: " + Arrays.toString(doc.vclock)
                                + " value:" + value
                        ) ;

                        System.err.println( "SYNC: Created Document Key: " + key
                                + " Record: " + record_key
                                + " vClock: " + Arrays.toString(doc.vclock)
                                + " value:" + value
                        ) ;
                        break ;
                    }

                    // Created and deleted. If deleted, dont delete again but merge clock and set the winner
                    if (!doc.isDeleted) {
                        // Merge and break
                        doc.vclock[your_index] = vclock[your_index];
                        if (your_index > server.getHistoryLastIndex(key)) server.setHistoryLastIndex(key, your_index);
                        break;
                    }

                    //  Partition recovery (+ create after delete)
                    if (server.getHistory() != null) { last_index = server.getHistoryLastIndex(key) ; }
                    System.err.println("Key = "+ key +", YOUR INDEX = " + your_index + ", LAST INDEX = " + last_index + ", isDoable? = " + server.getIsDoable() + ", keys" + server.getKeys()) ;
                    boolean didIOperateOnTheKey = server.getKeys().contains(key);
                    if (last_index == -1 // Normal Operation (deprecated)
//                            || ( server.getIsDoable() && your_index > server.getHistoryLastIndex(key) ) // Partition recovery for nodes that didn't create, update and delete
//                            || ( !server.getIsDoable() && your_index > server.getHistoryLastIndex(key) && your_index > my_index) ) {  // Partition recovery for nodes that did
                            || ( didIOperateOnTheKey && your_index >= server.getHistoryLastIndex(key) && your_index >= my_index )
                            || ( !didIOperateOnTheKey && your_index >= server.getHistoryLastIndex(key) ) ) {
                        doc.vclock[your_index] = vclock[your_index];
                        // If partition recovery, store last index
                        if (last_index != -1 && your_index > server.getHistoryLastIndex(key)) {
                            server.setHistoryLastIndex(key, your_index);
                            // Created after delete
                        }
                        // Should update its value
                        String record_key = doc.record ;
                        SM db = SMFactory.getInstance() ;
                        SM.Record found ;
                        SM.Record record ;
                        SM.OID update_id ;
                        SM.OID record_id = db.getOID( record_key.getBytes() ) ;
                        String jsonText = value ;
                        int size = jsonText.getBytes().length ;
                        // store json to db
                        record = new SM.Record( size ) ;
                        record.setBytes( jsonText.getBytes() ) ;
                        update_id = db.update( record_id, record ) ;

                        doc.record = record_key ;
                        doc.json = value ;
                        doc.key = key ;
                        doc.isDeleted = false;
                    }

                    break ;

                case "update":
                    Document doc1 = KEYMAP_CACHE.get( key ) ;
                    doc1.vclock[0] = my_host;
                    int your_index1 = server.nodeIndex(vclock[0]);
                    int last_index1 = -1;

                    if (doc1 == null) { break ;}
                    doc1.vclock[your_index1] = vclock[your_index1];

                    if (server.getHistory() != null) { last_index1 = server.getHistoryLastIndex(key) ; }
                    System.err.println("Key = "+ key +", YOUR INDEX = " + your_index1 + ", LAST INDEX = " + server.getLastIndex() + ", isDoable? = " + server.getIsDoable() + ", keys" + server.getKeys()) ;
                    // Merge vClock no matter what
                    boolean didIOperateOnTheKey1 = server.getKeys().contains(key);
                    if ( (last_index1 == -1 ) // Normal Operation
//                            || ( server.getIsDoable() && your_index1 > server.getLastIndex() ) // Partition recovery for nodes that didn't create, update and delete
//                            || ( !server.getIsDoable() && your_index1 > server.getLastIndex() && your_index1 > my_index ) ) {  // Partition recovery for nodes that did
                            || ( didIOperateOnTheKey1 && your_index1 >= server.getHistoryLastIndex(key) && your_index1 >= my_index )
                            || ( !didIOperateOnTheKey1 && your_index1 >= server.getHistoryLastIndex(key) ) ) {
//                        doc1.vclock[your_index1] = vclock[your_index1];
                        // If partition recovery
                        if (server.getLastIndex()==-1) {System.err.println("Normal Operation Mode !");}
                        if (server.getLastIndex()!=-1 && your_index1 > server.getHistoryLastIndex(key)) {
                            System.err.println("Partition recovery mode !");
                            server.setHistoryLastIndex(key, your_index1);
                        }
                        if (doc1.isDeleted) doc1.isDeleted = false;
                        SM db1 = SMFactory.getInstance() ;
                        String record_key1 = doc1.record;
                        SM.OID record_id1 = db1.getOID(record_key1.getBytes());
                        String jsonText1 = value;
                        int size1 = jsonText1.getBytes().length ;

                        SM.Record record1 = new SM.Record(size1);
                        record1.setBytes(jsonText1.getBytes());
                        SM.OID update_id1 = db1.update(record_id1, record1);

                        doc1.record = record_key1 ;
                        doc1.json = "" ;
                        doc1.key = key ;
                        System.out.println( "SYNC: Updated Document Key: " + key
                                + " Record: " + record_key1
                                + " vClock: " + Arrays.toString(doc1.vclock)
                        ) ;
                        System.err.println( "SYNC: Updated Document Key: " + key
                                + " Record: " + record_key1
                                + " vClock: " + Arrays.toString(doc1.vclock)
                                + " value:" + value
                        ) ;
                    }
                    // Created and deleted. If deleted, dont delete again but merge clock and set the winner
                    if (doc1.isDeleted) {
                        doc1.vclock[your_index1] = vclock[your_index1];
                        if (your_index1 > server.getHistoryLastIndex(key)) server.setHistoryLastIndex(key, your_index1);
                        break;
                    }
                    break ;

                case "delete": {
                    Document doc2 = KEYMAP_CACHE.get(key) ;
                    int your_index2 = server.nodeIndex(vclock[0]);
                    int last_index2 = -1;

                    // the document is not created
                    if (doc2 == null) { break; }

                    // Created and deleted. If deleted, dont delete again but merge clock and set the winner
                    if (doc2.isDeleted) {
                        doc2.vclock[your_index2] = vclock[your_index2];
                        if (your_index2 > server.getHistoryLastIndex(key)) server.setHistoryLastIndex(key, your_index2);
                        break;
                    }

                    // If not deleted, follow partition recovery rule
                    if (server.getHistory() != null) { last_index2 = server.getHistoryLastIndex(key) ; }
                    System.err.println("Key = "+ key +", YOUR INDEX = " + your_index2 + ", LAST INDEX = " + last_index2 + ", isDoable? = " + server.getIsDoable() + ", keys" + server.getKeys()) ;
                    boolean didIOperateOnTheKey2 = server.getKeys().contains(key);
                    if (last_index2 == -1 // Normal Operation
//                            || ( server.getIsDoable() && your_index2 > server.getHistoryLastIndex(key) ) // Partition recovery for nodes that didn't create, update and delete
//                            || ( !server.getIsDoable() && your_index2 > server.getHistoryLastIndex(key) && your_index2 > my_index ) ) {  // Partition recovery for nodes that did
//                            || ( !server.getIsDoable() && your_index2 > server.getHistoryLastIndex(key)) ) {  // Partition recovery for nodes that did
                            || ( didIOperateOnTheKey2 && your_index2 >= server.getHistoryLastIndex(key) && your_index2 >= my_index )
                            || ( !didIOperateOnTheKey2 && your_index2 >= server.getHistoryLastIndex(key) ) ) {

                        doc2.vclock[your_index2] = vclock[your_index2];

                        // If partition recovery, then store last index
                        if (last_index2 != -1 && your_index2 > server.getHistoryLastIndex(key)) {
                            server.setHistoryLastIndex(key, your_index2);
                        }
                        // else, delete it and store last index
                        String record_key = doc2.record ;
//                        SM db = SMFactory.getInstance() ;
//                        SM.Record found ;
//                        SM.Record record ;
//                        SM.OID record_id = db.getOID( record_key.getBytes() ) ;
//                        db.delete( record_id ) ;
//                        KEYMAP_CACHE.remove( key ) ;
                        doc2.isDeleted = true;
                        System.out.println( "SYNC: Deleted Document Key: " + key
                                + " Record: " + record_key
                                + " vClock: " + Arrays.toString(doc2.vclock)
                        ) ;
                        System.err.println( "SYNC: Deleted Document Key: " + key
                                + " Record: " + record_key
                                + " vClock: " + Arrays.toString(doc2.vclock)
                                + " value:" + value
                        ) ;
                    }
                    break ;
                }
            }
        } catch (Exception e) {
            throw new DocumentException( e.toString() ) ;
        }
    }


    public static void create_document(String key, String value) throws DocumentException {
        Document doc = KEYMAP_CACHE.get(key);
        // Not created
        AdminServer server = AdminServer.getInstance() ;
        if (doc==null) {
            try {
                System.out.println( "Create Document: Key = " + key + " Value = " + value ) ;
                doc = new Document();
                String my_host = server.getMyHostname() ;
                doc.key = key ;
                System.out.println( "My Host Name: " + my_host ) ;
                doc.vclock[0] = my_host ;
                String my_version = my_host + ":" + Integer.toString(1) ;
                int my_index = server.nodeIndex( my_host ) ;
                System.out.println( "Node Index: " + my_index ) ;
                doc.vclock[my_index] = my_version ;
                KEYMAP_CACHE.put( key, doc ) ;
                doc.json = value ;
                CREATE_QUEUE.put( doc ) ;
                server.addKeys(key);
                System.out.println( "New Document Queued: " + key ) ;
                System.err.println("Document Created ! : "+my_host + ", vclock = " + Arrays.toString(doc.vclock));
        } catch (Exception e) {
            throw new DocumentException( e.toString() ) ;
        }
        }
        // Create after deleted -> sync request to isDeleted to false
        else if (doc.isDeleted) {
            try {
                System.err.println("Create after delete !");
                doc.isDeleted = false;
                // Store new value
                doc.json = value;

                String record_key = doc.record ;
                SM db = SMFactory.getInstance() ;
                SM.Record found ;
                SM.Record record ;
                SM.OID update_id ;
                SM.OID record_id = db.getOID( record_key.getBytes() ) ;
                String jsonText = value ;
                int size = jsonText.getBytes().length ;
                System.err.println("\tUpdated Document hit here !");
                // store json to db
                record = new SM.Record( size ) ;
                record.setBytes( jsonText.getBytes() ) ;
                update_id = db.update( record_id, record ) ;
                System.err.println( "Document Updated: " + key ) ;

                // update vclock
                String my_host = server.getMyHostname() ;
                doc.vclock[0] = my_host ;
                int my_index = server.nodeIndex( my_host ) ;
                // doc.vclock[my_index] yields error if update is not properly done! (e.g. ignore update of xxx:0)
                String old_version = doc.vclock[my_index] ;
                String[] splits = old_version.split(":") ;
                System.err.println("Document Updated Before ! : "+my_host + ", " +Arrays.toString(doc.vclock));
                int version = Integer.parseInt(splits[1])+1 ;
                String new_version = my_host + ":" + Integer.toString(version) ;
                doc.vclock[my_index] = new_version ;
                System.err.println("Document Updated After! : "+my_host + ", " +Arrays.toString(doc.vclock));
                server.addKeys(key);
                CREATE_QUEUE.put( doc ) ;
            } catch (Exception e) {
                throw new DocumentException( e.toString() ) ;
            }
        }
    }


    public static String get_document(String key) throws DocumentException {
    	System.out.println( "Get Document: " + key ) ;
    	Document doc = KEYMAP_CACHE.get( key ) ;
        System.err.println("GET DOC = "+ doc);
        if ( doc == null || doc.record == null || doc.isDeleted)
    		throw new DocumentException( "Document Not Found: " + key ) ;
        System.err.println("GET DOC_RECORD = " + doc.record);
        System.err.println("GET JSON = " + doc.json);
    	String record_key = doc.record ;
    	SM db = SMFactory.getInstance() ;
    	SM.OID record_id ;
        SM.Record found ;
		record_id = db.getOID( record_key.getBytes() ) ;
        try {
            found = db.fetch( record_id ) ;
            byte[] bytes = found.getBytes() ;
            String jsonText = new String(bytes) ;
            System.out.println( "Document Found: " + key ) ;    
            return jsonText ;
        } catch (SM.NotFoundException nfe) {
        	System.out.println( "Document Found: " + key ) ;    
			throw new DocumentException( "Document Not Found: " + key ) ;   
		} catch (Exception e) {
			throw new DocumentException( e.toString() ) ;                 
        }   	
    }


    public static SyncRequest get_sync_request(String key) throws DocumentException {
        System.out.println( "Get Document: " + key ) ;
        Document doc = KEYMAP_CACHE.get( key ) ;
        System.err.println("GET_SYNC_REQUEST DOC = "+ doc);
//        AdminServer server = AdminServer.getInstance() ;
////        Document register = server.getRegister();
////        System.err.println("REGISTER = "+ register + ", Register key = " + register.key + ", Key = " + key);
//        if ( doc == null && key.equals(register.key)) {
//            // For deleted document
//            System.err.println("For deleted document !");
//            SyncRequest sync = new SyncRequest();
//            sync.key = key ;
//            sync.vclock = register.vclock ;
//            sync.json = register.json;
//            sync.command = "";
//            return sync;
//        }
//        else if (doc != null && doc.record == null) {
//            throw new DocumentException( "Document Not Found: " + key ) ;
//        }
        if (doc == null || doc.record == null) throw new DocumentException( "Document Not Found: " + key ) ;
        System.err.println("GET_SYNC_REQUEST DOC_RECORD = " + doc.record);
        System.err.println("GET_SYNC_REQUEST JSON = " + doc.json);
        String record_key = doc.record ;
        SM db = SMFactory.getInstance() ;
        SM.OID record_id ;
        SM.Record found ;
        record_id = db.getOID( record_key.getBytes() ) ;
        try {
            found = db.fetch( record_id ) ;
            byte[] bytes = found.getBytes() ;
            String jsonText = new String(bytes) ;
            SyncRequest sync = new SyncRequest() ;
            sync.key = doc.key ;
            sync.json = jsonText ;
            sync.vclock = doc.vclock ;
            sync.command = "" ; // set by caller
            return sync ;
        } catch (SM.NotFoundException nfe) {
            System.err.println("Exception here !");
            System.out.println( "Document Found: " + key ) ;    
            throw new DocumentException( "Document Not Found: " + key ) ;   
        } catch (Exception e) {
            System.err.println("Exception here !!");
            throw new DocumentException( e.toString() ) ;                 
        }       
    }


    public static void update_document( String key, String value ) throws DocumentException {
        // vector clocks should be updated locally here
    	System.out.println( "Get Document: " + key ) ;
    	Document doc = KEYMAP_CACHE.get( key ) ;
        System.err.println("UPDATE DOC = "+ doc);
    	if ( doc == null || doc.record == null || doc.isDeleted)
    		throw new DocumentException( "Document Not Found: " + key ) ;
        System.err.println("UPDATE DOC_RECORD = " + doc.record);
        System.err.println("UPDATE JSON = " + doc.json);
    	String record_key = doc.record ;
    	SM db = SMFactory.getInstance() ;
        SM.Record found ;
        SM.Record record ;
        SM.OID update_id ;        
		SM.OID record_id = db.getOID( record_key.getBytes() ) ;
		String jsonText = value ;
		int size = jsonText.getBytes().length ;
		System.err.println("\tUpdated Document hit here !");
 		try {
            // store json to db
            record = new SM.Record( size ) ;
            record.setBytes( jsonText.getBytes() ) ;
            update_id = db.update( record_id, record ) ;
            System.err.println( "Document Updated: " + key ) ;
            // update vclock
            AdminServer server = AdminServer.getInstance() ;
            String my_host = server.getMyHostname() ;
            doc.vclock[0] = my_host ;
            int my_index = server.nodeIndex( my_host ) ;
            // doc.vclock[my_index] yields error if update is not properly done! (e.g. ignore update of xxx:0)
            String old_version = doc.vclock[my_index] ;
            String[] splits = old_version.split(":") ;
            System.err.println("Document Updated Before ! : "+my_host + ", " +Arrays.toString(doc.vclock));
            int version = Integer.parseInt(splits[1])+1 ;
            String new_version = my_host + ":" + Integer.toString(version) ;            
            doc.vclock[my_index] = new_version ;
            System.err.println("Document Updated After! : "+my_host + ", " +Arrays.toString(doc.vclock));
            server.addKeys(key);
            // sync nodes
            AdminServer.syncDocument( key, "update" ) ; 
			return ;             
        } catch (SM.NotFoundException nfe) {
			throw new DocumentException( "Document Not Found: " + key ) ;
       	} catch (Exception e) {
           	throw new DocumentException( e.toString() ) ;           
        }
    }


    public static void delete_document( String key ) throws DocumentException {
    	System.out.println( "Delete Document: " + key ) ;
        AdminServer server = AdminServer.getInstance() ;
    	Document doc = KEYMAP_CACHE.get( key ) ;
        System.err.println("DELETE DOC = "+ doc);
    	if ( doc == null || doc.record == null || doc.isDeleted)
    		throw new DocumentException( "Document Not Found: " + key ) ;
        System.err.println("DELETE DOC_RECORD = " + doc.record);
        System.err.println("DELETE JSON = " + doc.json);
    	String record_key = doc.record ;
    	SM db = SMFactory.getInstance() ;
        SM.Record found ;
        SM.Record record ;     
		SM.OID record_id = db.getOID( record_key.getBytes() ) ;
        try {
       	    System.err.println("Start delete");
//            db.delete( record_id ) ;
            System.err.println("Finish delete");
            // remove key map
//            KEYMAP_CACHE.remove( key ) ;
            // sync nodes
            doc.isDeleted = true ;

            String my_host = server.getMyHostname() ;
            doc.vclock[0] = my_host ;
            int my_index = server.nodeIndex( my_host ) ;
            // doc.vclock[my_index] yields error if update is not properly done! (e.g. ignore update of xxx:0)
            String old_version = doc.vclock[my_index] ;
            String[] splits = old_version.split(":") ;
            System.err.println("Document Updated Before ! : "+my_host + ", " +Arrays.toString(doc.vclock));
            int version = Integer.parseInt(splits[1])+1 ;
            String new_version = my_host + ":" + Integer.toString(version) ;
            doc.vclock[my_index] = new_version ;
            System.err.println("Document Updated After! : "+my_host + ", " +Arrays.toString(doc.vclock));

            server.addKeys(key);

            AdminServer.syncDocument( key, "delete" ) ;
            System.out.println( "Document Deleted: " + key ) ;
            System.err.println( "!!!Document Deleted: " + key ) ;
        }
//        catch (SM.NotFoundException nfe) {
//            throw new DocumentException( "Document Not Found: " + key ) ;
//        }
        catch (Exception e) {
         	throw new DocumentException( e.toString() ) ;            
        }		
    }



}


