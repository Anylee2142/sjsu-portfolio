/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

import java.util.Hashtable ;

/**
 * Add New Card Screen
 */
public class AddCard extends Screen
{
    private NineDigitsScreen screen9digits ;
    private ThreeDigitsScreen screen3digits ;
    private KeyPadRouter kpr ;
    private NineDigitsEntryMachine nineMachine ;
    private ThreeDigitsEntryMachine threeMachine ;

    public AddCard()
    {
        setUpKeyPadRouter();

        setUpComposite();

        setUpObserver();
    }

    /** set up keypad router */
    private void setUpKeyPadRouter() {
        this.screen9digits = new NineDigitsScreen() ;
        this.screen3digits = new ThreeDigitsScreen() ;
        Hashtable<String, IKeyPadRouterObserver> keyAndkeyPads = new Hashtable<String, IKeyPadRouterObserver>();
        // This also sets as observers of KeyPadRouter
        keyAndkeyPads.put("9digits", new KeyPad()) ;
        keyAndkeyPads.put("3digits", new KeyPad()) ;
        this.kpr = new KeyPadRouter() ;
        this.kpr.attachKeyPads(keyAndkeyPads);
        this.screen9digits.setKeyPadRouter( this.kpr ) ;
        this.screen3digits.setKeyPadRouter( this.kpr ) ;
    }

    /** set up composite */
    private void setUpComposite() {
        // setup the composite pattern
        this.addSubComponent(this.screen9digits) ;
        this.addSubComponent(this.screen3digits) ;
        this.addSubComponent(new TextDisplayScreen("Spacer", "")) ;
        this.addSubComponent(this.kpr) ;
    }

    /** set up observer */
    private void setUpObserver() {
        // setup the observer pattern
        this.nineMachine = new NineDigitsEntryMachine() ;
        this.threeMachine = new ThreeDigitsEntryMachine() ;
        this.nineMachine.setScreen9digits(this.screen9digits) ;
        this.threeMachine.setScreen3digits(this.screen3digits) ;
        KeyPad kp9digits = (KeyPad) this.kpr.getHashMapElement("9digits") ;
        KeyPad kp3digits = (KeyPad) this.kpr.getHashMapElement("3digits") ;
        // 1. Attach keypad and screen (9digits & 3digits)
        ((IKeyPadSubject) kp9digits).attach(this.screen9digits) ;
        ((IKeyPadSubject) kp3digits).attach(this.screen3digits) ;
        // 2. Attach keypad and EntryMachine (nm, tm)
        ((IKeyPadSubject) kp9digits).attach(this.nineMachine) ;
        ((IKeyPadSubject) kp3digits).attach(this.threeMachine) ;
    }

    public NineDigitsEntryMachine getNineMachine() {return nineMachine;}
    public ThreeDigitsEntryMachine getThreeMachine() {return threeMachine;}
    public NineDigitsScreen getScreen9digits() {return screen9digits;}
    public ThreeDigitsScreen getScreen3digits() {return screen3digits;}

    /**
     * Get Class Name of Current Screen
     * @return Class Name of Current Screen
     */
    public String name() {return "Add Card";}

    /** Return reference to KeyPadRouter
     * @return kpr Reference to KeyPadRouter
     * */
    public KeyPadRouter getKeyPadRouter() { return this.kpr; }
}
