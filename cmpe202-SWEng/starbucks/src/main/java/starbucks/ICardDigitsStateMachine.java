
package starbucks ;

/** Card State Machine Interface */
public interface ICardDigitsStateMachine {
    /** Backspace Event */
    void backspace() ;

    /**
     * Number/Key Pressed Event
     * @param digit Key
     */
    void number( String digit ) ;

    /** Set Next State to No Card Digit State */
    void setStateNoCardDigits() ;

    /**
     * Set Next State to One Card Digit state
     * @param digit Card Digit So Far
     */
    void setStateOneCardDigit( String digit ) ;

    /**
     * Set Next State to Two Card Digit state
     * @param digit Card Digit So Far
     */
    void setStateTwoCardDigits( String digit ) ;

    /**
     * Set Next State to Three Card Digit state
     * @param digit Card Digit So Far
     */
    void setStateThreeCardDigits( String digit ) ;

    /**
     * Set Next State to Four Card Digit state
     * @param digit Card Digit So Far
     */
    void setStateFourCardDigits( String digit ) ;

    /**
     * Set Next State to Four Card Digit state
     * @param digit Card Digit So Far
     */
    void setStateFiveCardDigits( String digit ) ;

    /**
     * Set Next State to Four Card Digit state
     * @param digit Card Digit So Far
     */
    void setStateSixCardDigits( String digit ) ;

    /**
     * Set Next State to Four Card Digit state
     * @param digit Card Digit So Far
     */
    void setStateSevenCardDigits( String digit ) ;

    /**
     * Set Next State to Four Card Digit state
     * @param digit Card Digit So Far
     */
    void setStateEightCardDigits( String digit ) ;

    /**
     * Set Next State to Four Card Digit state
     * @param digit Card Digit So Far
     */
    void setStateNineCardDigits( String digit ) ;
}