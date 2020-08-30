/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package starbucks;

/** My Card More Options Screen */
public class MyCardsMoreOptions extends Screen
{
  
    public MyCardsMoreOptions()
    {
        this.addSubComponent(new TextDisplayScreen("Spacer", ""));
        this.addSubComponent(new TextDisplayScreen("", "Refresh"));
        this.addSubComponent(new TextDisplayScreen("", "Reload"));
        this.addSubComponent(new TextDisplayScreen("", "Auto Reload"));
        this.addSubComponent(new TextDisplayScreen("", "Transactions"));
    }

    /**
     * Get screen name according to requirement
     * @return screen name
     */
    public String name() {
        return "My Cards" ;
    }

    /**
     * Send Touch Events to the Chain
     * @param x Touch X Coord.
     * @param y Touch Y Coord.
     */
    public void touch(int x, int y) {
        // Do nothing here
        System.err.println( "MyCardsMoreOptions KeyPad touched at x= "+ x + ", y= "+ y);
    }
}
