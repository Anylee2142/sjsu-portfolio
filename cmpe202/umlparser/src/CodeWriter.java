import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

// Write umlgraph code
public class CodeWriter {

    public static void writeReconstructedCodes(String fileName, ArrayList<String> reconstructedCodes) {
        System.out.println("### Write reconstructed codes !\n");
        String filePath = "./" + fileName +".java";
        System.out.println("### File Path = " + filePath);
        File fold=new File(filePath);
        fold.delete();
        File fnew=new File(filePath);
        String source = String.join("\n", reconstructedCodes) ;
        System.out.println(source);

        try {
            FileWriter f2 = new FileWriter(fnew, false);
            f2.write(source);
            f2.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
