package api;

import org.json.JSONObject;
import org.restlet.data.MediaType;
import org.restlet.ext.jackson.JacksonRepresentation;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.resource.Delete;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.Put;
import org.restlet.resource.* ;
import java.io.IOException ;

public class HashingAppResource extends ServerResource{
    @Post
    public Representation post_action (Representation rep) throws IOException {
        String doc_key = getAttribute("key") ;
        if ( doc_key == null || doc_key.equals("") ) {
            setStatus( org.restlet.data.Status.CLIENT_ERROR_BAD_REQUEST ) ;
            Status status = new Status() ;
            status.status = "Error!" ;
            status.message = "Missing Document Key." ;
            return new JacksonRepresentation<Status>(status) ;
        } else {
            try {
                String exists = API.get_document(doc_key) ;
                setStatus( org.restlet.data.Status.CLIENT_ERROR_BAD_REQUEST ) ;
                Status status = new Status() ;
                status.status = "Error!" ;
                status.message = "Document Exists." ;
                return new JacksonRepresentation<Status>(status) ;
            } catch ( Exception e ) { }
            // rep is value
            JsonRepresentation represent = new JsonRepresentation(rep);
            JSONObject jsonobject = represent.getJsonObject();
            String doc_json = jsonobject.toString();
            System.err.println("CREATE CONTENT = " + doc_json);
            // HashMap Document
            Document doc = new Document() ;
            doc.key = doc_key ;
            doc.json = "" ; // don't store in cache
            doc.message = "Document Queued for Storage." ;
            // Store to DB
            try {
                int my_index = API.hash_app_create_document( doc_key, doc_json );
                // TODO: change to return jsonobject
                JSONObject jo=new JSONObject();
                jo.put("key", doc.key);
                jo.put("json", doc.json);
                jo.put("message", doc.message);
                jo.put("Identified Node", my_index);
                return new JsonRepresentation(jo);
            } catch (Exception e) {
                setStatus( org.restlet.data.Status.SERVER_ERROR_INTERNAL ) ;
                Status status = new Status() ;
                status.status = "Server Error!" ;
                status.message = e.toString() ;
                return new JacksonRepresentation<Status>(status) ;
            }
        }
    }


    @Get
    public Representation get_action (Representation rep) throws IOException {
        String doc_key = getAttribute("key") ;
        if ( doc_key == null || doc_key.equals("") ) {
            return new JacksonRepresentation<Document[]>(API.get_hashmap()) ;
        } else {
            try {
                String doc = API.get_document( doc_key ) ;
                return new StringRepresentation(doc, MediaType.APPLICATION_JSON);
            } catch ( Exception e ) {
                setStatus( org.restlet.data.Status.CLIENT_ERROR_BAD_REQUEST ) ;
                Status status = new Status() ;
                status.status = "Error!" ;
                status.message = e.toString() ;
                return new JacksonRepresentation<Status>(status) ;
            }
        }
    }


    @Put
    public Representation update_action (Representation rep) throws IOException {
        String doc_key = getAttribute("key") ;
        if ( doc_key == null || doc_key.equals("") ) {
            setStatus( org.restlet.data.Status.CLIENT_ERROR_BAD_REQUEST ) ;
            Status status = new Status() ;
            status.status = "Error!" ;
            status.message = "Missing Document Key." ;
            return new JacksonRepresentation<Status>(status) ;
        } else {
            JsonRepresentation represent = new JsonRepresentation(rep);
            JSONObject jsonobject = represent.getJsonObject();
            String doc_json = jsonobject.toString();
            // Update in DB
            try {
                System.err.println("@@HASHING APP UPDATE DOC_JSON = " + doc_json) ;
                API.hash_app_update_document( doc_key, doc_json ) ;
                Status status = new Status() ;
                status.status = "Ok!" ;
                status.message = "Document Updated: " + doc_key ;
                return new JacksonRepresentation<Status>(status) ;
            } catch (Exception e) {
                setStatus( org.restlet.data.Status.SERVER_ERROR_INTERNAL ) ;
                Status status = new Status() ;
                status.status = "Server Error!" ;
                status.message = e.toString() ;
                return new JacksonRepresentation<Status>(status) ;
            }
        }
    }

    @Delete
    public Representation delete_action (Representation rep) throws IOException {
        String doc_key = getAttribute("key") ;
        if ( doc_key == null || doc_key.equals("") ) {
            setStatus( org.restlet.data.Status.CLIENT_ERROR_BAD_REQUEST ) ;
            Status status = new Status() ;
            status.status = "Error!" ;
            status.message = "Missing Document Key." ;
            return new JacksonRepresentation<Status>(status) ;
        } else {
            try {
                API.hash_app_delete_document( doc_key ) ;
                Status status = new Status() ;
                status.status = "Ok!" ;
                status.message = "Document Deleted: " + doc_key ;
                return new JacksonRepresentation<Status>(status) ;
            } catch ( Exception e ) {
                setStatus( org.restlet.data.Status.CLIENT_ERROR_BAD_REQUEST ) ;
                Status status = new Status() ;
                status.status = "Error!" ;
                status.message = e.toString() ;
                return new JacksonRepresentation<Status>(status) ;
            }
        }
    }
}
