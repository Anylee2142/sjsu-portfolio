package starbucks;

/** Decorator class for each IScreen */
public class ScreenDecorator implements IScreen {
    private IScreen sc;

    public ScreenDecorator(IScreen sc) {
        this.sc = sc;
    }
    /**
     * Send touch events to screen
     * @param x Touch X
     * @param y Touch Y
     */
    public void touch(int x, int y) { sc.touch(x, y) ;}

    /**
     * Displays screen components
     * @return Return Screen Contents
     */
    public String display() { return sc.display(); }

    /**
     * Returns name of screen
     * @return Screen Name
     */
    public String name() { return StringUtils.center(sc.name(), screenWidth()).replaceAll("\\s+$","") ; }

    /**
     * Navigate to next screen
     */
    public void next() { sc.next() ; }

    /**
     * Navigate to previous screen
     */
    public void prev() { sc.prev() ; }

    /**
     * Set next screen with action name
     * @param s Screen
     * @param n Action
     */
    public void setNext(IScreen s, String n ) { sc.setNext(s, n); }

    /**
     * Set previous screen with action name
     * @param s Screen
     * @param n Action
     */
    public void setPrev(IScreen s, String n ) { sc.setPrev(s, n); }

    /**
     * Set IScreenBundle
     * @param screenBundle Reference to IScreenBundle
     */
    public void setScreenBundle(ScreenBundle screenBundle) { sc.setScreenBundle(screenBundle); }

    /**
     * Get ScreenBundle
     * @return ScreenBundle
     * */
    public ScreenBundle getScreenBundle() { return sc.getScreenBundle();}

    /** Return a reference to Screen
     * @return reference to screen
     * */
    public IScreen getScreen() { return sc; }

    /** Width for current strategy
     * @return width
     * */
    protected int screenWidth() {
        int width = 15 ;
        String scName = sc.getClass().getSimpleName() ;
        if (scName.equals("MyCards")) {
            if (((MyCards) sc).getCurrentStrategy().equals("landscape")) { width = 32;}
        } else if (scName.equals("MyCardsPay")) {if (((MyCardsPay) sc).getCurrentStrategy().equals("landscape")) { width = 32;}}
        return width ;
    }
}
