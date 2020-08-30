/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package starbucks;

/** Settings Screen */
public class Settings extends Screen
{
    public Settings()
    {
        this.addSubComponent(new TextDisplayScreen("", "Add Card"));
        this.addSubComponent(new TextDisplayScreen("", "Delete Card"));
        this.addSubComponent(new TextDisplayScreen("", "Billing"));
        this.addSubComponent(new TextDisplayScreen("", "Passcode"));
        this.addSubComponent(new TextDisplayScreen("Spacer", ""));
        this.addSubComponent(new TextDisplayScreen("", "About|Terms"));
        this.addSubComponent(new TextDisplayScreen("", "Help"));
    }

    /**
     * Get Class Name of Current Screen
     * @return Class Name of Current Screen
     */
    public String name() { return "Settings"; }

    /**
     * Condition checker
     * @param x coordinate
     * @param y coordinate
     * @return True or False
     * */
    private boolean isAddCard(int x, int y) {
        return ( ( x==1 && y==1 ) || ( x==2 && y==1 ) || ( x==3 && y==1 ) );
    }

    /**
     * Send Touch Events to the Chain
     * @param x Touch X Coord.
     * @param y Touch Y Coord.
     */
    public void touch(int x, int y) {
        IFrame frame = screenBundle.getFrame() ;
        System.err.println( "KeyPad Touched at (" + x + ", " + y + ")" ) ;
        if (isAddCard(x, y)) {
            IScreen addcard = screenBundle.getAddCard() ;
            // Focus to nine digits
            ((AddCard) addcard).getKeyPadRouter().setCurrentKeyPad("9digits");

            // Flush former inputs
            ((AddCard) addcard).getNineMachine().setStateNoCardDigits();
            ((AddCard) addcard).getThreeMachine().setStateNoCardDigits();
            ((AddCard) addcard).getScreen9digits().flushValueAndLastKey();
            ((AddCard) addcard).getScreen3digits().flushValueAndLastKey();

            frame.setCurrentScreen(screenBundle.getAddcardScreen() ) ;
        }
    }
}
