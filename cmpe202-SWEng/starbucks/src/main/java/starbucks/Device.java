/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package starbucks ;

/**
 * Authentication Proxy for App Controller
 */
public class Device implements IApp, IPinAuthObserver {
    
    private static Device theDevice = null;   
    private boolean fourPin = true ;
    private boolean sixPin = false ;
    private String pin = "" ; 

    private IApp app ;
    private KeyPad kp ;
    private IDisplayComponent pc ;
    private PinScreen ps ;
    private ScreenDecorator psScreen;
    private boolean authenticated = false ;
    private boolean isFail = false;
    private PinEntryMachine pm ;

    public static final int screen_frame_header = 3 ;
    public static final int portrait_screen_width = 15 ;
    public static final int portrait_screen_length = 10 ;
    public static final int landscape_screen_width = 32 ;
    public static final int landscape_screen_length = 6 ;

    private boolean isFirstTime = true;

    /** Specify possible orientation modes */
    public enum ORIENTATION_MODE {
        PORTRAIT, LANDSCAPE
    }

    private ORIENTATION_MODE device_orientation_state ;

    /**
     * Get device orientation mode
     * @return device_orientation_state
     * */
    public ORIENTATION_MODE getDeviceOrientation() {
        return this.device_orientation_state ;
    }

    /**
     * Set device orientation mode as portrait
     * */
    public void setPortraitOrientation() {
        this.device_orientation_state = ORIENTATION_MODE.PORTRAIT ;
    }

    /**
     * Set device orientation mode as landscape
     * */
    public void setLandscapeOrientation() {
        this.device_orientation_state = ORIENTATION_MODE.LANDSCAPE ;
    }

    private Device() { }

    /** Debug Device State */
    public static void debug()
    {
        Device d = Device.getInstance() ;
        System.err.println( "============================================" ) ;
        System.err.println( "--------- D E V I C E  S T A T E  ----------" ) ;
        System.err.println( "============================================" ) ;
        System.err.println( "Pin Screen name = " + d.getPinName() ) ;
        System.err.println( "Pin Option    = " + d.getPinOption() ) ;
        System.err.println( "Stored Pin    = " + d.getPin() ) ;
        System.err.println( "Authenticated = " + d.isAuthenticated() ) ;
        System.err.println( "Orientation   = " + d.getDeviceOrientation() ) ;
        System.err.println( "============================================" ) ;
    }

    /**
     * Get Current Auth State
     * @return Auth T/F
     */
    public String isAuthenticated() {
        return Boolean.toString( authenticated ) ;
    }    

    /**
     * Return the current Pin Option:
     *  0 = User Chosed No Pin
     *  4 = User Chosed 4-digit Pin
     *  6 = User Chosed 6-digit Pin
     * @return Pin Option
     */
    public int getPinOption() {
        if ( fourPin ) return 4 ;
        else if ( sixPin ) return 6 ;
        else return 0 ;
    }

    /**
     * Get Current Name of Pin Screen
     * @return String
     */
    public String getPinName() {
        return ps.name() ;
    }

    /**
     * Get Current Pin
     * @return Pin
     */
    public String getPin() {
        return pin ;
    }


    /**
     * Set Pin
     * @param p New Pin
     */
    private void setPin( String p ) {
        pin = p ;
        int len = p.length() ;
        if (len==6) { fourPin = false; sixPin = true;}
    }

    /**
     * Get Singleton Instance
     * @return Reference to Current Device Config (Create if none exists)
     */
    public synchronized static Device getInstance() {
        if (theDevice == null) { return getNewInstance( "1234" ) ; }
        else return theDevice;
    }

    /**
     * Get New Instance 
     * @return Reference to Device (Create New Singleton)
     */
    public synchronized static Device getNewInstance() {
        return getNewInstance( "1234" );
    }

    /**
     * Get New Instance with password
     * @param pin password
     * @return Reference to Device (Create New Singleton)
     */
    public synchronized static Device getNewInstance( String pin ) {
        theDevice = new Device() ;
        theDevice.setPin( pin ) ;
        if (pin.length() != 4 && pin.length() != 6) { theDevice.authenticated = true; }
        theDevice.startUp() ;
        debug() ;
        return theDevice ;
    }

