/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

/** My Card Pay Screen */
public class MyCardsPay extends ScreenLandScapeSupport
{
    private Card card = null;

    public MyCardsPay(TextDisplayScreen tds)
    {
        this.addSubComponent(new TextDisplayScreen("Spacer", ""));
        this.addSubComponent(tds);
        this.addSubComponent(new TextDisplayScreen("Spacer", ""));
        this.addSubComponent(new TextDisplayScreen("Spacer", ""));
        this.addSubComponent(new TextDisplayScreen("", "Scan Now"));
    }

    /**
     * Set Card object
     * @param card Reference to Card
     */
    public void setCard(Card card) { this.card = card ; }

    /**
     * Get Card object
     * @return card
     * */
    public Card getCard() { return this.card ; }

    /**
     * Get screen name according to requirement
     * @return screen name
     */
    public String name() {
        return "My Cards" ;
    }

    /**
     * Check if x and y are valid coordinates for KeyPad
     * @param x X Coord
     * @param y Y Coord
     * @return True or False
     * */
    private boolean isMyCards(int x, int y) {
        return ((x==3 && y==3) && (currentStrategy.equals("portrait")));
    }

    /**
     * Check if x and y are valid coordinates for KeyPad
     * @param x X Coord
     * @param y Y Coord
     * @return True or False
     * */
    private boolean isPay(int x, int y) {
        return ((( x==2 && y==2 ) || (x==3 && y==2 )) && (currentStrategy.equals("portrait")));
    }

    /**
     * Send Touch Events to the Chain
     * @param x Touch X Coord.
     * @param y Touch Y Coord.
     */
    public void touch(int x, int y) {
        ScreenBundle screenBundle = this.getScreenBundle();
        IFrame frame = screenBundle.getFrame() ;
        System.err.println( "KeyPad Touched at (" + x + ", " + y + ")" ) ;
        if (isMyCards(x, y)) frame.setCurrentScreen(screenBundle.getMycardsScreen()) ;
        else if (isPay(x, y)) card.payCard();
    }
}

