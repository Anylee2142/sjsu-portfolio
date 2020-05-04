
package starbucks;

import java.util.HashMap;

/**
 * Class that contains IFrame, IScreen and IDisplayComponents.
 *  */
public class ScreenBundle {
    private IFrame frame ;
    private HashMap<String, IScreen> iScreens ;
    private HashMap<String, IDisplayComponent> iDisplayComponents ;


    public ScreenBundle(){
        iScreens = new HashMap<>();
        iDisplayComponents = new HashMap<>();
    }

    /** set frame
     * @param frame reference to frame
     * */
    public void setIFrame(IFrame frame) { this.frame = frame; }

    /**
     * set IScreens
     * @param key String key
     * @param iScreen reference to IScreen
     * */
    public void setIScreens(String key, IScreen iScreen) { iScreens.put(key, iScreen); }

    /**
     * set IDisplayComponents
     * @param key String key
     * @param iDisplayComponent reference to IDisplayComponent
     * */
    public void setiDisplayComponents(String key, IDisplayComponent iDisplayComponent) { iDisplayComponents.put(key, iDisplayComponent); }

    /** Set ScreenBundle to IScreens */
    public void connectScreenBundle() {
        frame.setScreenBundle(this);
        String[] setList = {"mycards", "mycardsPay", "options", "moreOptions", "store", "rewards", "payments", "settings", "addcard"};
        for(String screenName: setList) {
            Screen screen = (Screen) iScreens.get(screenName);
            screen.setScreenBundle(this);
        }
    }

    /** Getter
     * @return reference to frame
     * */
    public IFrame getFrame() { return frame ; }
    /** Getter
     * @return reference to mycard
     * */
    public IScreen getMyCards() { return iScreens.get("mycards") ; }
    /** Getter
     * @return reference to mycardPay
     * */
    public IScreen getMyCardsPay() { return iScreens.get("mycardsPay") ; }
    /** Getter
     * @return reference to addcard
     * */
    public IScreen getAddCard() { return iScreens.get("addcard") ; }
    /** Getter
     * @return reference to decorated mycards
     * */
    public IScreen getMycardsScreen() { return iScreens.get("mycardsScreen") ;}
    /** Getter
     * @return reference to decorated mycardsPay
     * */
    public IScreen getMycardsPayScreen() { return iScreens.get("mycardsPayScreen") ;}
    /** Getter
     * @return reference to decorated options
     * */
    public IScreen getOptionsScreen() { return iScreens.get("optionsScreen");}
    /** Getter
     * @return reference to decorated moreOptions
     * */
    public IScreen getMoreOptionsScreen() { return iScreens.get("moreOptionsScreen");}
    /** Getter
     * @return reference to decorated addcard
     * */
    public IScreen getAddcardScreen() { return iScreens.get("addcardScreen");}
    /** Getter
     * @return reference to decorated settings
     * */
    public IScreen getSettingsScreen() { return iScreens.get("settingsScreen");}
    /** Getter
     * @return reference to TextDigitsScreen for mycards
     * */
    public IDisplayComponent getMycardsTds() { return iDisplayComponents.get("myCardsTds");}
    /** Getter
     * @return reference to TextDigitsScreen for mycardsPay
     * */
    public IDisplayComponent getMycardsPayTds() { return iDisplayComponents.get("myCardsPayTds");}
}