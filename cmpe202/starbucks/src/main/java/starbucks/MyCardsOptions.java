/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package starbucks;

/** My Card Options Screen */
public class MyCardsOptions extends Screen
{
    public MyCardsOptions()
    {
        this.addSubComponent(new TextDisplayScreen("Spacer", ""));
        this.addSubComponent(new TextDisplayScreen("", "Reload"));
        this.addSubComponent(new TextDisplayScreen("", "Refresh"));
        this.addSubComponent(new TextDisplayScreen("", "More Options"));
        this.addSubComponent(new TextDisplayScreen("", "Cancel"));
    }

    /**
     * Get screen name according to requirement
     * @return screen name
     */
    public String name() {
        return "My Cards" ;
    }

    /**
     * Condition checker
     * @param x coordinate
     * @param y coordinate
     * @return True or False
     * */
    private boolean isMoreOptions(int x, int y) {
        return ( (x==1 && y==7) || (x==2 && y==7) || (x==3 && y==7) );
    }

    /**
     * Send Touch Events to the Chain
     * @param x Touch X Coord.
     * @param y Touch Y Coord.
     */
    public void touch(int x, int y) {
        IFrame frame = screenBundle.getFrame() ;
        System.err.println( "KeyPad Touched at (" + x + ", " + y + ")" ) ;
        if (isMoreOptions(x, y)) {
            frame.setCurrentScreen(screenBundle.getMoreOptionsScreen() ) ;
        }

    }
}
