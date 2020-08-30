/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package starbucks ;

/** Store Screen */
public class Store extends Screen
{
    public Store()
    {
        this.addSubComponent(new TextDisplayScreen("", "         X"));
        this.addSubComponent(new TextDisplayScreen("", "   X"));
        this.addSubComponent(new TextDisplayScreen("", "       X"));
        this.addSubComponent(new TextDisplayScreen("", "      X"));
        this.addSubComponent(new TextDisplayScreen("", "  X"));
        this.addSubComponent(new TextDisplayScreen("", "           X"));
        this.addSubComponent(new TextDisplayScreen("", "  X"));
    }

    /**
     * Get Class Name of Current Screen
     * @return Class Name of Current Screen
     */
    public String name() {
        return "Find Store" ;
    }

    /**
     * Send Touch Events to the Chain
     * @param x Touch X Coord.
     * @param y Touch Y Coord.
     */
    public void touch(int x, int y) {
    }
}
