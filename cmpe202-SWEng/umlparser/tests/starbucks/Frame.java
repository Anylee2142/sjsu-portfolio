/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

/**
 * Frame Class -- Container for Screens
 */
public class Frame implements IFrame
{
    private IScreen current ;
    private IMenuInvoker menuA = new MenuOption() ;
    private IMenuInvoker menuB = new MenuOption() ;
    private IMenuInvoker menuC = new MenuOption() ;
    private IMenuInvoker menuD = new MenuOption() ;
    private IMenuInvoker menuE = new MenuOption() ;
    private IOrientationStrategy portraitStrategy ;
    private IOrientationStrategy landscapeStrategy ;
    private IOrientationStrategy currentStrategy ;
    private ScreenBundle screenBundle = null;

    /**
     * Return Screen Name
     * @return Screen Name
     */
    public String screen() { return current.name() ; }

    /** Switch to Landscape Strategy */
    public void landscape() {
        String currentClassName = ((ScreenDecorator)current).getScreen().getClass().getSimpleName() ;
        if (currentClassName.equals("MyCards") || currentClassName.equals("MyCardsPay")) {
            currentStrategy = landscapeStrategy ;
            ((MyCards)this.screenBundle.getMyCards()).setCurrentStrategy("landscape");
            ((MyCardsPay)this.screenBundle.getMyCardsPay()).setCurrentStrategy("landscape"); ;
        }
    }

    /** Switch to Portrait Strategy */
    public void portrait()  {
        currentStrategy = portraitStrategy ;
        ((MyCards)this.screenBundle.getMyCards()).setCurrentStrategy("portrait");
        ((MyCardsPay)this.screenBundle.getMyCardsPay()).setCurrentStrategy("portrait");
    }

    /** Nav to Previous Screen */
    public void previousScreen() {
        String currentClassName = ((ScreenDecorator)current).getScreen().getClass().getSimpleName() ;
        if (currentClassName.equals("AddCard")) { setCurrentScreen(this.screenBundle.getSettingsScreen()); }
    }

    /** Nav to Next Screen */
    public void nextScreen() {
        String currentClassName = ((ScreenDecorator)current).getScreen().getClass().getSimpleName() ;
        if (currentClassName.equals("AddCard")) {
            AddCard addCard = (AddCard) this.screenBundle.getAddCard();
            NineDigitsEntryMachine nineMachine = addCard.getNineMachine() ;
            ThreeDigitsEntryMachine threeMachine = addCard.getThreeMachine() ;
            NineDigitsScreen nineScreen = addCard.getScreen9digits() ;
            ThreeDigitsScreen threeScreen = addCard.getScreen3digits();

            if (nineMachine.getCurrentState().equals("starbucks.NineCardDigits")
                    && threeMachine.getCurrentState().equals("starbucks.ThreeCardDigits")
                    && !nineMachine.getValue().equals("000000000")) {
                Card newCard = new Card(nineMachine.getValue(), (float)20.0);
                ((TextDisplayScreen) screenBundle.getMycardsTds()).setCard(newCard);
                ((TextDisplayScreen) screenBundle.getMycardsPayTds()).setCard(newCard);
                ((MyCardsPay) screenBundle.getMyCardsPay()).setCard(newCard);
                setCurrentScreen(screenBundle.getMycardsScreen());
            }  else {
                nineMachine.setStateNoCardDigits(); threeMachine.setStateNoCardDigits();
                nineScreen.flushValueAndLastKey(); threeScreen.flushValueAndLastKey();
            }
        }
    }

    /**
     * Initialize portrait strategy
     * @return reference to portrait strategy
     * */
    private IOrientationStrategy initPortraitStrategy() {
        IOrientationStrategy portrait = new IOrientationStrategy() {
            /**
             * Display Screen Contents
             * @param s Reference to Screen
             */
            public void display(IScreen s)
            {
                System.out.println( contents(s) ) ;
            }

            /**
             * Return String / Lines for Frame and Screen
             * @param  s [description]
             * @return   [description]
             */
            public String contents(IScreen s) {
                String out = "===============\n" + s.name() + "\n" + "===============\n";
                out += StringUtils.padLines( (10 - StringUtils.countLines( s.display() + "\n" )) / 2 ) + s.display() + "\n";
                out += StringUtils.padLines( 13 - StringUtils.countLines( out ) ) + "===============\n" + "[A][B][C][D][E]\n";
                StringUtils.dumpLines( out ) ;
                return out ;
            }
            /** Select Command A */
            public void selectA() { menuA.invoke() ; }
            /** Select Command B */
            public void selectB() { menuB.invoke() ; }
            /** Select Command C */
            public void selectC() { menuC.invoke() ; }
            /** Select Command D */
            public void selectD() { menuD.invoke() ; }
            /** Select Command E */
            public void selectE() { menuE.invoke() ; }
        } ;
        return portrait ;
    }

