
public interface IButtonCommand {
    /** Execute the Command */
    void execute() ;

    /**
     * Configure the Receiver for the Command
     * @param target Receiver
     */
    void setReceiver( IButtonReceiver target ) ;
}
