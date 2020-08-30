/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package starbucks ;

/** Rewards Screen */
public class Rewards extends Screen
{
    public Rewards()
    {
        this.addSubComponent(new TextDisplayScreen("Spacer", ""));
        this.addSubComponent(new TextDisplayScreen("", "Make Every"));
        this.addSubComponent(new TextDisplayScreen("", "Visit Count"));
    }

    /**
     * Get Class Name of Current Screen
     * @return Class Name of Current Screen
     */
    public String name() { return "Rewards" ;}

    /**
     * Send Touch Events to the Chain
     * According to requirements, do nothing
     * @param x Touch X Coord.
     * @param y Touch Y Coord.
     */
    public void touch(int x, int y) {
    }
}
