/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

/** For Pin Digits State */
public class FivePinDigits implements IPinState
{
    IPinStateMachine machine ;

    /**
     * Constructor
     * @param  m Reference to State Machine
     */
    public FivePinDigits( IPinStateMachine m )
    {
        this.machine = m ;
    }

    /** Backspace Event */
    public void backspace() {
        machine.setStateFourPinDigits( null ) ;
    }

    /**
     * Number Event
     * @param digit Digit pressed
     */
    public void number( String digit ) {
        machine.setStateSixPinDigits( digit ); ;
    }

    /** Valid Pin Event */
    public void validPin() {

    }

    /** Invlid Pin Event */
    public void invalidPin() {

    }

}
