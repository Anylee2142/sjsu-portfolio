
public class ButtonOption implements IButtonInvoker {
    private IButtonCommand cmd ;

    /**
     * Set Command for Invoker
     * @param cmd Command Object
     */
    public void setCommand( IButtonCommand cmd ) { this.cmd = cmd ; }

    /** Invoke Menu Function */
    public void invoke() { cmd.execute() ; }
}
