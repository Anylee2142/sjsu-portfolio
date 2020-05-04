
/**
 * @opt operations
 * @opt attributes
 * @opt types
 * @opt visibility
 * @opt constructors
 * @hidden
 */
class UMLOptions {}

/**
 * @hidden
 */
class String {}

/**
 * @hidden
 */
class ArrayList {}

/**
 * @hidden
 */
class HashMap {}

/**
 * @hidden
 */
class Hashtable {}

/**
 * @hidden
 */
class Device$ORIENTATION_MODE {}


class Rewards extends Screen {

	public Rewards();
	public void touch(int x, int y);
	public String name();
}

/**
 * @assoc "" - "1" IKeyPadRouterObserver
 * @depend - "" - ITouchEventHandler
 * @depend - "" - IDisplayComponent
 * @depend - "" - IKeyPadRouterObserver
 * @depend - "" - IKeyPadObserver
 */
class KeyPadRouter extends KeyPad implements IKeyPadRouterSubject{
	public KeyPadRouter();
	public void touch(int x, int y);
	public void addSubComponent(IDisplayComponent c);
	public void setNext(ITouchEventHandler next);
	public String display();
	public void setCurrentKeyPad(String keyPad);
	public String lastKey();
	public void removeObserver(IKeyPadObserver obj);
	public void notifyObservers();
	public void attachKeyPads(Hashtable keyPadsDictionary);
	public void removeKeyPad(String key);
	public void notifyFocus(String keyPad);
	public IKeyPadRouterObserver getHashMapElement(String key);
	public void attach(IKeyPadObserver obj);
}

class ScreenLandScapeSupport extends Screen {

	public ScreenLandScapeSupport();
	public void setCurrentStrategy(String newStrategy);
	public String getCurrentStrategy();
}

/**
 * @assoc "" - "" IScreen
 * @depend - "" - IScreen
 */
class ScreenDecorator  implements IScreen{
	public ScreenDecorator(IScreen sc);
	public void touch(int x, int y);
	public void setNext(IScreen s, String n);
	public void setPrev(IScreen s, String n);
	public String display();



	public String name();
	public void next();
	public void prev();
}

/**
 * @assoc "" - "1" IScreen
 * @assoc "" - "1" IMenuInvoker
 * @assoc "" - "1" IOrientationStrategy
 * @assoc "" - "" ScreenBundle
 * @depend - "" - IScreen
 * @depend - "" - IOrientationStrategy
 * @depend - "" - IMenuCommand
 */
class Frame  implements IFrame{
	public Frame(IScreen initial);
	public void touch(int x, int y);
	public void display();


	public String screen();
	public void previousScreen();
	public void nextScreen();
	public void setCurrentScreen(IScreen s);
	public void setMenuItems(String[] keys, IMenuCommand[] commands);
	public void setMenuItem(String slot, IMenuCommand c);
	public void cmd(String c);
	public void selectA();
	public void selectB();
	public void selectC();
	public void selectD();
	public void selectE();
	public void landscape();
	public void portrait();
	public String contents();
}

interface IKeyPadRouterSubject  {

	public void attachKeyPads(Hashtable obj);
	public void removeKeyPad(String key);
	public void notifyFocus(String keyPad);
}

interface IFrame  {

	public void touch(int x, int y);
	public void display();
	public void setScreenBundle(ScreenBundle screenBundle);
	public ScreenBundle getScreenBundle();
	public String screen();
	public void previousScreen();
	public void nextScreen();
	public void setCurrentScreen(IScreen s);
	public void setMenuItems(String[] keys, IMenuCommand[] commands);
	public void setMenuItem(String slot, IMenuCommand c);
	public void cmd(String c);
	public void selectA();
	public void selectB();
	public void selectC();
	public void selectD();
	public void selectE();
	public void landscape();
	public void portrait();
	public String contents();
}

interface IDisplayComponent  {

	public void addSubComponent(IDisplayComponent c);
	public String display();
}

interface IMenuInvoker  {

	public void setCommand(IMenuCommand c);
	public void invoke();
}

interface IMenuCommand  {

	public void setReceiver(IMenuReceiver target);
	public void execute();
}

interface IScreen  {

	public void touch(int x, int y);
	public void setNext(IScreen s, String n);
	public void setPrev(IScreen s, String n);
	public String display();
	public void setScreenBundle(ScreenBundle screenBundle);
	public ScreenBundle getScreenBundle();
	public String name();
	public void next();
	public void prev();
}

