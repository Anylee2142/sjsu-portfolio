
/** Screen for Card Code, which takes 3 digits */
public class ThreeDigitsScreen implements ITouchEventHandler, IDisplayComponent, IKeyPadObserver
{
    ITouchEventHandler nextHandler ;
    private int count = 0;

    // TODO: lastkey and value at ThreeDigitsEntryMachine?
    private String lastKey = "" ;
    private String value = "" ;

    private KeyPadRouter kpr = null ;
    private boolean isFocused = false ;

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
    // TODO: flush last key at ThreeDigitsEntryMachine?
    public void flushLastKey() {
        this.lastKey = "" ;
    }

    /** Flush value and lastKey */
    public void flushValueAndLastKey() {
        this.value = "" ;
        this.lastKey = "" ;
    }

    /**
     * Send Touch Events to the Chain
     * @param x Touch X Coord.
     * @param y Touch Y Coord.
     */
    public void touch(int x, int y)
    {
        System.err.println("!!!!!!!!!!!!!! 3 SCREEN !!!!!!!!!!!!!!!!!!!!") ;
        if ( y==2 ) // (1,2), (2,2) or (3,2) are for 9-digit screen
        {
            this.isFocused = false ;
            lastKey = "";
            System.err.println("!!!!!!!!!!!!!!" + isFocused + "!!!!!!!!!!!!!!!!") ;
        }

        if ( x==2 && y==3 ) // Only (2,3) is for 3-digit screen
        {
            System.err.println( "Card Code Screen Touched at (" + x + ", " + y + ")" ) ;
            this.kpr.setCurrentKeyPad( "3digits" ) ;
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
    {
        //TODO: 3digits, 9digits's display to new class and extend it
        System.err.println("3 Screen Value : " + value) ;
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
        System.err.println("ThreeDigitsScreen updated ! count = " + count + ", lastKey = " + key) ;
    }
}
