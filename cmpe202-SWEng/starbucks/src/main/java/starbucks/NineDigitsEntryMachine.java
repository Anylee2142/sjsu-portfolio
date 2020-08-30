/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package starbucks ;

/** Card Number Entry Machine - Context for State Pattern */
public class NineDigitsEntryMachine implements ICardDigitsStateMachine, IKeyPadObserver
{
    private NineDigitsScreen screen9digits ;

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
    private FourCardDigits digits4;
    private FiveCardDigits digits5;
    private SixCardDigits digits6;
    private SevenCardDigits digits7;
    private EightCardDigits digits8;
    private NineCardDigits digits9;

    // current state
    private IDigitsState state ;

    // pin captured so far
    private String d1="", d2="", d3="", d4="", d5="", d6="", d7="", d8="", d9="" ;
    public String d1() { return d1 ; }
    public String d2() { return d2 ; }
    public String d3() { return d3 ; }
    public String d4() { return d4 ; }
    public String d5() { return d5 ; }
    public String d6() { return d6 ; }
    public String d7() { return d7 ; }
    public String d8() { return d8 ; }
    public String d9() { return d9 ; }

    /**
     * Set NineDigitsScreen
     * @param screen9digits_arg Reference to NineDigitsScreen
     */
    public void setScreen9digits(NineDigitsScreen screen9digits_arg) {
        this.screen9digits = screen9digits_arg;
    }

    /**
     * Constructor - Set Up State Objects
     * and Set Initial State to no card digits
     */
    public NineDigitsEntryMachine( )
    {
        digits0 = new NoCardDigits( this ) ;
        digits1 = new OneCardDigit( this ) ;
        digits2 = new TwoCardDigits( this ) ;
        digits3 = new ThreeCardDigits( this ) ;
        digits4 = new FourCardDigits( this ) ;
        digits5 = new FiveCardDigits( this ) ;
        digits6 = new SixCardDigits( this ) ;
        digits7 = new SevenCardDigits( this ) ;
        digits8 = new EightCardDigits( this ) ;
        digits9 = new NineCardDigits( this ) ;
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
        this.d4 = "" ;
        this.d5 = "" ;
        this.d6 = "" ;
        this.d7 = "" ;
        this.d8 = "" ;
        this.d9 = "" ;
        this.screen9digits.setValue(getValue());
        this.screen9digits.flushLastKey();
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
        if ( digit != null ) this.d1 = digit ;
        else { this.d2 = "" ;this.d3 = "" ;this.d4 = "" ;this.d5 = "" ;this.d6 = "" ;this.d7 = "" ;this.d8 = "" ;this.d9 = "" ; }
        this.screen9digits.setValue(getValue());
        this.screen9digits.flushLastKey();
        debug() ; }

    /**
     * Change the State to Two Digits
     * @param digit Digit/Number Enterred
     */
    public void setStateTwoCardDigits( String digit )
    {
        this.digitCount = 2 ;
        this.state = digits2;
        if ( digit != null ) this.d2 = digit ;
        else { this.d3 = "" ;this.d4 = "" ;this.d5 = "" ;this.d6 = "" ; this.d7 = "" ; this.d8 = "" ; this.d9 = "" ; }
        this.screen9digits.setValue(getValue());
        this.screen9digits.flushLastKey();
        debug() ; }

    /**
     * Change the State to Three Digits
     * @param digit Digit/Number Enterred
     */
    public void setStateThreeCardDigits( String digit )
    {
        this.digitCount = 3 ;
        this.state = digits3;
        if ( digit != null ) this.d3 = digit ;
        else { this.d4 = "" ; this.d5 = "" ; this.d6 = "" ;this.d7 = "" ;this.d8 = "" ;this.d9 = "" ; }
        this.screen9digits.setValue(getValue());
        this.screen9digits.flushLastKey();
        debug() ; }

    /**
     * Change the State to Four Digits
     * @param digit Digit/Number Enterred
     */
    public void setStateFourCardDigits( String digit ) {
        this.digitCount = 4 ;
        this.state = digits4;
        if ( digit != null ) this.d4 = digit ;
        else { this.d5 = "" ;this.d6 = "" ;this.d7 = "" ;this.d8 = "" ;this.d9 = "" ; }
        this.screen9digits.setValue(getValue());
        this.screen9digits.flushLastKey();
        debug() ; }

    /**
     * Change the State to Five Digits
     * @param digit Digit/Number Enterred
     */
    public void setStateFiveCardDigits( String digit ) {
        this.digitCount = 5 ;
        this.state = digits5;
        if ( digit != null ) this.d5 = digit ;
        else { this.d6 = "" ; this.d7 = "" ; this.d8 = "" ; this.d9 = "" ; }
        this.screen9digits.setValue(getValue());
        this.screen9digits.flushLastKey();
        debug() ; }

    /**
     * Change the State to Six Digits
     * @param digit Digit/Number Enterred
     */
    public void setStateSixCardDigits( String digit ) {
        this.digitCount = 6 ;
        this.state = digits6;
        if ( digit != null ) this.d6 = digit ;
        else { this.d7 = "" ; this.d8 = "" ; this.d9 = "" ; }
        this.screen9digits.setValue(getValue());
        this.screen9digits.flushLastKey();
        debug() ; }

    /**
     * Change the State to Seven Digits
     * @param digit Digit/Number Enterred
     */
    public void setStateSevenCardDigits( String digit ) {
        this.digitCount = 7 ;
        this.state = digits7;
        if ( digit != null ) this.d7 = digit ;
        else { this.d8 = "" ; this.d9 = "" ; }
        this.screen9digits.setValue(getValue());
        this.screen9digits.flushLastKey();
        debug() ; }

    /**
     * Change the State to Eight Digits
     * @param digit Digit/Number Enterred
     */
    public void setStateEightCardDigits( String digit ) {
        this.digitCount = 8 ;
        this.state = digits8;
        if ( digit != null ) this.d8 = digit ;
        else { this.d9 = "" ; }
        this.screen9digits.setValue(getValue());
        this.screen9digits.flushLastKey();
        debug() ; }

    /**
     * Change the State to Nine Digits
     * @param digit Digit/Number Enterred
     */
    public void setStateNineCardDigits( String digit ) {
        this.digitCount = 9 ;
        this.state = digits9;
        if (digit != null) {
            this.d9 = digit ;
            System.err.println( "Nine Digits Entry now hits full !" ) ;
            this.screen9digits.setValue(getValue());
            this.screen9digits.flushLastKey(); }
        debug() ; }

    /**
     * User input so far
     * @return d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9
     * */
    public String getValue() {
        return d1 + d2 + d3 + d4 + d5 + d6 + d7 + d8 + d9;
    }

    /**
     * Observer of Key Events
     * @param c   Num Keys So Far
     * @param key Last Key Enterred
     */
    public void keyEventUpdate( int c, String key ) {
        System.err.println( "Key: " + key + " Count: " + c ) ;
        if ( key.equals(" ") ) ;
        else if ( key.equals("X") ) backspace() ;
        else number( key ) ; }

    /** Debug Dump to Stderr State Machine Changes */
    private void debug() {
        System.err.println( "Current State: " + state.getClass().getName() ) ;
        System.err.println( "Current Count: " + digitCount) ;
        System.err.println(" Current String = "+getValue());
    }
}