/**
 * @depend - "" - IScreen
 */
class ScreenLeftDecorator extends ScreenDecorator {
	private String scDisplay;
	public ScreenLeftDecorator(IScreen sc);
	public String display();
}

/**
 * @depend - "" - IPinStateMachine
 */
class NoPinDigits  implements IPinState{

	public NoPinDigits(IPinStateMachine m);
	public void backspace();
	public void validPin();
	public void invalidPin();
	public void number(String digit);
}

/**
 * @depend - "" - IPinStateMachine
 */
class OnePinDigit  implements IPinState{

	public OnePinDigit(IPinStateMachine m);
	public void backspace();
	public void validPin();
	public void invalidPin();
	public void number(String digit);
}

/**
 * @depend - "" - IPinStateMachine
 */
class ThreePinDigits  implements IPinState{

	public ThreePinDigits(IPinStateMachine m);
	public void backspace();
	public void validPin();
	public void invalidPin();
	public void number(String digit);
}

/**
 * @assoc "" - "1" KeyPadRouter
 * @depend - "" - ITouchEventHandler
 * @depend - "" - IDisplayComponent
 */
class ThreeDigitsScreen  implements ITouchEventHandler, IDisplayComponent, IKeyPadObserver{
	private int count;
	private String lastKey;
	private String value;
	private boolean isFocused;
	public ThreeDigitsScreen();
	public void touch(int x, int y);
	public void addSubComponent(IDisplayComponent c);
	public void setNext(ITouchEventHandler next);
	public String display();
	public void keyEventUpdate(int c, String key);
	public void flushValueAndLastKey();
	public void setKeyPadRouter(KeyPadRouter keyPadRouterArgument);
	public void flushLastKey();
	public void setValue(String valueArgument);
}

interface IKeyPadRouterObserver  {

	public void focusUpdate(boolean isFocused);
}

/**
 * @depend - "" - IScreen
 */
class ScreenCenterDecorator extends ScreenDecorator {
	private String scDisplay;
	public ScreenCenterDecorator(IScreen sc);
	public String display();
}

/**
 * @depend - "" - ICardDigitsStateMachine
 */
class ThreeCardDigits  implements IDigitsState{

	public ThreeCardDigits(ICardDigitsStateMachine m);
	public void backspace();
	public void number(String digit);
}

/**
 * @depend - "" - ICardDigitsStateMachine
 */
class SevenCardDigits  implements IDigitsState{

	public SevenCardDigits(ICardDigitsStateMachine m);
	public void backspace();
	public void number(String digit);
}

/**
 * @assoc "" - "" IMenuCommand
 * @depend - "" - IMenuCommand
 */
class MenuOption  implements IMenuInvoker{
	public MenuOption();
	public void setCommand(IMenuCommand c);
	public void invoke();
}

class Card  {
	private String cardNumber;
	private float balance;
	public Card(String cardNumber, float balance);
	public float getBalance();
	public String getCardNumber();
	public void payCard();
}

class MyCardsMoreOptions extends Screen {

	public MyCardsMoreOptions();
	public void touch(int x, int y);
	public String name();
}

/**
 * @depend - "" - ICardDigitsStateMachine
 */
class EightCardDigits  implements IDigitsState{

	public EightCardDigits(ICardDigitsStateMachine m);
	public void backspace();
	public void number(String digit);
}

/**
 * @depend - "" - IPinStateMachine
 */
class FourPinDigits  implements IPinState{

	public FourPinDigits(IPinStateMachine m);
	public void backspace();
	public void validPin();
	public void invalidPin();
	public void number(String digit);
}

interface IPinAuthSubject  {

	public void removeObserver(IPinAuthObserver obj);
	public void registerObserver(IPinAuthObserver obj);
	public void notifyObserver(boolean isFail);
}

interface IPinState  {

	public void backspace();
	public void validPin();
	public void invalidPin();
	public void number(String digit);
}

interface ICardDigitsStateMachine  {

	public void setStateNoCardDigits();
	public void backspace();
	public void setStateOneCardDigit(String digit);
	public void setStateThreeCardDigits(String digit);
	public void setStateFiveCardDigits(String digit);
	public void setStateSixCardDigits(String digit);
	public void setStateSevenCardDigits(String digit);
	public void setStateTwoCardDigits(String digit);
	public void setStateFourCardDigits(String digit);
	public void setStateNineCardDigits(String digit);
	public void setStateEightCardDigits(String digit);
	public void number(String digit);
}