    /**
     * Device Starup Process.  
     * Starts Up with Default 4-Pin Option
     */
    public void startUp()
    {
        setUpScreens();
        setUpComposite();
        setUpObserver();

        // get app controller reference
        app = new AppController() ;        

        // startup in portrait
        this.device_orientation_state = ORIENTATION_MODE.PORTRAIT ;
    }

    /** set up Screens*/
    private void setUpScreens() {
        kp = new KeyPad() ;
        ps = new PinScreen() ;
        pm = new PinEntryMachine();
        if (this.fourPin) { pc = new FourDigitsPasscode() ; pm.setIs4pin(true); }
        else if (this.sixPin) { pc = new SixDigitsPasscode() ; pm.setIs4pin(false); }
        pm.setPin(pin);
    }

    /** set up composite pattern */
    private void setUpComposite() {
        // setup the composite pattern
        IDisplayComponent[] iDisplayComponents = {pc, new TextDisplayScreen("Spacer", ""), kp};
        for(IDisplayComponent comp: iDisplayComponents) { ps.addSubComponent(comp); }
        psScreen = new ScreenCenterDecorator(ps);
    }

    /** set up observer pattern */
    private void setUpObserver() {
        // setup the observer pattern
        ((IKeyPadSubject)kp).attach( (IKeyPadObserver) pc ) ;
        ((IKeyPadSubject)kp).attach( (IKeyPadObserver) pm ) ;
        ((IPinAuthSubject)pm).registerObserver(this) ;
    }



    /**
    * Switch to Landscape View
    */
    public void landscape() {
        if ( authenticated ) app.landscape() ;
    }

    /**
     * Switch to Portait View
     */
    public void portrait() {
        if ( authenticated ) app.portrait() ;
    }

    /**
     * User Touch at X,Y Coordinates
     * @param x X Coordinate
     * @param y Y Coordinate
     */
    public void touch(int x, int y) {
        if ( authenticated ) app.touch(x, y) ;
        else ps.touch(x, y) ;
    }

    /**
     * Display Screen Contents to Terminal
     */
    public void display() {
        System.out.println( screenContents() ) ;
    }

    /**
     * Get Class Name of Screen
     * @return Class Name of Current Screen
     */
    public String screen() {
        if ( authenticated ) return app.screen() ;
        else return psScreen.name() ;
    }

    /**
     * Get Screen Contents as a String
     * @return Screen Contents of Current Screen
     */
    public String screenContents() {
        if ( authenticated ) { return app.screenContents() ; }
        else { String out = "---------------\n" ;
            if (!this.isFail){ out += "   " + psScreen.name() + "  \n" ;
                out += "---------------\n\n\n" ;
                out += psScreen.display() ;
            } else{ String content = "\n\n";
                if (isFirstTime) { content = "  Invalid Pin\n\n" ; isFirstTime = false ; }
                out += "\n---------------\n" +
                        content ;
                out += psScreen.display() ;
            } out += "\n\n\n---------------\n" ;
            return out ; }
    }


    /**
     * Select a Menu Command
     * @param c Menu Option (A, B, C, E, or E)
     */
    public void execute( String c ) {
        if ( authenticated ) app.execute( c ) ;
    }

    /**
     * Navigate to Previous Screen
     */
    public void prev() {
        if ( authenticated ) app.prev() ;
    }

    /**
     * Navigate to Next Screen
     */
    public void next() {
        if ( authenticated ) app.next() ;
    }

    /**
     * Receive Authenticated Event from Authenticator
     * @param isFail indicates whether authentication is fail or not
     */
    public void authEvent(boolean isFail) {
        if (isFail) {
            this.isFail = true ;
            this.authenticated = false;
            this.isFirstTime = true;
            this.kp.flushCountPinDigits();
        }
        else {
            this.isFail = false ;
            this.authenticated = true;
            this.isFirstTime = true;
        }
    }

}
