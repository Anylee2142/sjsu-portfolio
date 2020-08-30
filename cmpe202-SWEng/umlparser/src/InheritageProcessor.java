import java.lang.reflect.AnnotatedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;

// Extract extends & implements information
public class InheritageProcessor {
    public static void processInheritage(
            Class cls,
            ArrayList<Boolean> isInterface,
            HashMap<String, String> extendsList,
            HashMap<String, ArrayList<String>> implementsList) {
        // if interface
        if (cls.isInterface()) {
            isInterface.add(true) ;
            System.out.println("\t\tI am an interface");
        }
        else { // if class
            isInterface.add(false) ;

            // extends
            if (cls.getAnnotatedSuperclass() != null && !cls.getSuperclass().getTypeName().equals("java.lang.Object")) {
                String superName = cls.getAnnotatedSuperclass().getType().toString().split(" ")[1];
                extendsList.put(cls.getName(), superName) ;
                System.out.println("\t\tExtends :"+superName);
            }

            // implements
            ArrayList<String> implement = new ArrayList<>() ;
            for(AnnotatedType annotatedType: cls.getAnnotatedInterfaces()) {
                Type type = annotatedType.getType();
                implement.add(type.getTypeName()) ;
                System.out.println("\t\tImplements :" + type.getTypeName());
            }
            if (implement.size() > 0) implementsList.put(cls.getName(), implement) ;
        }
    }
}