interface ITouchEventHandler  {

	public void touch(int x, int y);
	public void setNext(ITouchEventHandler next);
}

/**
 * @assoc "" - "1" IFrame
 * @assoc "" - "*" IScreen
 * @assoc "" - "" IDisplayComponent
 * @depend - "" - IScreen
 * @depend - "" - IFrame
 * @depend - "" - IDisplayComponent
 */
class ScreenBundle  {
	public ScreenBundle();
	public void setIFrame(IFrame frame);
	public void setIScreens(String key, IScreen iScreen);
	public void setiDisplayComponents(String key, IDisplayComponent iDisplayComponent);
	public void connectScreenBundle();
	public IFrame getFrame();
	public IScreen getMyCards();
	public IScreen getMyCardsPay();
	public IScreen getAddCard();
	public IScreen getMycardsScreen();
	public IScreen getMycardsPayScreen();
	public IScreen getOptionsScreen();
	public IScreen getMoreOptionsScreen();
	public IScreen getAddcardScreen();
	public IScreen getSettingsScreen();
	public IDisplayComponent getMycardsTds();
	public IDisplayComponent getMycardsPayTds();
}

interface IPinAuthObserver  {

	public void authEvent(boolean isFail);
}

interface IApp  {

	public void touch(int x, int y);
	public void display();
	public String screen();
	public void landscape();
	public void portrait();
	public String screenContents();
	public void next();
	public void execute(String c);
	public void prev();
}

/**
 * @assoc "" - "" Card
 * @depend - "" - IFrame
 */
class MyCardsPay extends ScreenLandScapeSupport {
	public MyCardsPay(TextDisplayScreen tds);
	public void touch(int x, int y);


	public String name();
}

/**
 * @assoc "" - "*" IDisplayComponent
 * @assoc "" - "" ITouchEventHandler
 * @depend - "" - ITouchEventHandler
 * @depend - "" - IScreen
 * @depend - "" - IDisplayComponent
 */
class Screen  implements IScreen, IDisplayComponent{
	public Screen();
	public void touch(int x, int y);
	public void addSubComponent(IDisplayComponent c);
	public void setNext(IScreen s, String n);
	public void setPrev(IScreen s, String n);
	public String display();
	public void setScreenBundle(ScreenBundle screenBundle);
	public ScreenBundle getScreenBundle();
	public String name();
	public void next();
	public void prev();
}

/**
 * @assoc "" - "1" IApp
 * @assoc "" - "1" KeyPad
 * @assoc "" - "1" IDisplayComponent
 * @assoc "" - "1" PinScreen
 * @assoc "" - "1" ScreenDecorator
 * @assoc "" - "1" PinEntryMachine
 * @depend - "" - IKeyPadSubject
 * @depend - "" - IDisplayComponent
 * @depend - "" - IPinAuthSubject
 * @depend - "" - IKeyPadObserver
 */
class Device  implements IApp, IPinAuthObserver{
	private boolean fourPin;
	private boolean sixPin;
	public String pin;
	private boolean authenticated;
	private boolean isFail;
	private boolean isFirstTime;
	private Device$ORIENTATION_MODE device_orientation_state;
	public void touch(int x, int y);
	public void display();
	public String screen();
	public void landscape();
	public void portrait();
	public String screenContents();
	public void authEvent(boolean isFail);
	public Device$ORIENTATION_MODE getDeviceOrientation();
	public void setPortraitOrientation();
	public void setLandscapeOrientation();
	public String isAuthenticated();



	public void startUp();
	public void next();
	public void execute(String c);
	public void debug();
	public void prev();
}

class StringUtils  {

	public String center(String s, int size, char pad);
	public String center(String s, int size);
	public void dumpLines(String str);
	public int countLines(String str);
	public String padLines(int num);
}

/**
 * @depend - "" - ICardDigitsStateMachine
 */
class NineCardDigits  implements IDigitsState{

	public NineCardDigits(ICardDigitsStateMachine m);
	public void backspace();
	public void number(String digit);
}

/**
 * @depend - "" - ICardDigitsStateMachine
 */
class OneCardDigit  implements IDigitsState{

	public OneCardDigit(ICardDigitsStateMachine m);
	public void backspace();
	public void number(String digit);
}

class Store extends Screen {

	public Store();
	public void touch(int x, int y);
	public String name();
}

