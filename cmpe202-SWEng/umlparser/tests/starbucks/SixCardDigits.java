
/** For Card Digits State */
public class SixCardDigits implements IDigitsState
{
    ICardDigitsStateMachine machine ;

    /**
     * Constructor
     * @param  m Reference to State Machine
     */
    public SixCardDigits( ICardDigitsStateMachine m )
    {
        this.machine = m ;
    }

    /**
     * Backspace Event
     */
    public void backspace() {
        machine.setStateFiveCardDigits( null ) ;
    }

    /**
     * Digit Entry Event
     * @param digit Digit Value
     */
    public void number( String digit ) { machine.setStateSevenCardDigits( digit ) ;}

}
