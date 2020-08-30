
package starbucks ;

/** For Card Digits State */
public class NoCardDigits implements IDigitsState
{
    ICardDigitsStateMachine machine ;

    /**
     * Constructor
     * @param  m Reference to State Machine
     */
    public NoCardDigits( ICardDigitsStateMachine m )
    {
        this.machine = m ;
    }

    /**
     * Backspace Event
     */
    public void backspace() {
    }

    /**
     * Digit Entry Event
     * @param digit Digit Value
     */
    public void number( String digit ) {
        machine.setStateOneCardDigit( digit ) ;
    }

}
