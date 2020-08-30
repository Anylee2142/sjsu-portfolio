/** Decorator for left layout */
public class ScreenLeftDecorator extends ScreenDecorator{

    private String scDisplay ;

    public ScreenLeftDecorator(IScreen sc) { super(sc); }

    /** Display of screen
     * @return centered display
     * */
    public String display() {
        scDisplay = super.display();
        return leftDisplay(scDisplay);
    }

    /** Decorator function for left display
     * @param in former display
     * @return lefted display
     * */
    private String leftDisplay(String in) {
        return in;
    }
}
