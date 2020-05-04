
public class State4 implements State {

    private App app ;

    public State4 (App app) { this.app = app ; }

    public String titleMessage() { return "Enter Your PIN" ; }

    public String ButtonA() { return "" ; }

    public String ButtonB() { return "" ; }

    public String ButtonC() { return "" ; }

    public String ButtonD() { return "" ; }

    public String ButtonE() { return "" ; }

    public String ButtonF() { return "" ; }

    public String ButtonG() { return "" ; }

    public String ButtonH() { return "" ; }

    public void doA() {  }

    public void doB() {  }

    public void doC() {  }

    public void doD() {  }

    public void doE() {  }

    public void doF() {  }

    public void doG() {  }

    public void doH() {  }

    public void doEls() { app.setState(5) ; }
}
