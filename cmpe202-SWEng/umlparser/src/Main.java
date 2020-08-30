import java.util.Arrays;

public class Main {

    public static void main(String[] args) {

        System.out.println(Arrays.toString(args));
        Extractor extractor = new Extractor() ;
        extractor.extractInformation(args[0]);

        Reconstructor reconstructor = new Reconstructor(extractor);
        reconstructor.reconstructCodes();

        String fileName = (args.length > 1) ? args[1] : "parsedGraph" ;
        CodeWriter.writeReconstructedCodes(fileName, reconstructor.getReconstructedCodes());
    }
}