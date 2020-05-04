/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package starbucks ;


import java.util.Hashtable;

/** Key Pad Router Subject Interface */
public interface IKeyPadRouterSubject
{
    /**
     * Add Observer to Subscribers List
     * @param obj HashTable for Observer
     */
    void attachKeyPads(Hashtable<String, IKeyPadRouterObserver> obj ) ;

    /**
     * Remove Observer from Subscription
     * @param key key for Observer
     */
    void removeKeyPad(String key) ;

    /**
     * Trigger Events to Observers
     * @param keyPad key for KeyPad Observer
     */
    void notifyFocus(String keyPad) ;
}
