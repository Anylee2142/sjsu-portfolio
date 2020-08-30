
public class ButtonCommand implements IButtonCommand {

    private IButtonReceiver target ;

    /** Execute the Command */
    public void execute() { target.doAction(); }

    /**
     * Configure the Receiver for the Command
     * @param target Receiver
     */
    public void setReceiver( IButtonReceiver target ) { this.target = target ; }
}
