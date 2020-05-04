
/**
 * Digits State Interfaces
 */
public interface IDigitsState
{
    /** Backspace Event */
    void backspace() ;

    /**
     * Number Event
     * @param digit Digit/Key Pressed
     */
    void number( String digit ) ;
}
