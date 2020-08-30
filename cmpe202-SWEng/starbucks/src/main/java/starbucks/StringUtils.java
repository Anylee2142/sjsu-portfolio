package starbucks;
import java.lang.Math;

/** Class for centered output */
class StringUtils {

    /**
     * Get centered output from input
     * @param s input String
     * @param size size of input
     * @return centered output
     */
    public static String center(String s, int size) {
        return center(s, size, ' ');
    }

    /**
     * Get centered output from input
     * @param s input String
     * @param size size of input
     * @param pad padding character
     * @return centered output
     */
    public static String center(String s, int size, char pad) {
        if (s == null || size <= s.length())
            return s;

        StringBuilder sb = new StringBuilder(size);

        int firstHalf = (int) Math.ceil((size - s.length())/2F);

        for (int i = 0; i < firstHalf; i++) {
            sb.append(pad);
        }
        sb.append(s);
        while (sb.length() < size) {
            sb.append(pad);
        }
        return sb.toString();
    }

    /**
     * Helper Debug Dump to STDERR
     * @param str Lines to print
     */
    public static void dumpLines(String str) {
        String[] lines = str.split("\r\n|\r|\n");
        for ( int i = 0; i<lines.length; i++ ) { System.err.println( i + ": " + lines[i] ) ; }
    }

    /**
     * Helper:  Count lines in a String
     * @param  str Lines to Count
     * @return     Number of Lines Counted
     */
    public static int countLines(String str){
        if (str == null || str.isEmpty()) { return 0; }
        int lines = 0;
        int pos = 0;
        while ((pos = str.indexOf("\n", pos) + 1) != 0) { lines++; }
        return lines ;
    }

    /**
     * Helper:  Pad lines for a Screen
     * @param  num Lines to Padd
     * @return     Padded Lines
     */
    public static String padLines(int num) {
        StringBuffer buf = new StringBuffer();
        for ( int i = 0; i<num; i++ ) {
            System.err.print(".") ;
            buf.append("\n");
        }
        System.err.println("") ;
        return buf.toString() ;
    }
}