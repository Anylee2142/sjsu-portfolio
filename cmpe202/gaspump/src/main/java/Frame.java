
/** Class mostly for displaying content of Screen
 * * Responsibility
 *     * Display content of each Screen
 *     * Contains currentScreen
 *     * Call Screen's IMenuInvoker.invoke()
 *     * display() {
 *     return currentScreen.display() ;
 * }
 * */
public class Frame {

    private Screen screen;

    private IButtonInvoker InvokerA = new ButtonOption() ;
    private IButtonInvoker InvokerB = new ButtonOption() ;
    private IButtonInvoker InvokerC = new ButtonOption() ;
    private IButtonInvoker InvokerD = new ButtonOption() ;
    private IButtonInvoker InvokerE = new ButtonOption() ;
    private IButtonInvoker InvokerF = new ButtonOption() ;
    private IButtonInvoker InvokerG = new ButtonOption() ;
    private IButtonInvoker InvokerH = new ButtonOption() ;
    private IButtonInvoker InvokerEls = new ButtonOption() ;


    public Frame(Screen screen) { this.screen = screen ; }

    public void key(String keypad, String currentState) {
        switch (keypad) {
            case "A": InvokerA.invoke() ; break ;
            case "B": InvokerB.invoke() ; break ;
            case "C": InvokerC.invoke() ; break ;
            case "D": InvokerD.invoke() ; break ;
            case "E": InvokerE.invoke() ; break ;
            case "F": InvokerF.invoke() ; break ;
            case "G": InvokerG.invoke() ; break ;
            case "H": InvokerH.invoke() ; break ;
            default:
                if( currentState.equals("State1") && keypad.length()==16) { InvokerEls.invoke() ; } // Scan Credit Card
                if( currentState.equals("State2") && keypad.length()==5 ) { InvokerEls.invoke() ; } // Scan ZIP Code
                if( currentState.equals("State3") && keypad.length()==10) { InvokerEls.invoke() ; } // Scan Debit Card
                if( currentState.equals("State4") && keypad.length()==4 ) { InvokerEls.invoke() ; } // Scan PIN
                if( currentState.equals("State5") || currentState.equals("State7")) { InvokerEls.invoke() ; }
        }
    }

    public String display() {
        String output = "";
        output += "========================================\n" ;
        output += "\n"                                         ;
        output += screen.display() ;
        output += "========================================\n" ;
        return output ;
    }

    public void setButtonCommand(String button, IButtonCommand cmd) {
        switch(button) {
            case "A": InvokerA.setCommand(cmd) ; break ;
            case "B": InvokerB.setCommand(cmd) ; break ;
            case "C": InvokerC.setCommand(cmd) ; break ;
            case "D": InvokerD.setCommand(cmd) ; break ;
            case "E": InvokerE.setCommand(cmd) ; break ;
            case "F": InvokerF.setCommand(cmd) ; break ;
            case "G": InvokerG.setCommand(cmd) ; break ;
            case "H": InvokerH.setCommand(cmd) ; break ;
            case "Els": InvokerEls.setCommand(cmd) ;
        }
    }

    public Screen getScreen() { return screen ; }
}
