import java.io.IOException;
import java.lang.annotation.Annotation;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.io.File;
import java.lang.reflect.*;
import java.util.regex.Pattern;

// Extract necessary information for reconstructing graph code
public class Extractor {
    private ArrayList<String> classesPath;
    private ArrayList<String> methodsString ;
    private ArrayList<String> fieldsString ;
    private ArrayList<String> realTypes ;
    private String absolutePath ;

    private ArrayList<Boolean> isInterface ;
    private HashMap<String, String> extendsList ;
    // subclass1 : superclass1
    private HashMap<String, ArrayList<String>> implementsList ;
    // class1 : [interface1, interface2 ...]
    private HashMap<String, HashMap<String, Boolean>> isPublicable ;
    // class1 : {field1: true, field2: false}
    // If getter&setter with field -> true, else false
    private HashMap<String, HashSet<String>> dependencies ;
    // class1: [interface1, interface2 ...]

    public Extractor() {
        classesPath = new ArrayList<>() ;
        methodsString = new ArrayList<>() ;
        fieldsString = new ArrayList<>() ;
        realTypes = new ArrayList<>() ;
        absolutePath = "" ;

        isInterface = new ArrayList<>() ;
        extendsList = new HashMap<>() ;
        implementsList = new HashMap<>() ;
        isPublicable = new HashMap<>() ;
        dependencies = new HashMap<>() ;
    }

    public ArrayList<String> getClassesPath() {
        return classesPath;
    }

    public ArrayList<String> getMethodsString() {
        return methodsString;
    }

    public ArrayList<String> getFieldsString() {
        return fieldsString;
    }

    public ArrayList<String> getRealTypes() {
        return realTypes;
    }

    public ArrayList<Boolean> getIsInterface() {
        return isInterface;
    }

    public HashMap<String, String> getExtendsList() {
        return extendsList;
    }

    public HashMap<String, ArrayList<String>> getImplementsList() {
        return implementsList;
    }

    public HashMap<String, HashMap<String, Boolean>> getIsPublicable() {
        return isPublicable;
    }

    public HashMap<String, HashSet<String>> getDependencies() {
        return dependencies;
    }

    public void extractInformation(String path) {
        System.out.println("### Extractor Started !");

        System.out.println(path);
        File folder = new File(path);
        absolutePath = folder.getAbsolutePath() ;
        String[] files = folder.list();
        for(String file: files) {
            if (file.contains(".java") && !file.contains("parsedGraph.java"))  classesPath.add(file.split("\\.")[0]) ;
        }

        System.out.println("### AbsolutePath\n\t" + absolutePath);
        System.out.println("### Located classes name\n\t" + classesPath.toString());

        for(String codePath: classesPath) {
            System.out.println("### Code name = " + codePath);
            Class cls = null;
            try {
                cls = Class.forName(codePath);
                InheritageProcessor.processInheritage(cls, isInterface, extendsList, implementsList);
            } catch(Exception e) {
                System.out.println(e);
            }
            System.out.println("\n### Processing Methods started !");
            MethodProcessor.processMethods(cls, methodsString);
            System.out.println("\n### Processing Fields started !");
            FieldProcessor.processFields(cls, fieldsString, realTypes);
            System.out.println("\n### Processing Getter Setter started !");
            GetterSetterProcessor.processGetterSetter(cls, isPublicable);
        }

        System.out.println("\n### Processing Dependency started !");
        DependencyProcessor.processDependency(classesPath, absolutePath, isInterface, dependencies);

        System.out.println("### Classes\n" + classesPath.toString());
        System.out.println("### Methods String\n" + methodsString.toString());
        System.out.println("### Fields String\n" + fieldsString.toString());
        System.out.println("### Real Types\n" + realTypes.toString());
        System.out.println("### Is Interface\n" + isInterface.toString());
        System.out.println("### Extends\n" + extendsList.toString());
        System.out.println("### Implements\n" + implementsList.toString());
        System.out.println("### Is Publicable\n" + isPublicable.toString());
        System.out.println("### Dependencies\n" + dependencies.toString() + "\n");
    }
}