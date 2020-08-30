
package starbucks ;

/** For Card Digits State */
public class FiveCardDigits implements IDigitsState
{
    ICardDigitsStateMachine machine ;

    /**
     * Constructor
     * @param  m Reference to State Machine
     */
    public FiveCardDigits( ICardDigitsStateMachine m )
    {
        this.machine = m ;
    }

    /**
     * Backspace Event
     */
    public void backspace() {
        machine.setStateFourCardDigits( null ) ;
    }

    /**
     * Digit Entry Event
     * @param digit Digit Value
     */
    public void number( String digit ) { machine.setStateSixCardDigits( digit ) ;}

}
