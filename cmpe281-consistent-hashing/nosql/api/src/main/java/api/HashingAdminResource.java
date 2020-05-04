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
import java.io.PrintWriter;
import java.io.StringWriter;

public class HashingAdminResource extends ServerResource{
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
                JsonRepresentation response = API.hash_admin_create_document( doc_key, doc_json ) ;
                System.err.println("\t\t\tADMIN RESPONSE HERE = " + response.toString());
                return response ;
            } catch (Exception e) {
                setStatus( org.restlet.data.Status.SERVER_ERROR_INTERNAL ) ;
                Status status = new Status() ;
                status.status = "Server Error!" ;
//                status.message = e.toString() ;
                StringWriter sw = new StringWriter();
                e.printStackTrace(new PrintWriter(sw));
                String exceptionAsString = sw.toString();
                status.message = e.toString() + "\n" + exceptionAsString ;
                System.err.println(exceptionAsString);
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
                JsonRepresentation response = API.hash_admin_update_document( doc_key, doc_json ); ;
                System.err.println("\t\t\tADMIN RESPONSE HERE = " + response.toString());
                return response ;
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
                JsonRepresentation response = API.hash_admin_delete_document( doc_key ) ;
                System.err.println("\t\t\tADMIN RESPONSE HERE = " + response.toString());
                return response ;
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
