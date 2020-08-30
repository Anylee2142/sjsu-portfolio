/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package starbucks ;

import javax.xml.soap.Text;
import java.text.NumberFormat;

/** Text Screen Component*/
public class TextDisplayScreen implements IDisplayComponent, ITouchEventHandler {
    ITouchEventHandler nextHandler ;

    /**
     * @return [description]
     */
    private Card card = null ;
    // TODO: ENUM FOR SCREEN NAME
    private String screenName = "";
    private String screenValue = "";

    public TextDisplayScreen(String screenName, String screenValue) {
        this.screenName = screenName ;
        this.screenValue = screenValue ;
    }

    public void setCard(Card newCard) {
        this.card = newCard ;
    }

    /**
     * Display text screen according to its display screen (e.g. MyCards, MyCardsPay etc)
     * @return display string
     * */
    public String display() {
        if (screenName.equals("MyCards")) { return displayMyCards(); }
        if (screenName.equals("MyCardsPay")) { return displayMyCardsPay(); }
        if (screenName.equals("Spacer")) { return "" ;}
        return displayText();
    }
    /**
     * MyCards
     * @return display string
     * */
    private String displayMyCards() {
        NumberFormat formatter = NumberFormat.getCurrencyInstance();
        float currentBalance = 0;
        if (card != null) { currentBalance = card.getBalance(); }
        String formatOutput = formatter.format(currentBalance);
        return formatOutput;
    }

    /**
     * MyCardsPay
     * @return display string
     * */
    private String displayMyCardsPay() {
        String cardNumber = "000000000";
        if (card != null) { cardNumber = card.getCardNumber() ;}
        cardNumber = cardNumber.replaceAll(" ", "");
        return "[" + cardNumber +"]";
    }

    /**
     * MyCardsPay
     * @return display string
     * */
    private String displayText() {
        return screenValue ;
    }

    /**
     * Add Sub Component. -- Not used.
     * @param c Component.
     */
    public void addSubComponent( IDisplayComponent c ) {
        System.err.println( "Add Sub Component: " + c ) ;
    }

    /**
     * Handle Touch Event -- Pass on to next in the chain
     * @param x Touch X
     * @param y Touch Y
     */
    public void touch(int x, int y) {
        if ( nextHandler != null )
            nextHandler.touch(x, y) ;
    }

    /**
     * Set Next Handler in the Chain
     * @param next Handler Object for Touch Events
     */
    public void setNext( ITouchEventHandler next) {
        nextHandler = next ;
    }

}
