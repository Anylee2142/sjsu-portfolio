/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

// TODO: Combine with NineDigitsEntryMachine? IDisplayComponent for screen?
/** Card Code Entry Machine - Context for State Pattern */
public class ThreeDigitsEntryMachine implements ICardDigitsStateMachine, IKeyPadObserver
{
    private ThreeDigitsScreen screen3digits ;

    /**
     * Get name of current state for unit testing
     * @return Class Name of Current State
     */
    public String getCurrentState()
    {
        return state.getClass().getName() ;
    }

    private int digitCount =0 ;

    // Card Digits machine states
    private NoCardDigits digits0;
    private OneCardDigit digits1;
    private TwoCardDigits digits2;
    private ThreeCardDigits digits3;

    // current state
    private IDigitsState state ;

    // pin captured so far
    private String d1, d2, d3 ;
    public String d1() { return d1 ; }
    public String d2() { return d2 ; }
    public String d3() { return d3 ; }

    /**
     * Set ThreeDigitsScreen
     * @param screen3digits_arg Reference to ThreeDigitsScreen
     */
    public void setScreen3digits(ThreeDigitsScreen screen3digits_arg) {
        this.screen3digits = screen3digits_arg;
    }

    /**
     * Constructor - Set Up State Objects
     * and Set Initial State to no card digits
     */
    public ThreeDigitsEntryMachine( )
    {
        digits0 = new NoCardDigits( this ) ;
        digits1 = new OneCardDigit( this ) ;
        digits2 = new TwoCardDigits( this ) ;
        digits3 = new ThreeCardDigits( this ) ;
        this.d1 = "" ;
        this.d2 = "" ;
        this.d3 = "" ;
        // Set initial state to 'No Digits'
        this.state = digits0;
    }

    /** Backspace Event */
    public void backspace() {
        this.state.backspace() ;
    }

    /**
     * Number Event
     * @param digit Digit Pressed
     */
    public void number( String digit ) {
        this.state.number( digit ) ;
    } // lead to setStateOne, Two, and so on

    /** Change the State to No Digit State */
    public void setStateNoCardDigits()
    {
        this.digitCount = 0 ;
        this.state = digits0;
        this.d1 = "" ;
        this.d2 = "" ;
        this.d3 = "" ;
        this.screen3digits.setValue(getValue());
        this.screen3digits.flushLastKey();
        debug() ;
    }

    /**
     * Change the State to One Digit
     * @param digit Digit/Number Enterred
     */
    public void setStateOneCardDigit( String digit )
    {
        this.digitCount = 1 ;
        this.state = digits1;
        if ( digit != null )
            this.d1 = digit ;
        else {
            this.d2 = "" ;
            this.d3 = "" ;
        }
        this.screen3digits.setValue(getValue());
        this.screen3digits.flushLastKey();
        debug() ;
    }

    /**
     * Change the State to Two Digits
     * @param digit Digit/Number Enterred
     */
    public void setStateTwoCardDigits( String digit )
    {
        this.digitCount = 2 ;
        this.state = digits2;
        if ( digit != null )
            this.d2 = digit ;
        else {
            this.d3 = "" ;
        }
        this.screen3digits.setValue(getValue());
        this.screen3digits.flushLastKey();
        debug() ;
    }

    /**
     * Change the State to Three Digits
     * @param digit Digit/Number Enterred
     */
    public void setStateThreeCardDigits( String digit )
    {
        this.digitCount = 3 ;
        this.state = digits3;
        if (digit != null) {
            this.d3 = digit ;
            System.err.println( "Three Digits Entry now hits full !" ) ;
            this.screen3digits.setValue(getValue());
            this.screen3digits.flushLastKey();
        }
        debug() ;
    }

    /**
     * Change the State to Four Digits
     * @param digit Digit/Number Enterred
     */
    public void setStateFourCardDigits( String digit ) { }

    /**
     * Do nothing
     * @param digit Digit/Number Enterred
     */
    public void setStateFiveCardDigits( String digit ) { }

    /**
     * Do nothing
     * @param digit Digit/Number Enterred
     */
    public void setStateSixCardDigits( String digit ) { }

    /**
     * Do nothing
     * @param digit Digit/Number Enterred
     */
    public void setStateSevenCardDigits( String digit ) { }

    /**
     * Do nothing
     * @param digit Digit/Number Enterred
     */
    public void setStateEightCardDigits( String digit ) { }

    /**
     * Do nothing
     * @param digit Digit/Number Enterred
     */
    public void setStateNineCardDigits( String digit ) { }

    /**
     * Get user input so far
     * @return d1 + d2 + d3
     * */
    public String getValue() {
        return d1 + d2 + d3 ;
    }

    /**
     * Observer of Key Events
     * @param c   Num Keys So Far
     * @param key Last Key Enterred
     */
    public void keyEventUpdate( int c, String key )
    {
        System.err.println( "Key: " + key + " Count: " + c ) ;
        if ( key.equals(" ") )
            /* nothing */ ;
        else if ( key.equals("X") )
            backspace() ;
        else
            number( key ) ;
    }

    /** Debug Dump to Stderr State Machine Changes */
    private void debug()
    {
        System.err.println( "Current State: " + state.getClass().getName() ) ;
        System.err.println( "Current Count: " + digitCount) ;
        System.err.println( "D1 = " + d1 ) ;
        System.err.println( "D2 = " + d2 ) ;
        System.err.println( "D3 = " + d3 ) ;

    }

}
