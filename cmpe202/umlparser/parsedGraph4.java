
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


class ConcreteObserver  implements Observer{

	public ConcreteObserver(ConcreteSubject theSubject);
	public void showState();
	public void update();
}

class TheEconomy extends ConcreteSubject {

	public TheEconomy();
}

class Pessimist extends ConcreteObserver {

	public Pessimist(ConcreteSubject sub);
	public void update();
}

/**
 * @assoc "" - "*" Observer
 * @depend - "" - Observer
 */
class ConcreteSubject  implements Subject{
	private String subjectState;
	public ConcreteSubject();
	public void detach(Observer obj);
	public void showState();
	public void setState(String status);
	public void notifyObservers();
	public String getState();
	public void attach(Observer obj);
}

interface Subject  {

	public void detach(Observer obj);
	public void notifyObservers();
	public void attach(Observer obj);
}

class Optimist extends ConcreteObserver {

	public Optimist(ConcreteSubject sub);
	public void update();
}

interface Observer  {

	public void update();
}