    /**
     * Initialize landscape strategy
     * @return reference to landscape strategy
     * */
    private IOrientationStrategy initLandScapeStrategy() {
        IOrientationStrategy landscape = new IOrientationStrategy() {
            /**
             * Display Screen Contents
             * @param s Reference to Screen
             */
            public void display(IScreen s)
            {
                System.out.println( contents(s) ) ;
            }
            /**
             * Display Contents of Frame + Screen
             * @param  s Screen to Display
             * @return   Contents for Screen
             */
            public String contents(IScreen s) {
                String out = "" ;
                out += "================================\n" ;
                out += s.name() + "\n" ;
                out += "================================\n" ;
                out += s.display() + "\n"  ;
                out += "================================\n" ;
                StringUtils.dumpLines( out ) ;
                return out ;
            }
            /** Don't Respond in Landscaope Mode */
            public void selectA() {  }
            /** Don't Respond in Landscaope Mode */
            public void selectB() {  }
            /** Don't Respond in Landscaope Mode */
            public void selectC() {  }
            /** Don't Respond in Landscaope Mode */
            public void selectD() {  }
            /** Don't Respond in Landscaope Mode */
            public void selectE() {  }
        } ;
        return landscape;
    }

    /** Constructor */
    public Frame(IScreen initial)
    {
        current = initial ;
        portraitStrategy = initPortraitStrategy() ;
        landscapeStrategy = initLandScapeStrategy();

        /* set default layout strategy */
        currentStrategy = portraitStrategy ;
    }

    public void setScreenBundle(ScreenBundle screenBundle) {
        this.screenBundle = screenBundle ;
    }

    /**
     * Return screen bundle
     * @return IScreenBundle
     */
    public ScreenBundle getScreenBundle() {
        return screenBundle;
    }

    /**
     * Change the Current Screen
     * @param s Screen Object
     */
    public void setCurrentScreen( IScreen s )
    {
        current = s ;
    }

    /**
     * set Menu Items
     * @param keys List of key
     * @param commands List of IMenuCommand
     */
    public void setMenuItems(String[] keys, IMenuCommand[] commands) {
        for(int i=0; i<keys.length; i++) {
            setMenuItem(keys[i], commands[i]);
        }
    }

    /**
     * Configure Selections for Command Pattern 
     * @param slot A, B, ... E
     * @param c    Command Object
     */
    public void setMenuItem( String slot, IMenuCommand c )
    {
        if ( "A".equals(slot) ) { menuA.setCommand(c) ;  }
        if ( "B".equals(slot) ) { menuB.setCommand(c) ; }
        if ( "C".equals(slot) ) { menuC.setCommand(c) ; }
        if ( "D".equals(slot) ) { menuD.setCommand(c) ; } 
        if ( "E".equals(slot) ) { menuE.setCommand(c) ; }   
    }

    /** 
     * Send Touch Event
     * @param x X Coord
     * @param y Y Coord
     */
    public void touch(int x, int y)
    {
        if ( current != null ) current.touch(x,y) ;
    }

    /**
     * Get Contents of the Frame + Screen 
     * @return Frame + Screen Contents
     */
    public String contents() 
    { 
        if ( current != null ) { return currentStrategy.contents( current ) ; }
        else { return "" ; }
    }

    /** Display Contents of Frame + Screen */
    public void display()
    {
        if ( current != null ) { currentStrategy.display( current ) ; }
    }
 
    /**
     *  Execute a Command 
     * @param c Command
     */
    public void cmd( String c ) 
    {
        if ( "A".equals(c) ) { selectA() ; }
        if ( "B".equals(c) ) { selectB() ; }
        if ( "C".equals(c) ) { selectC() ; }
        if ( "D".equals(c) ) { selectD() ; }        
        if ( "E".equals(c) ) { selectE() ; }        
    }

    /** Select Command A */
    public void selectA() { currentStrategy.selectA() ;  }
    /** Select Command B */
    public void selectB() { currentStrategy.selectB() ;  }
    /** Select Command C */
    public void selectC() { currentStrategy.selectC() ;  }
    /** Select Command D */
    public void selectD() { currentStrategy.selectD() ;  }
    /** Select Command E */
    public void selectE() { currentStrategy.selectE() ;  }

}
