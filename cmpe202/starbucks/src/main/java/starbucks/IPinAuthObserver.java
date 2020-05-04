/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package starbucks ;

/** Pin Auth Observer Interface */
public interface IPinAuthObserver
{
    /**
     * Auth Event
     * @param isFail Whether authentication goes fail or not
     */
    void authEvent(boolean isFail) ;
}