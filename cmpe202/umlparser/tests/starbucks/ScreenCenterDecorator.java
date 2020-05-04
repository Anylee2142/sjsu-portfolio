/** Decorator for centered layout */
public class ScreenCenterDecorator extends ScreenDecorator{

    private String scDisplay ;

    public ScreenCenterDecorator(IScreen sc) { super(sc); }

    /** Display of screen
     * @return centered display
     * */
    public String display() {
        scDisplay = super.display();
        return centerDisplay(scDisplay);
    }

    /** Decorator function for center display
     * @param in former display
     * @return centered display
     * */
    private String centerDisplay(String in) {
        StringBuffer buf = new StringBuffer();
        in = in.replaceAll("\n", ":-Z:") ;
        for(String s: in.split(":")) {
            if (s.equals("")) { continue ; }
            else if (s.equals("-Z")) { buf.append("\n");continue; }
            buf.append(StringUtils.center(s, screenWidth()).replaceAll("\\s+$",""));
        }
        return buf.toString();
    }
}
