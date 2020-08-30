/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

/**
 * Frame Interface
 */
public interface IFrame
{
    /**
     * Return IScreenBundle
     * @return ScreenBundle
     */
    ScreenBundle getScreenBundle() ;

    /**
     * Set IScreenBundle
     * @param screenBundle Reference IScreenBundle
     */
    void setScreenBundle(ScreenBundle screenBundle) ;

    /**
     * Set Current Screen
     * @param s Reference to Screen
     */
    void setCurrentScreen( IScreen s ) ;

    /**
     * set Menu Items
     * @param keys List of key
     * @param commands List of IMenuCommand
     */
    void setMenuItems(String[] keys, IMenuCommand[] commands) ;

    /**
     * Set Menu Item
     * @param slot Slot Object
     * @param c    Command Object
     */
    void setMenuItem( String slot, IMenuCommand c ) ;

    /**
     * Send a Touch Event
     * @param x Screen X Coord
     * @param y Screen Y Coord
     */
    void touch(int x, int y) ;

    /**
     * Navigate to Previous Screen
     */
    void previousScreen() ;

    /**
     * Navigate to Next Screen
     */    
    void nextScreen() ;
    
    /**
     * Get Screen Name
     * @return Screen Name
     */
    String screen() ;

    /**
     * Return Contents of Current Screen
     * @return Contents for Display
     */
    String contents() ;

    /**
     * Display Screen to Terminal/Log
     */
    void display() ;

    /** Switch to Landscape Mode */
    void landscape() ;

    /**
     * Switch to Portrait Mode
     */
    void portrait() ;

    /**
     * Execute a Command: A, B, C, D or E
     * @param c Command to Execute
     */
    void cmd( String c ) ;

    /**
     * Select Menu/Command A
     */
    void selectA() ;

    /**
     * Select Menu/Command B
     */
    void selectB() ;

    /**
     * Select Menu/Command D
     */
    void selectC() ;

    /**
     * Select Menu/Command D
     */
    void selectD() ;

    /**
     * Select Menu/Command E
     */
    void selectE() ;
}


