/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

/** My Cards Screen */
public class MyCards extends ScreenLandScapeSupport
{

    public MyCards(TextDisplayScreen tds)
    {
        this.addSubComponent(new TextDisplayScreen("Spacer", ""));
        this.addSubComponent(new TextDisplayScreen("Spacer", ""));
        this.addSubComponent(tds);
        this.addSubComponent(new TextDisplayScreen("Spacer", ""));
        this.addSubComponent(new TextDisplayScreen("Spacer", ""));
    }

    /**
     * Get screen name according to requirement
     * @return screen name
     */
    public String name() { return "My Cards"; }

    /**
     * Send Touch Events to the Chain
     * @param x Touch X Coord.
     * @param y Touch Y Coord.
     */
    public void touch(int x, int y) {
        IFrame frame = screenBundle.getFrame() ;
        System.err.println( "KeyPad Touched at (" + x + ", " + y + ")" ) ;
        if ( x==3 && y==3 ) {
            if (currentStrategy.equals("portrait")){
                frame.setCurrentScreen(screenBundle.getMycardsPayScreen()) ;
            }
        }
        else if ( x==2 && y==4 ) {
            if (currentStrategy.equals("portrait")) {
                frame.setCurrentScreen(screenBundle.getOptionsScreen());
            }
        }
    }
}