/**
 * @assoc "" - "1" NineDigitsScreen
 * @assoc "" - "1" NoCardDigits
 * @assoc "" - "1" OneCardDigit
 * @assoc "" - "1" TwoCardDigits
 * @assoc "" - "1" ThreeCardDigits
 * @assoc "" - "1" FourCardDigits
 * @assoc "" - "1" FiveCardDigits
 * @assoc "" - "1" SixCardDigits
 * @assoc "" - "1" SevenCardDigits
 * @assoc "" - "1" EightCardDigits
 * @assoc "" - "1" NineCardDigits
 * @assoc "" - "1" IDigitsState
 * @depend - "" - IDigitsState
 */
class NineDigitsEntryMachine  implements ICardDigitsStateMachine, IKeyPadObserver{
	private int digitCount;
	private String d1;
	private String d2;
	private String d3;
	private String d4;
	private String d5;
	private String d6;
	private String d7;
	private String d8;
	private String d9;
	public NineDigitsEntryMachine();
	public void keyEventUpdate(int c, String key);
	public String getCurrentState();
	public void setStateNoCardDigits();
	public void backspace();
	public void setStateOneCardDigit(String digit);
	public void setStateThreeCardDigits(String digit);
	public void setStateFiveCardDigits(String digit);
	public void setStateSixCardDigits(String digit);
	public void setStateSevenCardDigits(String digit);
	public void setStateTwoCardDigits(String digit);
	public void setStateFourCardDigits(String digit);
	public void setStateNineCardDigits(String digit);
	public void setStateEightCardDigits(String digit);
	public String d1();
	public String d2();
	public String d3();
	public String d4();
	public String d5();
	public String d6();
	public String d7();
	public String d8();
	public String d9();
	public void setScreen9digits(NineDigitsScreen screen9digits_arg);
	public String getValue();
	public void number(String digit);
}

interface IOrientationStrategy  {

	public void display(IScreen s);
	public void selectA();
	public void selectB();
	public void selectC();
	public void selectD();
	public void selectE();
	public String contents(IScreen s);
}

/**
 * @depend - "" - ITouchEventHandler
 * @depend - "" - IDisplayComponent
 * @depend - "" - IKeyPadObserver
 */
class KeyPad  implements ITouchEventHandler, IDisplayComponent, IKeyPadSubject, IKeyPadRouterObserver{

	public KeyPad();
	public void touch(int x, int y);
	public void addSubComponent(IDisplayComponent c);
	public void setNext(ITouchEventHandler next);
	public String display();
	public String lastKey();
	public void removeObserver(IKeyPadObserver obj);
	public void notifyObservers();
	public void focusUpdate(boolean isFocused);
	public void flushCountPinDigits();
	public void attach(IKeyPadObserver obj);
}

/**
 * @depend - "" - ICardDigitsStateMachine
 */
class FiveCardDigits  implements IDigitsState{

	public FiveCardDigits(ICardDigitsStateMachine m);
	public void backspace();
	public void number(String digit);
}

class PinScreen extends Screen {

	public PinScreen();
	public String name();
}

class Main  {

	public Main();
	public void main(String[] args);
}

/**
 * @depend - "" - IPinStateMachine
 */
class SixPinDigits  implements IPinState{

	public SixPinDigits(IPinStateMachine m);
	public void backspace();
	public void validPin();
	public void invalidPin();
	public void number(String digit);
}

/**
 * @assoc "" - "1" Card
 * @depend - "" - ITouchEventHandler
 * @depend - "" - IDisplayComponent
 */
class TextDisplayScreen  implements IDisplayComponent, ITouchEventHandler{
	private String screenName;
	private String screenValue;
	public TextDisplayScreen(String screenName, String screenValue);
	public void touch(int x, int y);
	public void addSubComponent(IDisplayComponent c);
	public void setNext(ITouchEventHandler next);
	public String display();
	public void setCard(Card newCard);
}

/**
 * @depend - "" - IScreen
 * @depend - "" - IFrame
 */
class Settings extends Screen {

	public Settings();
	public void touch(int x, int y);
	public String name();
}

/**
 * @assoc "" - "1" ThreeDigitsScreen
 * @assoc "" - "1" NoCardDigits
 * @assoc "" - "1" OneCardDigit
 * @assoc "" - "1" TwoCardDigits
 * @assoc "" - "1" ThreeCardDigits
 * @assoc "" - "1" IDigitsState
 * @depend - "" - IDigitsState
 */
