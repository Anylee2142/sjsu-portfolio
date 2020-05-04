import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.ArrayList;

// Extract Method information
public class MethodProcessor {

    // Extract methods
    public static void processMethods(Class cls, ArrayList<String> methodsString) {
        String parsedMethods = "";

        Constructor[] allConstructors = cls.getConstructors();
        Constructor firstConstructor = null ;
        Method[] methods = (cls.isInterface()) ?  cls.getMethods() : cls.getDeclaredMethods() ;

        if (allConstructors.length > 0) {
            firstConstructor = allConstructors[0];
            String parameters = "(" ;
            // Extract Constructor
            // Even though there's more than 2 over-loaded, there should be one constructor
            // Or else, umlgraph will yield an error
            for (int i = 0; i < firstConstructor.getParameters().length; i++) {
                Parameter parameter = firstConstructor.getParameters()[i];
                String parameterType = parameter.getType().getSimpleName();
                String parameterName = parameter.getName();
                System.out.println("\t\t\tParameter type = " + parameterType);
                System.out.println("\t\t\tParameter name = " + parameterName);
                parameters += String.format("%s %s", parameterType, parameterName) ;
                if (i < firstConstructor.getParameters().length - 1) parameters += ", " ;
            }
            parameters += ")" ;
            String signature = String.format("public %s%s", firstConstructor.getName(), parameters);
            parsedMethods = parsedMethods + "\t" + signature + ";\n";
        }

        for (Method method: methods) {
            // Only extract Public method
            int modifier = method.getModifiers() ;
            System.out.println("\t### METHOD NAME = " + method);
            System.out.println("\t### METHOD MODIFIER = " + modifier);
            // 1 for Public, 1025 for Public abstract (from interface)
            if (modifier==1 || modifier==9 || modifier==1025) {
                Parameter[] parameters = method.getParameters();

                String parameterSignature = "" ;
                for(int i=0; i < parameters.length; i++) {
                    Parameter parameter = parameters[i] ;
                    String parameterType = parameter.getType().getSimpleName();
                    parameterSignature += String.format("%s %s", parameterType, parameter.getName()) ;
                    System.out.println("\t\tParameter signature = " + parameterSignature);
                    if (i != parameters.length - 1) parameterSignature +=", ";
                }

                String returnType = method.getGenericReturnType().toString() ;
                if (returnType.contains(" ")) {
                    String[] chunks = returnType.split(" ") ;
                    returnType = chunks[chunks.length-1] ;
                }
                if (returnType.contains(".")) {
                    String[] chunks = returnType.split("\\.") ;
                    returnType = chunks[chunks.length-1] ;
                }

                String signature = String.format("public %s %s(%s)", returnType, method.getName(), parameterSignature) ;
                System.out.println("\t\tsignature = " + signature);
                parsedMethods = parsedMethods + "\t" + signature +";\n" ;
            }
        }

        methodsString.add(parsedMethods) ;
    }
}
