/** Support class for landscape */
public class ScreenLandScapeSupport extends Screen {
    protected String currentStrategy = "portrait";
    /**
     * Set Current Strategy
     * @param newStrategy indicates strategy of current screen
     */
    public void setCurrentStrategy(String newStrategy) {
        this.currentStrategy = newStrategy ;
    }

    /** Get current Strategy
     * @return current strategy
     * */
    public String getCurrentStrategy() { return this.currentStrategy ;}
}
