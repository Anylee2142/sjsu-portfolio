/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package starbucks ;

/** Payments Screen */
public class Payments extends Screen
{
    public Payments()
    {
        this.addSubComponent(new TextDisplayScreen("Spacer", ""));
        this.addSubComponent(new TextDisplayScreen("Spacer", ""));
        this.addSubComponent(new TextDisplayScreen("", "Find Store"));
        this.addSubComponent(new TextDisplayScreen("", "Enable Payments"));
    }

    /**
     * Get Class Name of Current Screen
     * @return Class Name of Current Screen
     */
    public String name()  {
        return "Payments" ;
    }

    /**
     * Send Touch Events to the Chain
     * According to requirements, do nothing
     * @param x Touch X Coord.
     * @param y Touch Y Coord.
     */
    public void touch(int x, int y) {
    }
}
