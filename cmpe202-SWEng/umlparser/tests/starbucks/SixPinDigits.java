/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

/** For Pin Digits State */
public class SixPinDigits implements IPinState
{
    IPinStateMachine machine ;

    /**
     * Constructor
     * @param  m Reference to State Machine
     */
    public SixPinDigits( IPinStateMachine m )
    {
        this.machine = m ;
    }

    /** Backspace Event */
    public void backspace() {
        machine.setStateFivePinDigits( null ); ;
    }

    /**
     * Number Event
     * @param digit Digit pressed
     */
    public void number( String digit ) {
        System.err.println( "Digit: " + digit ) ;
        return ;
    }

    /** Valid Pin Event */
    public void validPin() {
        return ;
    }

    /** Invlid Pin Event */
    public void invalidPin() {
        machine.setStateNoPinDigits() ;
    }

}
