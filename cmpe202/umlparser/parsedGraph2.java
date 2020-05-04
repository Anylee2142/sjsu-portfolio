
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


interface A2  {


}

/**
 * @depend - "" - A1
 */
class C1  {

	public C1();
	public void test(A1 a1);
}

class B1 extends P implements A1{

	public B1();
}

interface A1  {


}

/**
 * @depend - "" - A2
 */
class C2  {

	public C2();
	public void test(A2 a2);
}

class B2 extends P implements A1, A2{

	public B2();
}

class P  {

	public P();
}
