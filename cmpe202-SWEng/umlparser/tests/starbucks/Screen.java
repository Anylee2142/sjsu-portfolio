/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

import java.util.* ;

/**
 * Base Class for Screens.
 * 
 * Provides Common Functionality
 * For Setting Up the Composite and 
 * Chain of Responsibility Patterns.
 * 
 */
public class Screen implements IScreen, IDisplayComponent
{
    /** Display Components */
    private ArrayList<IDisplayComponent> components = new ArrayList<IDisplayComponent>() ;

    /** Front of Event Chain */
    private ITouchEventHandler chain ;

    protected ScreenBundle screenBundle = null ;

    /** Constructor */
    public Screen()
    {
    }

    /**
     * Send Touch Events to the Chain
     * @param x Touch X Coord.
     * @param y Touch Y Coord.
     */
    public void touch(int x, int y) {
        chain.touch(x, y) ;
    }
    
    /** Next Screen - Not Used */
    public void next() {
        // add code here
    }
    
    /** Previous Screen - Not Used */
    public void prev()  {
        // add code here
    }
        
    /**
     * Set Next Screen - Not Used 
     * @param s Next Screen Object
     * @param n Next Screen Label
     */
    public void setNext(IScreen s, String n )  {
        // add code here
    }
    
    /**
     * Send Previous Screen - Not Used
     * @param s Previous Screen Object
     * @param n Previous Screen Label
     */
    public void setPrev(IScreen s, String n )  {
        // add code here
    }    

    /**
     * Add Display Component to Screen
     * @param c Display Component
     */
    public void addSubComponent( IDisplayComponent c )
    {
        components.add( c ) ;
        if (components.size() == 1 )
        {
            chain = (ITouchEventHandler) c ;
        }
        else
        {
            ITouchEventHandler prev = (ITouchEventHandler) components.get(components.size()-2) ;
            System.err.println("\t\t\tPREV = " + prev);
            prev.setNext( (ITouchEventHandler) c ) ;
        }
    }
    
    /**
     * Get Display Contents
     * @return Display Contents
     */
    public String display() { 
        StringBuffer buf = new StringBuffer();
        for (IDisplayComponent c : components )
        {
            System.err.println( "Screen: " + c.getClass().getName() ) ;
            buf.append(c.display() + "\n");
        }
        return buf.toString() ;
    }

    /**
     * Get Class Name of Current Screen
     * @return Class Name of Current Screen
     */
    public String name() {
        return (this.getClass().getName()).split("\\.")[1] ;
    }

    /**
     * Set ScreenBundle
     * @param screenBundle Reference to ScreenBundle
     */
    public void setScreenBundle(ScreenBundle screenBundle) {
        this.screenBundle = screenBundle ;
    }

    /**
     * Get ScreenBundle
     * @return ScreenBundle
     * */
    public ScreenBundle getScreenBundle() { return this.screenBundle; }
}
