import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;

// Reconstruct umlgraph code
public class Reconstructor {

    private ArrayList<String> classesPath;
    private ArrayList<String> methodsString ;
    private ArrayList<String> fieldsString ;
    private ArrayList<String> realTypes ;
    private ArrayList<String> javaDocs ;

    private ArrayList<Boolean> isInterface ;
    private HashMap<String, String> extendsList ;
    private HashMap<String, ArrayList<String>> implementsList ;
    private HashMap<String, HashMap<String, Boolean>> isPublicable ;
    private HashMap<String, HashSet<String>> dependencies ;

    private ArrayList<String> reconstructedCodes ;

    public Reconstructor(Extractor extractor) {
        this.classesPath = extractor.getClassesPath() ;
        this.methodsString = extractor.getMethodsString() ;
        this.fieldsString = extractor.getFieldsString() ;
        this.realTypes = extractor.getRealTypes() ;
        this.javaDocs = new ArrayList<>() ;

        this.isInterface = extractor.getIsInterface() ;
        this.extendsList = extractor.getExtendsList() ;
        this.implementsList = extractor.getImplementsList() ;
        this.isPublicable = extractor.getIsPublicable() ;
        this.dependencies = extractor.getDependencies() ;

        this.reconstructedCodes = new ArrayList<>() ;
    }

    public ArrayList<String> getReconstructedCodes() {
        return reconstructedCodes;
    }

    private String reconstructOneCode(int index,
                                      String className,
                                      String methodString,
                                      String fieldString,
                                      String javadoc) {

        String output = "";
        output += javadoc ;
        String extend = extendsList.get(className) ;
        ArrayList<String> implement = implementsList.get(className) ;
        if (extend != null) System.out.println("\t\t\tEXTEND = " + extend);
        if (implement != null) System.out.println("\t\t\tIMPLEMENT = " + implement);

        output += String.format("%s %s %s{\n",
                (isInterface.get(index)) ? "interface " + className : "class " + className,
                (extend != null) ? "extends " + extend : "",
                (implement!= null) ? "implements " + String.join(", ", implement) : "") ;
        output += fieldString ;
        output += methodString ;
        output += "}\n";

        return output;
    }

    public void reconstructCodes() {
        System.out.println("### Reconstruction Started !");

        // For class UMLOptions
        String umlOptions = AnnotationGenerator.generateUMLOptions() ;
        reconstructedCodes.add(umlOptions) ;

        // For others
        for(int i = 0; i < classesPath.size(); i++) {
            System.out.println("### i = "+i +" class name = "+classesPath.get(i));

            System.out.println("### Switch to Public");
            PublicSwitcher.switchToPublic(i, classesPath, methodsString, fieldsString, isPublicable); ;

            System.out.println("### Generate Associations");
            AnnotationGenerator.generateAssociationsAndDependency(i, classesPath, fieldsString, realTypes, javaDocs, dependencies);

            System.out.println("### Reconstruct One Code");
            String reconstructedCode = reconstructOneCode(i, classesPath.get(i), methodsString.get(i), fieldsString.get(i), javaDocs.get(i));

            reconstructedCodes.add(reconstructedCode) ;
        }

        System.out.println("### Reconstructed codes\n"+reconstructedCodes.toString());
    }
}
