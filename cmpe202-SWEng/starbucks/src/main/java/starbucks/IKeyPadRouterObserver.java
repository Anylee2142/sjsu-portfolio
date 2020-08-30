/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package starbucks ;

/**
 * Key Pad Router Observer Interface
 */
public interface IKeyPadRouterObserver
{
    /**
     * Key Event to Notify Observers
     * @param isFocused Should this observer be activated?
     */
    void focusUpdate(boolean isFocused) ;
}