class ThreeDigitsEntryMachine  implements ICardDigitsStateMachine, IKeyPadObserver{
	private int digitCount;
	private String d1;
	private String d2;
	private String d3;
	public ThreeDigitsEntryMachine();
	public void keyEventUpdate(int c, String key);
	public String getCurrentState();
	public void setStateNoCardDigits();
	public void backspace();
	public void setStateOneCardDigit(String digit);
	public void setStateThreeCardDigits(String digit);
	public void setStateFiveCardDigits(String digit);
	public void setStateSixCardDigits(String digit);
	public void setStateSevenCardDigits(String digit);
	public void setStateTwoCardDigits(String digit);
	public void setStateFourCardDigits(String digit);
	public void setStateNineCardDigits(String digit);
	public void setStateEightCardDigits(String digit);
	public String d1();
	public String d2();
	public String d3();
	public void setScreen3digits(ThreeDigitsScreen screen3digits_arg);
	public String getValue();
	public void number(String digit);
}

/**
 * @depend - "" - IFrame
 */
class MyCardsOptions extends Screen {

	public MyCardsOptions();
	public void touch(int x, int y);
	public String name();
}

/**
 * @depend - "" - IMenuReceiver
 */
class MenuCommand  implements IMenuCommand{

	public MenuCommand();
	public void setReceiver(IMenuReceiver t);
	public void execute();
}

interface IDigitsState  {

	public void backspace();
	public void number(String digit);
}

interface IKeyPadObserver  {

	public void keyEventUpdate(int numKeys, String key);
}

/**
 * @assoc "" - "1" KeyPadRouter
 * @depend - "" - ITouchEventHandler
 * @depend - "" - IDisplayComponent
 */
class NineDigitsScreen  implements ITouchEventHandler, IDisplayComponent, IKeyPadObserver{
	private int count;
	private String lastKey;
	private String value;
	private boolean isFocused;
	public NineDigitsScreen();
	public void touch(int x, int y);
	public void addSubComponent(IDisplayComponent c);
	public void setNext(ITouchEventHandler next);
	public String display();
	public void keyEventUpdate(int c, String key);
	public void flushValueAndLastKey();
	public void setKeyPadRouter(KeyPadRouter keyPadRouterArgument);
	public void flushLastKey();
	public void setValue(String valueArgument);
}

interface IMenuReceiver  {

	public void doAction();
}

/**
 * @depend - "" - IPinStateMachine
 */
class TwoPinDigits  implements IPinState{

	public TwoPinDigits(IPinStateMachine m);
	public void backspace();
	public void validPin();
	public void invalidPin();
	public void number(String digit);
}

/**
 * @depend - "" - ITouchEventHandler
 * @depend - "" - IDisplayComponent
 */
class FourDigitsPasscode  implements ITouchEventHandler, IDisplayComponent, IKeyPadObserver{
	private int count;
	public FourDigitsPasscode();
	public void touch(int x, int y);
	public void addSubComponent(IDisplayComponent c);
	public void setNext(ITouchEventHandler next);
	public String display();
	public void keyEventUpdate(int c, String key);
}

/**
 * @depend - "" - ITouchEventHandler
 * @depend - "" - IDisplayComponent
 */
class SixDigitsPasscode  implements ITouchEventHandler, IDisplayComponent, IKeyPadObserver{
	private int count;
	public SixDigitsPasscode();
	public void touch(int x, int y);
	public void addSubComponent(IDisplayComponent c);
	public void setNext(ITouchEventHandler next);
	public String display();
	public void keyEventUpdate(int c, String key);
}

/**
 * @depend - "" - ICardDigitsStateMachine
 */
class FourCardDigits  implements IDigitsState{

	public FourCardDigits(ICardDigitsStateMachine m);
	public void backspace();
	public void number(String digit);
}

/**
 * @assoc "" - "1" IPinAuthObserver
 * @assoc "" - "1" NoPinDigits
 * @assoc "" - "1" OnePinDigit
 * @assoc "" - "1" TwoPinDigits
 * @assoc "" - "1" ThreePinDigits
 * @assoc "" - "1" FourPinDigits
 * @assoc "" - "1" FivePinDigits
 * @assoc "" - "1" SixPinDigits
 * @assoc "" - "1" IPinState
 * @depend - "" - IPinState
 * @depend - "" - IPinAuthObserver
 */
