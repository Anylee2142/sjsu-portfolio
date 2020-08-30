
import java.util.* ;

/**
 * Class that contains multiple KeyPad with Observer Pattern.
 *  */
public class KeyPadRouter extends KeyPad implements IKeyPadRouterSubject{

    private Hashtable<String, IKeyPadRouterObserver> keyPadsDictionary ;
    private IKeyPadRouterObserver current = null ;

    public KeyPadRouter() { this.keyPadsDictionary = new Hashtable<String, IKeyPadRouterObserver>() ; }

    /**
     * Set `this.current`.
     * This changes focus of KeyPads
     * @param keyPad String indicating focus on certain screen.
     */
    public void setCurrentKeyPad(String keyPad) {
        System.err.println("Current Changed !!!!!!!!!!!") ;
        this.current = this.keyPadsDictionary.get( keyPad ) ;
        notifyFocus(keyPad);
        // TODO: if the keypad's isFocuse == true, then current
    }

    /**
     * Touch Event at X and Y (inheritance)
     * @param x X Coord
     * @param y Y Coord
     */
    public void touch(int x, int y) { ((KeyPad) this.current).touch( x, y ) ; }

    /**
     *  Get Last Key Pressed (inheritance)
     * @return Lasy Key
     */
    public String lastKey() { return ((KeyPad) this.current).lastKey() ; }

    /**
     * Set Next Touch Event Handler (inheritance)
     * @param next Event Handler
     */
    public void setNext( ITouchEventHandler next) { ((KeyPad) this.current).setNext( next ) ;}

    /**
     * Get Key Pad Display (inheritance)
     * @return Key Pad View Contents
     */
    public String display() {
        System.err.println("Current KeyPad : " + current) ;
        return ((KeyPad) this.current).display() ; }

    /**
     * Add Sub Component (inheritance)
     * @param c Display Component
     */
    public void addSubComponent( IDisplayComponent c ) { ((KeyPad) this.current).addSubComponent( c ) ;}

    /**
     * Attach a Key Pad Observer (inheritance)
     * @param obj Observer
     */
    public void attach( IKeyPadObserver obj ) { ((KeyPad) this.current).attach( obj ) ;}

    /**
     * Remove Key Pad Observer (inheritance)
     * @param obj Observer
     */
    public void removeObserver( IKeyPadObserver obj ) { ((KeyPad) this.current).removeObserver( obj ) ; }

    /**  (inheritance)
     * Notify all Observers of Update Event
     */
    public void notifyObservers( ) { ((KeyPad) this.current).notifyObservers( ) ;}

    /**
     * Add Observer to Subscribers List
     * @param keyPadsDictionary HashTable for Observer
     */
    public void attachKeyPads(Hashtable<String, IKeyPadRouterObserver> keyPadsDictionary) {
        this.keyPadsDictionary = (Hashtable<String, IKeyPadRouterObserver>) keyPadsDictionary.clone();

        String firstKey = this.keyPadsDictionary.keySet().stream().findFirst().get();
        this.current = this.keyPadsDictionary.get(firstKey) ;
    }

    /**
     * Remove Observer from Subscription
     * @param key Observer Object
     */
    public void removeKeyPad(String key) { keyPadsDictionary.remove(key); }

    /**
     * Notify all Observers of Focus Update
     * @param keyPad key for keypad
     * */
    public void notifyFocus(String keyPad) {
        for(Map.Entry<String, IKeyPadRouterObserver> entry : keyPadsDictionary.entrySet()) {
            IKeyPadRouterObserver observer = entry.getValue();
            if (entry.getKey().equals(keyPad)) observer.focusUpdate(true);
            else observer.focusUpdate(false);
        }
    }

    /**
     * Get value of hash map
     * @param key Key for value
     * @return value
     * */
    public IKeyPadRouterObserver getHashMapElement(String key) { return keyPadsDictionary.get(key); }
}