
package starbucks ;

/** Screen for Card Number, which takes 9 digits */
public class NineDigitsScreen implements ITouchEventHandler, IDisplayComponent, IKeyPadObserver
{
    ITouchEventHandler nextHandler ;
    private int count = 0;

    // TODO: lastkey and value at NineDigitsEntryMachine?
    private String lastKey = "" ;
    private String value = "" ;

    private KeyPadRouter kpr = null ;
    private boolean isFocused = true ;

    /**
     * Set KeyPadRouter
     * @param keyPadRouterArgument Reference to KeyPadRouter
     */
    public void setKeyPadRouter(KeyPadRouter keyPadRouterArgument) {
        this.kpr = keyPadRouterArgument ;
    }

    /**
     * Set user input to this screen
     * @param valueArgument Reference to KeyPadRouter
     */
    public void setValue(String valueArgument) {
        this.value = valueArgument ;
    }

    /** Flush lastKey */
    // TODO: flush last key at NineDigitsEntryMachine?
    public void flushLastKey() {
        this.lastKey = "" ;
    }

    /** Flush value and lastKey */
    public void flushValueAndLastKey() {
        this.value = "" ;
        this.lastKey = "" ;
    }

    /**
     * Condition checker
     * @param x coordinate
     * @param y coordinate
     * @return True or False
     * */
    private boolean isTouched(int x, int y) {
        return ( (x==1 && y==2) || (x==2 && y==2) || (x==3 && y==2) );
    }

    /**
     * Send Touch Events to the Chain
     * @param x Touch X Coord.
     * @param y Touch Y Coord.
     */
    public void touch(int x, int y)
    {
        System.err.println("!!!!!!!!!!!!!! 9 SCREEN !!!!!!!!!!!!!!!!!!!!") ;
        if ( x==2 && y==3 ) // Only (2,3) is for 3-digit screen
        {
            this.isFocused = false ;
            lastKey = "";
            System.err.println("!!!!!!!!!!!!!!" + isFocused + "!!!!!!!!!!!!!!!!") ;
        }

        if (isTouched(x, y)) // (1,2), (2,2) or (3,2) are for 9-digit screen
        {
            System.err.println( "Card Number Screen Touched at (" + x + ", " + y + ")" ) ;
            this.kpr.setCurrentKeyPad( "9digits" ) ;
            this.isFocused = true ;
        }
        else
        {
            if ( nextHandler != null )
                nextHandler.touch(x,y) ;
        }
    }

    /**
     * Set Next Touch Handler
     * @param next Touch Event Handler
     */
    public void setNext( ITouchEventHandler next)
    {
        nextHandler = next ;
    }

    /**
     * Get Display Contents
     * @return Display Contents
     */
    public String display()
    {//TODO: 3digits, 9digits's display to new class and extend it
        System.err.println("9 Screen Value : " + value) ;
        System.err.println("LastKey: " + lastKey) ;
        System.err.println("isFocused: "+ isFocused) ;

        return "[" + value + "]";
    }

    /**
     * Add Sub Component (Not used)
     * @param c Sub Component to Add
     */
    public void addSubComponent( IDisplayComponent c )
    {

    }

    /**
     * Key Event Update
     * @param c   Count of Keys So Far
     * @param key Last key Pressed
     */
    public void keyEventUpdate( int c, String key )
    {
        System.err.println( "Key: " + key ) ;
        count = c ;
        lastKey = key ;
        System.err.println("NineDigitsScreen updated ! count = " + count + ", lastKey = " + key) ;
    }
}