class PinEntryMachine  implements IPinStateMachine, IKeyPadObserver, IPinAuthSubject{
	private String pin;
	private int pinCount;
	private boolean is4pin;
	private String d1;
	private String d2;
	private String d3;
	private String d4;
	private String d5;
	private String d6;
	public PinEntryMachine();
	public void removeObserver(IPinAuthObserver obj);
	public void keyEventUpdate(int c, String key);
	public String getCurrentState();
	public void setStateNoPinDigits();
	public void setStateTwoPinDigits(String digit);
	public void backspace();
	public void validPin();
	public void invalidPin();
	public void setStateOnePinDigit(String digit);
	public void setPin(String pin);
	public void setStateThreePinDigits(String digit);
	public void setStateFourPinDigits(String digit);
	public void setStateFivePinDigits(String digit);
	public void setStateSixPinDigits(String digit);
	public void registerObserver(IPinAuthObserver obj);
	public void notifyObserver(boolean isFail);
	public String d1();
	public String d2();
	public String d3();
	public String d4();
	public String d5();
	public String d6();
	public void setIs4pin(boolean is4pin);
	public void number(String digit);
}

interface IKeyPadSubject  {

	public void removeObserver(IKeyPadObserver obj);
	public void notifyObservers();
	public void attach(IKeyPadObserver obj);
}

/**
 * @assoc "" - "1" NineDigitsScreen
 * @assoc "" - "1" ThreeDigitsScreen
 * @assoc "" - "1" KeyPadRouter
 * @assoc "" - "1" NineDigitsEntryMachine
 * @assoc "" - "" ThreeDigitsEntryMachine
 * @depend - "" - IKeyPadSubject
 * @depend - "" - IKeyPadRouterObserver
 */
class AddCard extends Screen {
	public AddCard();
	public NineDigitsEntryMachine getNineMachine();
	public ThreeDigitsEntryMachine getThreeMachine();
	public NineDigitsScreen getScreen9digits();
	public ThreeDigitsScreen getScreen3digits();
	public KeyPadRouter getKeyPadRouter();
	public String name();
}

class Payments extends Screen {

	public Payments();
	public void touch(int x, int y);
	public String name();
}

/**
 * @depend - "" - ICardDigitsStateMachine
 */
class NoCardDigits  implements IDigitsState{

	public NoCardDigits(ICardDigitsStateMachine m);
	public void backspace();
	public void number(String digit);
}

/**
 * @assoc "" - "1" IScreen
 * @assoc "" - "1" IDisplayComponent
 * @assoc "" - "1" IMenuCommand
 * @assoc "" - "" IFrame
 * @depend - "" - IScreen
 * @depend - "" - IMenuReceiver
 * @depend - "" - IMenuCommand
 */
class AppController  implements IApp{
	public AppController();
	public void touch(int x, int y);
	public void display();
	public String screen();
	public void landscape();
	public void portrait();
	public String screenContents();
	public void next();
	public void execute(String c);
	public void prev();
}

/**
 * @depend - "" - IFrame
 */
class MyCards extends ScreenLandScapeSupport {

	public MyCards(TextDisplayScreen tds);
	public void touch(int x, int y);
	public String name();
}

/**
 * @depend - "" - ICardDigitsStateMachine
 */
class TwoCardDigits  implements IDigitsState{

	public TwoCardDigits(ICardDigitsStateMachine m);
	public void backspace();
	public void number(String digit);
}

/**
 * @depend - "" - ICardDigitsStateMachine
 */
class SixCardDigits  implements IDigitsState{

	public SixCardDigits(ICardDigitsStateMachine m);
	public void backspace();
	public void number(String digit);
}

/**
 * @depend - "" - IPinStateMachine
 */
class FivePinDigits  implements IPinState{

	public FivePinDigits(IPinStateMachine m);
	public void backspace();
	public void validPin();
	public void invalidPin();
	public void number(String digit);
}

interface IPinStateMachine  {

	public void setStateNoPinDigits();
	public void setStateTwoPinDigits(String digit);
	public void backspace();
	public void validPin();
	public void invalidPin();
	public void setStateOnePinDigit(String digit);
	public void setPin(String pin);
	public void setStateThreePinDigits(String digit);
	public void setStateFourPinDigits(String digit);
	public void setStateFivePinDigits(String digit);
	public void setStateSixPinDigits(String digit);
	public void number(String digit);
}
