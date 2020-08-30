
public class State6 implements State {

    private App app ;

    public State6(App app) { this.app = app ; }

    public String titleMessage() { return "Print Receipt?" ; }

    public String ButtonA() { return "" ; }

    public String ButtonB() { return "" ; }

    public String ButtonC() { return "Yes" ; }

    public String ButtonD() { return "No" ; }

    public String ButtonE() { return "" ; }

    public String ButtonF() { return "" ; }

    public String ButtonG() { return "Help" ; }

    public String ButtonH() { return "Done" ; }

    public void doA() {  }

    public void doB() {  }

    public void doC() { app.setState(7) ; }

    public void doD() { app.setState(7) ; }

    public void doE() {  }

    public void doF() {  }

    public void doG() { app.setState(7) ; }

    public void doH() { app.setState(7) ; }

    public void doEls() {  }
}
