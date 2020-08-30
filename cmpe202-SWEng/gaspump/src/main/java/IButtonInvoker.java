
public interface IButtonInvoker {
    /**
     * Set Command for Invoker
     * @param c Command Object
     */
    void setCommand( IButtonCommand c ) ;

    /** Invoke Menu Function */
    void invoke() ;

}
