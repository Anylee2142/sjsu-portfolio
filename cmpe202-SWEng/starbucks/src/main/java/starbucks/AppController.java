/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package starbucks ;

/**
 * Main App Controller Class
 */
public class AppController implements IApp {

    private IScreen mycards ;
    private IScreen mycardsPay ;
    private IScreen options ;
    private IScreen moreOptions ;
    private IScreen store ;
    private IScreen rewards ;
    private IScreen payments ;
    private IScreen settings ;
    private IScreen addcard ;

    private IScreen mycardsScreen ;
    private IScreen mycardsPayScreen ;
    private IScreen optionsScreen ;
    private IScreen moreOptionsScreen ;
    private IScreen paymentsScreen ;
    private IScreen rewardsScreen ;
    private IScreen storeScreen ;
    private IScreen settingsScreen ;
    private IScreen addcardScreen ;

    private IDisplayComponent myCardsTds ;
    private IDisplayComponent myCardsPayTds ;

    // Menu bar
    private IMenuCommand displayMyCards = new MenuCommand() ;
    private IMenuCommand displayPayments = new MenuCommand() ;
    private IMenuCommand displayRewards = new MenuCommand() ;
    private IMenuCommand doStore = new MenuCommand() ;
    private IMenuCommand doSettings = new MenuCommand() ;

    private IFrame frame ;

    public AppController() {
        setUpScreens();
        setUpScreenBundle();
        setUpCommand();
    }

    /** set up Screens and Decorated Screens */
    private void setUpScreens() {
        setUpScreensFirst();
        setUpScreensSecond();
        setUpScreensThird();
        frame = new Frame( mycardsScreen ) ;
    }

    /** set up screen, first part */
    private void setUpScreensFirst() {
        myCardsTds = new TextDisplayScreen("MyCards", "");
        mycards = new MyCards((TextDisplayScreen) myCardsTds) ;
        mycardsScreen = new ScreenCenterDecorator(mycards);
        myCardsPayTds = new TextDisplayScreen("MyCardsPay", "");
        mycardsPay = new MyCardsPay((TextDisplayScreen) myCardsPayTds) ;
        mycardsPayScreen = new ScreenCenterDecorator(mycardsPay);
        options = new MyCardsOptions() ;
        optionsScreen = new ScreenLeftDecorator(options) ;
    }

    /** set up screen, second part */
    private void setUpScreensSecond() {
        moreOptions = new MyCardsMoreOptions() ;
        moreOptionsScreen = new ScreenLeftDecorator(moreOptions);

        payments = new Payments() ;
        paymentsScreen = new ScreenLeftDecorator(payments);

        rewards = new Rewards() ;
        rewardsScreen = new ScreenLeftDecorator(rewards);
    }

    /** set up screen, third part */
    private void setUpScreensThird() {
        store = new Store() ;
        storeScreen = new ScreenLeftDecorator(store);

        settings = new Settings() ;
        settingsScreen = new ScreenCenterDecorator(settings);

        addcard = new AddCard() ;
        addcardScreen = new ScreenCenterDecorator(addcard);
    }

    /** set up screenbundle */
    private void setUpScreenBundle() {
        ScreenBundle screenBundle = new ScreenBundle();
        screenBundle.setIFrame(frame);
        String[] keys = {"mycards", "mycardsPay", "options", "moreOptions", "store", "rewards", "payments", "settings", "addcard",
                "mycardsScreen", "settingsScreen"} ;
        IScreen[] iScreens = {mycards, mycardsPay, options, moreOptions, store, rewards, payments, settings, addcard,
                mycardsScreen, settingsScreen};
        for(int i=0; i< keys.length; i++) { screenBundle.setIScreens(keys[i], iScreens[i]); }
        screenBundle.setIScreens("moreOptionsScreen", moreOptionsScreen);
        screenBundle.setIScreens("addcardScreen", addcardScreen);
        screenBundle.setIScreens("optionsScreen", optionsScreen);
        screenBundle.setIScreens("mycardsPayScreen", mycardsPayScreen);
        screenBundle.setiDisplayComponents("myCardsTds", myCardsTds);
        screenBundle.setiDisplayComponents("myCardsPayTds", myCardsPayTds);
        screenBundle.connectScreenBundle();
    }


    /** set up command pattern*/
    private void setUpCommand() {
        // setup command pattern
        setUpReceiver();
        setUpMenuItem();
    }

    /** set up Receiver */
    private void setUpReceiver() {
        displayMyCards.setReceiver(receiverGenerator(mycardsScreen)) ;
        displayPayments.setReceiver(receiverGenerator(paymentsScreen)) ;
        displayRewards.setReceiver(receiverGenerator(rewardsScreen)) ;
        doStore.setReceiver(receiverGenerator(storeScreen)) ;
        doSettings.setReceiver(receiverGenerator(settingsScreen)) ;
    }

    /**
     * Generate Receiver
     * @param screen reference to IScreen
     * @return IMenuReceiver
     * */
    private IMenuReceiver receiverGenerator(IScreen screen) {
        IMenuReceiver iMenuReceiver = new IMenuReceiver() {
            /** Command Action */
            public void doAction() {
                frame.setCurrentScreen(screen);
            }
        };
        return iMenuReceiver;
    }

    /** set up MenuItem */
    private void setUpMenuItem() {
        String keys[] = {"A", "B", "C", "D", "E"};
        IMenuCommand[] commands = {displayMyCards, displayPayments, displayRewards, doStore, doSettings};
        frame.setMenuItems(keys, commands);
    }

    /**
      * Switch to Landscape Mode
      */
    public void landscape() {
        System.out.println("App Controller###LANDSCAPE") ;
        System.err.println("App Controller###LANDSCAPE") ;
        frame.landscape() ;
    }

    /**
     * Switch to Portait Mode
     */
    public void portrait() {
        System.err.println("App Controller###PORTRAIT") ;
        frame.portrait() ;
    }

    /**
     * Send In Touch Events
     * @param x X Coord
     * @param y Y Coord
     */
    public void touch(int x, int y) {
        System.err.println("App Controller###touch x = "+x +", y="+y) ;
        frame.touch(x, y) ; }

    /**
     * Display Current Screen
     */
    public void display() {
        System.err.println("App Controller###DISPLAY") ;
        frame.display() ;
    }

    /**
     * Execute Menu Bar Command
     * @param c Menu Bar Option (A, B, C, D or E)
     */
    public void execute( String c ) {
        System.err.println("AppController###EXECUTE command c = "+c);
        frame.cmd( c ) ;
    }

    /**
     * Navigate to Previous Screen
     */
    public void prev() {
        System.err.println("AppController###Previous");
        frame.previousScreen() ;
    }

    /**
     * Navigate to Next Screen
     */
    public void next() {
        System.err.println("AppController###Next");
        frame.nextScreen() ;
    }

    /**
     * Get Current Screen Name
     * @return Screen Name
     */
    public String screen() {
        System.err.println("AppController###Screen");
        return frame.screen() ;
    }

    /**
     * Get Current Screen Contents
     * @return Current Screen Contents
     */
    public String screenContents() {
        System.err.println("AppController###ScreenContents");
        return frame.contents() ;
    }

//    /** login */
//    public void login() {
//        frame.touch(1, 5);
//        frame.touch(2, 5);
//        frame.touch(3, 5);
//        frame.touch(1, 6);
//    }
}
