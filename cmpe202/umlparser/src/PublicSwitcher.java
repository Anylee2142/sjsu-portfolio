import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

// Convert private atrriute into public one if with getter and setter
public class PublicSwitcher {

    public static void switchToPublic(
            int myIndex,
            ArrayList<String> classesPath,
            ArrayList<String> methodsString,
            ArrayList<String> fieldsString,
            HashMap<String, HashMap<String, Boolean>> isPublicable
    ) {
        // 1. go to class
        // 2. iterate fields
        // 3. switch to public if getter setter true
        // 4. remove those getter setter

        String myType = classesPath.get(myIndex) ;
        String myFieldsString = fieldsString.get(myIndex) ;
        String myMethodsString = methodsString.get(myIndex) ;
        String[] myFields = myFieldsString.split("\n") ;
        String[] myMethods = myMethodsString.split("\n") ;

        System.out.println("\t\t\tmyFields before = " + Arrays.toString(myFields)) ;
        System.out.println("\t\t\tmyMethods before = " + Arrays.toString(myMethods)) ;

        // 2. iterate fields
        HashMap<String, Boolean> fieldAndPublicable = isPublicable.get(myType) ;
        System.out.println("\t\t\tFieldAndPubliacble = " + fieldAndPublicable);
        for(int i=0; i< myFields.length; i++) {
            String myField = myFields[i] ;
            String fieldName = "" ;
            try {
//                fieldName = myField.split(" ")[2].replace(";", "").toLowerCase();
                String[] chunks = myField.split("\\W") ;
                fieldName = chunks[chunks.length - 1 ].toLowerCase();
            } catch (Exception e) {
                continue ;
            }
            System.out.println("\t\t\tField name = " + fieldName);
            if (myField.contains("private")) {
                Boolean publicable = fieldAndPublicable.get(fieldName) ;
                System.out.println("\t\t\tPublicable = " + publicable);

                if (publicable) {
                    // 3. switch to public if getter setter true
                    String myFieldPublicitized = myField.replace("private", "public") ;
                    myFields[i] = myFieldPublicitized ;
                    System.out.println(String.format("\t\t\t\tFrom `%s` to `%s`", myField, myFieldPublicitized));

                    // 4. remove those getter setter
                    String getterName = String.format("get%s", fieldName).toLowerCase() ;
                    String setterName = String.format("set%s", fieldName).toLowerCase() ;
                    System.out.println("\t\t\t\tGetter name = " +getterName);
                    System.out.println("\t\t\t\tSetter name = " +setterName);
                    for(int j=0; j < myMethods.length; j++) {
                        String lowerMyMethod = myMethods[j].toLowerCase() ;
                        if(lowerMyMethod.contains(getterName) || lowerMyMethod.contains(setterName)) {
                            myMethods[j] = "" ;
                            System.out.println("\t\t\t\t\tThis method: " + lowerMyMethod + " eliminated !");
                        }
                    }
                }
            }
        }

        System.out.println("\t\t\tmyFields after = " + Arrays.toString(myFields)) ;
        System.out.println("\t\t\tmyMethods after = " + Arrays.toString(myMethods)) ;
        fieldsString.set(myIndex, String.join("\n", myFields) +"\n") ;
        methodsString.set(myIndex, String.join("\n", myMethods) + "\n") ;
    }
}
