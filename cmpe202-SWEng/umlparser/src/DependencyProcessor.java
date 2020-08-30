import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

// Extract Dependency information as per project requirements
public class DependencyProcessor {

    public static void processDependency(
            ArrayList<String> classesPath,
            String absolutePath,
            ArrayList<Boolean> isInterface,
            HashMap<String, HashSet<String>> dependencies) {
        for(int i=0; i < classesPath.size(); i++) {
            processDependencyForOneCode(
                    i,
                    absolutePath,
                    classesPath,
                    isInterface,
                    dependencies
            );
        }
    }

    // Check if a class has dependency to interface
    private static void processDependencyForOneCode(
            int index,
            String absolutePath,
            ArrayList<String> classesPath,
            ArrayList<Boolean> isInterface,
            HashMap<String, HashSet<String>> dependencies
    ) {
        HashSet<String> dependency = new HashSet<>() ;
        String className = classesPath.get(index) ;
        if (isInterface.get(index)) {
            dependencies.put(className, dependency) ;
            return;
        }

        String codeString = "";
        try {
            String filePath = String.format("%s/%s.java", absolutePath, className) ;
            System.out.println("\tCode Path = " + filePath);
            codeString = new String (Files.readAllBytes(Paths.get(filePath)));
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println("### Code String successfully loaded!\n" +
                codeString + "\n\n");

        ArrayList<Integer> publicIndices = new ArrayList<>();
        int num = codeString.indexOf("public");
        publicIndices.add( num ) ;
        while (num >=0) {
            num = codeString.indexOf("public", num+1);
            publicIndices.add( num ) ;
        }
        publicIndices.remove(0) ;
        publicIndices.remove(publicIndices.size() - 1) ;
        System.out.println("### Public Indices = " + publicIndices.toString() + "\n\n");

        while(publicIndices.size() > 0) {
            String oneSection = codeString.substring(publicIndices.get(0), (publicIndices.size()==1) ? codeString.length()-1 : publicIndices.get(1)) ;
            // Replace display string inside quotes
            // If display string contains the name of interface, it will recognize as dependency.
            oneSection = oneSection.replaceAll("\".*\"", "") ;
            System.out.println("\t### Parsed One Section String! \n" +
                    "\t" + oneSection + "\n");

            for(int i=0; i < isInterface.size(); i++) {
                if (isInterface.get(i)) {
                    String interfaceName = classesPath.get(i) ;
                    for(String part: oneSection.split("\\W")) {
                        if (part.equals("")) continue ;
//                        System.out.println("!!!!!!! " + part);
                        if (part.trim().equals(interfaceName)) dependency.add(interfaceName) ;
                    }
                }
            }
            publicIndices.remove(0) ;
        }

        dependencies.put(className, dependency) ;
    }
}
