import java.util.*;

// Generate Annotation for umlgraph code
public class AnnotationGenerator {
    public static String generateUMLOptions() {
        String umlOptions = "\n/**\n" +
                " * @opt operations\n" +
                " * @opt attributes\n" +
                " * @opt types\n" +
                " * @opt visibility\n" +
                " * @opt constructors\n" +
                " * @hidden\n" +
                " */\n" +
                "class UMLOptions {}\n\n" ;

        HashSet<String> set = new HashSet<>();
        String hiddenClasses = "" ;

        // TODO: find enum from codes, and reflect here
        String[] skipTypes = {"String", "ArrayList", "HashMap", "Hashtable", "Device$ORIENTATION_MODE"} ;
        for(String skipType: skipTypes) {
            hiddenClasses += "/**\n" +
                    " * @hidden\n" +
                    " */\n" +
                    String.format("class %s {}\n\n", skipType) ;
        }
        System.out.println("### Detected built-in type = " + set);

        return  umlOptions+ hiddenClasses;
    }

    // determine multiplicity and remove other side's attribute
    public static void generateAssociationsAndDependency(
            int myIndex,
            ArrayList<String> classesPath,
            ArrayList<String> fieldsString,
            ArrayList<String> realTypes,
            ArrayList<String> javaDocs,
            HashMap<String, HashSet<String>> dependencies
    ) {
        String myFieldsTypesString = realTypes.get(myIndex) ;
        String[] myFieldsTypes = myFieldsTypesString.split("\n") ;
        String myFieldsString = fieldsString.get(myIndex) ;
        String[] myFields = myFieldsString.split("\n") ;
        String myType = classesPath.get(myIndex) ;

        // Determine which classes are redundant
        ArrayList<Integer> redundantIndices = new ArrayList<>() ;
        for(int i=0; i < myFieldsTypes.length; i++) {
            String ithType = myFieldsTypes[i] ;
            if (classesPath.contains(ithType)) redundantIndices.add(classesPath.indexOf(ithType)) ;
        }

        // Generate Association & Multiplicity
        // Go to redundant classes and remove atrribute(s) that type is mine
        // e.g. A has B,C,D, and B has A
        // Then go to B, remove A attribute
        String javadocComplete = "/**\n" ;
        for(int i: redundantIndices) {
            String javadoc = "" ;
            myFieldsTypesString = realTypes.get(myIndex) ;
            myFieldsTypes = myFieldsTypesString.split("\n") ;
            myFieldsString = fieldsString.get(myIndex) ;
            myFields = myFieldsString.split("\n") ;

            String itsClass = classesPath.get(i) ;
            String itsFieldsString = fieldsString.get(i) ;
            String itsFieldsTypesString = realTypes.get(i) ;
            String[] itsFields = itsFieldsString.split("\n") ;
            String[] itsFieldsTypes = itsFieldsTypesString.split("\n") ;
            System.out.println("ITS TYPE = " + itsClass);
            System.out.println("ITS FIELDS = " + Arrays.toString(itsFields));
            System.out.println("ITS TYPES = " + Arrays.toString(itsFieldsTypes));

            String result = "" ;
            String resultTypes = "" ;
            javadoc += " * @assoc " ;

            // Fix your fields & types
            // If Collection, List, Set, ArrayList or HashMap -> *
            // else -> 1
            System.out.println("\t### Its Fields Length = " + itsFields.length);
            System.out.println("\t### Its FieldsTypes length = " + itsFieldsTypes.length);
            if (itsFields.length > 1) {
                for (int j = 0; j < itsFieldsTypes.length; j++) {
//                if (itsFields[j].equals("")) continue ;
                    if (!itsFieldsTypes[j].equals(myType)) { // Remove my type from your class, and make @assoc annotation
//                    String in = itsFields[j].replace("private ", "").replace("public ", "") ;
                        result += itsFields[j] + "\n";
                        resultTypes += itsFieldsTypes[j] + "\n";
                    } else {
                        if (itsFields[j].contains("Collection") || // when multiplicity is *
                                itsFields[j].contains("List") ||
                                itsFields[j].contains("Set") ||
                                itsFields[j].contains("Map")) {
                            javadoc += "\"*\" - ";
                        } else { // when 1
                            javadoc += "\"1\" - ";
                        }
                    }
                }
            } else javadoc += "\"\" - " ;
            // If not processed above, then it should be marked as 0
            if (!javadoc.contains("-")) { javadoc += "\"\" - " ;}
            System.out.println("\tRESULT = " + result);
            System.out.println("\tRESULT TYPES = " + resultTypes);
            System.out.println("\tJAVADOC = " + javadoc);

            // Fix my fields & types
            String result1 = "" ;
            String resultTypes1 = "" ;
            System.out.println("\t### myFields length = " + myFields.length);
            System.out.println("\t### myFieldsTypes length = " + myFieldsTypes.length);
            if(myFields.length > 1) {
                for (int j = 0; j < myFieldsTypes.length; j++) {
                    if (!myFieldsTypes[j].equals(itsClass)) { // Remove your type from my class, and make @assoc annotation
//                    String in = myFields[j].replace("private ", "").replace("public ", "") ;
                        result1 += myFields[j] + "\n";
                        resultTypes1 += myFieldsTypes[j] + "\n";
                    } else {
                        if (myFields[j].contains("Collection") ||
                                myFields[j].contains("List") ||
                                myFields[j].contains("Set") ||
                                myFields[j].contains("Map")) {
                            if (!javadoc.contains(itsClass)) javadoc += "\"*\" " + itsClass + "\n";
                        } else {
                            if (!javadoc.contains(itsClass)) javadoc += "\"1\" " + itsClass + "\n";
                        }
                    }
                }
            } else javadoc += "\"\" " + itsClass + "\n";

            // Append only if the string contains class name && it has not been added to javadocComplete
            // Don't append any more if itsClass is already
            if (javadoc.contains(itsClass) && !javadocComplete.contains(itsClass)) javadocComplete += javadoc ;

            System.out.println("\tRESULT1 = " + result1);
            System.out.println("\tRESULT TYPES1 = " + resultTypes1);
            System.out.println("\tJAVADOC = " + javadoc);
            fieldsString.set(i, result) ;
            realTypes.set(i, resultTypes) ;
            fieldsString.set(myIndex, result1) ;
            realTypes.set(myIndex, resultTypes1) ;
        }

        // Generate Dependency
        HashSet<String> dependency = dependencies.get(myType) ;
        Iterator<String> iterator = dependency.iterator() ;
        while (iterator.hasNext()) {
            String interfaceType = iterator.next() ;
//            if (!javadoc.contains(interfaceType)) javadoc += String.format(" * @depend - \"\" - %s\n", interfaceType) ;
            javadocComplete += String.format(" * @depend - \"\" - %s\n", interfaceType) ;
        }

        javadocComplete = (javadocComplete.equals("/**\n")) ? "" : javadocComplete + " */\n";
        System.out.println("\t\tModified fields = " + fieldsString.toString());
        javaDocs.add(javadocComplete) ;
    }
}
