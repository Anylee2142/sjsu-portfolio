
/** For Card Digits State */
public class NineCardDigits implements IDigitsState
{
    ICardDigitsStateMachine machine ;

    /**
     * Constructor
     * @param  m Reference to State Machine
     */
    public NineCardDigits( ICardDigitsStateMachine m )
    {
        this.machine = m ;
    }

    /**
     * Backspace Event
     */
    public void backspace() {
        machine.setStateEightCardDigits( null ) ;
    }

    /**
     * Digit Entry Event
     * @param digit Digit Value
     */
    public void number( String digit ) {
        System.err.println( "Digit: " + digit ) ;
//        ((NineDigitsEntryMachine)machine).pushLeft(digit);
        return ;
    }

}
