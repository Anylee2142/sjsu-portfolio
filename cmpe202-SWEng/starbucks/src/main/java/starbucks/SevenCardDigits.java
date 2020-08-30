
package starbucks ;

/** For Card Digits State */
public class SevenCardDigits implements IDigitsState
{
    ICardDigitsStateMachine machine ;

    /**
     * Constructor
     * @param  m Reference to State Machine
     */
    public SevenCardDigits( ICardDigitsStateMachine m )
    {
        this.machine = m ;
    }

    /**
     * Backspace Event
     */
    public void backspace() {
        machine.setStateSixCardDigits( null ) ;
    }

    /**
     * Digit Entry Event
     * @param digit Digit Value
     */
    public void number( String digit ) { machine.setStateEightCardDigits( digit ) ;}

}
