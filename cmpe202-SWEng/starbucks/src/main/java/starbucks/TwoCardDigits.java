
package starbucks ;

/** For Card Digits State */
public class TwoCardDigits implements IDigitsState
{
    ICardDigitsStateMachine machine ;

    /**
     * Constructor
     * @param  m Reference to State Machine
     */
    public TwoCardDigits( ICardDigitsStateMachine m )
    {
        this.machine = m ;
    }

    /**
     * Backspace Event
     */
    public void backspace() {
        machine.setStateOneCardDigit( null );
    }

    /**
     * Digit Entry Event
     * @param digit Digit Value
     */
    public void number( String digit ) {
        machine.setStateThreeCardDigits( digit ) ;
    }

}
