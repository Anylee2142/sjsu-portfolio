import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;

// Extract Field information
public class FieldProcessor {

    private static String extractType(String in) {
        String result = "";
        if (in.split(" ").length == 1) result = in.split(" ")[0] ;
        else if (in.split(" ").length == 2) result = in.split(" ")[1] ;
        return result ;
    }

    // Extract fields
    public static void processFields(Class cls, ArrayList<String> fieldsString, ArrayList<String> realTypes) {
        Field[] fields = cls.getDeclaredFields();
        String parsedFields = "";
        String realType = "";
        for (Field field :fields) {
            Type type = field.getGenericType();
            System.out.println("\tfield name: " + field.getName());

            // Only extract public or private attributes
            // Public for 1, Private for 2
            int modifier = field.getModifiers() ;
            if ( modifier==1 || modifier==2 ) {
                // Type extraction
                if (type instanceof ParameterizedType) {
                    ParameterizedType ptype = (ParameterizedType) type;
                    ptype.getRawType();
                    System.out.println("\t-raw type:" + ptype.getRawType());
                    Type[] ts = ptype.getActualTypeArguments() ;
                    // If one parameterizedType, First is real type
                    // If two, then second one
                    Type t = (ts.length == 1) ? ts[0] : ts[1] ;
                    System.out.println("\t\t-type arg: " + t) ;
                    realType += extractType(t.toString()) +"\n" ;
//                    for (Type t: ptype.getActualTypeArguments()) {
//                        System.out.println("\t\t-type arg: " + t) ;
//                        realType += extractType(t.toString()) +"\n" ;
//                    }
                } else {
                    System.out.println("\t\t-field type: " + field.getType().getSimpleName()) ;
                    realType += extractType(field.getType().getSimpleName()) +"\n" ;
                }

                // Name extraction
                String typeName = type.getTypeName() ;
                System.out.println("\t\ttypeName = " + typeName);
                if (typeName.contains(".")) {
//                    String[] chunks = typeName.split("\\.") ;
//                    typeName = chunks[chunks.length-1] ;
                    typeName = typeName.replace("java", "") ;
                    typeName = typeName.replace("util", "") ;
                    typeName = typeName.replace("lang", "") ;
                    typeName = typeName.replace(".", "") ;
                }
                String prefix = (modifier==1) ? "public" : "private" ;
                String signature = String.format("%s %s %s", prefix, typeName, field.getName());
                parsedFields = parsedFields + "\t" + signature + ";\n" ;
                System.out.println("\t\t\tSignature = "+signature);
            }
        }
        fieldsString.add(parsedFields) ;
        realTypes.add(realType) ;
    }
}
