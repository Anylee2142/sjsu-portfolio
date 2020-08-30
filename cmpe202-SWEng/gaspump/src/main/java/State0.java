
public class State0 implements State {

    private App app ;

    public State0 (App app) { this.app = app ; }

    public String titleMessage() { return "Credit or Debit?" ; }

    public String ButtonA() { return "" ; }

    public String ButtonB() { return "" ; }

    public String ButtonC() { return "Credit" ; }

    public String ButtonD() { return "Debit" ; }

    public String ButtonE() { return "" ; }

    public String ButtonF() { return "" ; }

    public String ButtonG() { return "" ; }

    public String ButtonH() { return "" ; }

    public void doA() {  }

    public void doB() {  }

    public void doC() { app.setState(1) ; }

    public void doD() { app.setState(3) ; }

    public void doE() {  }

    public void doF() {  }

    public void doG() {  }

    public void doH() {  }

    public void doEls() {  }
}
