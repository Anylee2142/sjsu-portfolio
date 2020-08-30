/**
 *  Main App Class for Displaying Screen.
 *  * Responsibility
 *     * Setting Screen components
 *         * e.g. Initializing Screens, Setting Command Pattern etc
 * * Contains Screens
 * * Set IMenuCommand & Deliver it to Screens
 */
public class App {
    private State0 s0 ;
    private State1 s1 ;
    private State2 s2 ;
    private State3 s3 ;
    private State4 s4 ;
    private State5 s5 ;
    private State6 s6 ;
    private State7 s7 ;

    private State current ;
    private Frame frame ;

    private IButtonCommand A = new ButtonCommand() ;
    private IButtonCommand B = new ButtonCommand() ;
    private IButtonCommand C = new ButtonCommand() ;
    private IButtonCommand D = new ButtonCommand() ;
    private IButtonCommand E = new ButtonCommand() ;
    private IButtonCommand F = new ButtonCommand() ;
    private IButtonCommand G = new ButtonCommand() ;
    private IButtonCommand H = new ButtonCommand() ;
    private IButtonCommand Els = new ButtonCommand() ;


    public App() {
        s0 = new State0(this);
        s1 = new State1(this);
        s2 = new State2(this);
        s3 = new State3(this);
        s4 = new State4(this);
        s5 = new State5(this);
        s6 = new State6(this);
        s7 = new State7(this);

        current = s0 ;
        frame = new Frame( new Decorator(current) ) ;


        A.setReceiver(() -> current.doA());
        B.setReceiver(() -> current.doB());
        C.setReceiver(() -> current.doC());
        D.setReceiver(() -> current.doD());
        E.setReceiver(() -> current.doE());
        F.setReceiver(() -> current.doF());
        G.setReceiver(() -> current.doG());
        H.setReceiver(() -> current.doH());
        Els.setReceiver(() -> current.doEls());

        frame.setButtonCommand("A", A);
        frame.setButtonCommand("B", B);
        frame.setButtonCommand("C", C);
        frame.setButtonCommand("D", D);
        frame.setButtonCommand("E", E);
        frame.setButtonCommand("F", F);
        frame.setButtonCommand("G", G);
        frame.setButtonCommand("H", H);
        frame.setButtonCommand("Els", Els);
    }

    public void key(String keypad) {
        String simpleName = current.getClass().toString().split(" ")[1] ;
        frame.key(keypad, simpleName); }

    public String display() {
        return frame.display() ;}

    public void setState(int state) {
        // current = StateN here
        switch(state) {
            case 0: current = s0 ; break ;
            case 1: current = s1 ; break ;
            case 2: current = s2 ; break ;
            case 3: current = s3 ; break ;
            case 4: current = s4 ; break ;
            case 5: current = s5 ; break ;
            case 6: current = s6 ; break ;
            case 7: current = s7 ; break ;
            default: current = s0 ; break ;
        }
        Screen screen = frame.getScreen() ;
        screen.setState( current );
    }

}

