import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;

// Extract getter & setter information
public class GetterSetterProcessor {

    // Check if a field is publicable, private attribute with getter and setter
    public static void processGetterSetter(Class cls, HashMap<String, HashMap<String, Boolean>> isPublicable) {
        Method[] methods = cls.getDeclaredMethods();
        Field[] fields = cls.getDeclaredFields();
        HashMap<String, Boolean> fieldAndPublicable = new HashMap<>() ;

        for(Field field: fields) {
            // Consider only private attribute
            String fieldName = field.getName().toLowerCase() ;
            System.out.println("\t\t\t\tField name = " + fieldName);
            if (field.getModifiers() == 2) {
                String getterName = String.format("get%s", fieldName) ;
                String setterName = String.format("set%s", fieldName) ;
                System.out.println("\t\t\t\t- Getter = " + getterName);
                System.out.println("\t\t\t\t- Setter = " + setterName);

                // Check if getter and setter are there
                boolean isGetterThere = false ;
                boolean isSetterThere = false ;
                for(Method method: methods) {
                    String methodName = method.getName().toLowerCase() ;
                    System.out.println("\t\t\t\t\tIterated Method = " + methodName);
                    if (methodName.contains(getterName)) isGetterThere = true ;
                    if (methodName.contains(setterName)) isSetterThere = true ;
                }
                System.out.println("\t\t\t\tisGetter = " + isGetterThere);
                System.out.println("\t\t\t\tisSetter = " + isSetterThere);

                // If so, the field is "publicable"
                if (isGetterThere && isSetterThere) fieldAndPublicable.put(fieldName, true) ;
                else fieldAndPublicable.put(fieldName, false) ;
            }
        }
        isPublicable.put(cls.getName(), fieldAndPublicable) ;
    }
}
