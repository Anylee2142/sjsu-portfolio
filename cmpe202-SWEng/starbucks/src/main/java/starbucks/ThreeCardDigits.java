
package starbucks ;

/** For Card Digits State */
public class ThreeCardDigits implements IDigitsState
{
    ICardDigitsStateMachine machine ;

    /**
     * Constructor
     * @param  m Reference to State Machine
     */
    public ThreeCardDigits( ICardDigitsStateMachine m )
    {
        this.machine = m ;
    }

    /**
     * Backspace Event
     */
    public void backspace() {
        machine.setStateTwoCardDigits( null ) ;
    }

    /**
     * Digit Entry Event
     * @param digit Digit Value
     */
    public void number( String digit ) {
        String interfaceName = this.machine.getClass().getSimpleName() ;

        // TOOD: is conditional processing necessary?
        if (interfaceName.equals("IThreeDigitsStateMachine")) {
            System.err.println( "Digit: " + digit ) ;
            return ;
        }
        machine.setStateFourCardDigits( digit ) ;
    }

}
