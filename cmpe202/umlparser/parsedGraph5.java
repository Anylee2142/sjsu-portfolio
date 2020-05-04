
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


/**
 * @depend - "" - Component
 */
class ConcreteDecoratorB extends Decorator {
	private String addedState;
	public ConcreteDecoratorB(Component c);
	public String operation();
}

/**
 * @depend - "" - Component
 */
class ConcreteDecoratorA extends Decorator {
	private String addedState;
	public ConcreteDecoratorA(Component c);
	public String operation();
}

interface Component  {

	public String operation();
}

class ConcreteComponent  implements Component{

	public ConcreteComponent();
	public String operation();
}

/**
 * @assoc "" - "" Component
 * @depend - "" - Component
 */
class Decorator  implements Component{
	public Decorator(Component c);
	public String operation();
}

/**
 * @depend - "" - Component
 */
class Tester  {

	public Tester();
	public void main(String[] args);
}
