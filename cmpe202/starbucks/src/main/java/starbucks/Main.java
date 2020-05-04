/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package starbucks ;

import java.io.Console;
import java.util.Arrays;

/**
 * Main Entry Point.
 */
final class Main {

    /**
     * Prevent Construction.
     */
    private Main() {
        // Utility Class
        return ;
    }

    /** Checker for Command
     * @param cmd Input command
     * @return True or False
     * */
    private static boolean isCommand(String cmd) {
        return (cmd.equals("a") || cmd.equals("b")
                || cmd.equals("c") || cmd.equals("d")
                || cmd.equals("e")) ;
    }

    /**
     * Print some material
     * @param app reference to IApp
     * @param msg Message string
     * */
    private static void printScreen(IApp app, String msg) {
        System.out.print("\033[H\033[2J") ; // clear the screen
        System.out.flush() ;
        System.out.println(app.screenContents()) ;
        System.out.println( msg ) ;
        System.out.print("=> ") ;
    }

    /**
     * Generate parms
     * @param cmd command string
     * @return parms
     * */
    private static String generateParams(String cmd) {
        String parms = cmd.replaceFirst("touch", "") ;
        parms = parms.substring(1) ;
        parms = parms.substring(0, parms.length() - 1) ;
        return parms;
    }

    /**
     * Main App Entry Point.
     * @param args No args expected.
     */
    public static void main(final String[] args) {
        System.err.println( "Args: " + Arrays.toString(args) ) ;
        Device d = Device.getInstance() ;
        IApp app = (IApp) d ;
        Console c = System.console();
        String msg = "" ;
        for (;;) {
            printScreen(app, msg);
            String ch = c.readLine() ;       // get user command
            String cmd = ch.toLowerCase().replaceAll("\\s","") ;  // convert to lower case
            /* process commands */
            if ( cmd.startsWith("touch") ) {
                String[] values = generateParams(cmd).split(",") ;
                msg = "touch: x="+values[0] + " y="+values[1] ;
                app.touch( Integer.parseInt(values[0]), Integer.parseInt(values[1]) ) ; }
            if (isCommand(cmd)) { String selection = cmd.toUpperCase() ; msg = "selected: " + selection ; app.execute( selection ) ; }
            if ( cmd.startsWith("prev") ) { msg = "cmd: previous" ; app.prev() ; }
            if ( cmd.startsWith("next") ) { msg = "cmd: next" ; app.next() ; }
            if (cmd.equalsIgnoreCase( "portrait" )) { app.portrait() ; }
            if (cmd.equalsIgnoreCase( "landscape" )) { app.landscape() ; }
            if ( cmd.startsWith("login") ) { app.touch(1, 5);app.touch(2, 5);app.touch(3, 5);app.touch(1, 6); }
        }
    }
}

