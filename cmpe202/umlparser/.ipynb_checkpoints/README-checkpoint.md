## Project Journal
= This journal contains mostly of `diary entries` of proejct progress on daily basis.   
= or things that happen in my head (possibly)   
(Some are in github's kanban board as issues. You can also refer to those at `issues` tab)

### 31th March
1. Figure out the exact requirements of the project.
    > Key Goal = UML Parser that takes java source codes and outputs a class diagram.

2. Key components to be determined
    - Program Language = Java 1.8 (+ shell script)
    - Diagram Generator = `UML graph`
        > Its input format is similar to Java codes itself
    - Code Parser = Java `Reflect` API
        > For input into UML graph, only methods and fields need to be extracted.   
        > For this reason, no complicated features are further required.

3. Run examples of both `UML graph` and `Reflect`

4. Organize personal Kanban board at github.

### 1st April
1. Example of input for `UML graph`

``` Java
class Person {
	String Name;
}

class Employee extends Person {}

class Client extends Person {}
```

2. Design overall architecture of `UML Parser`
    1. Receive folder path
    2. Load each java code
    3. Extract necessary properties (methods, fields and etc)
    4. Reconstruct above as `UML graph` input
    
    
3. Associations, implements&extends, and dependencies should be defined as Javadoc.

``` Java
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * @opt inferrel
 * @opt collpackages java.util.*
 * @opt inferdep
 * @opt inferdepinpackage
 * @opt hide java.*
 * @hidden
 */
class UMLOptions {}

class Person {
    House[] houses;
    List<Dog> dogs;
    
    public Room getFavouriteRoom(House house) {}
}

/**
 * @opt inferreltype composed
 */
class House {
    Map<String, Room> nameRoomMap;
}

class Room {}

class Dog {
    Person owner;
}
```

### 2nd April
1. Calculate existing cards' wait and cycle time as label.

2. Finishes the step 3, `Extract necessary properties (methods, fields and etc)`   
    - At `Extractor.java`
    - Need to come up with logic for converting private attribute(s) with getter/setter into public.
    
3. Need to code the step 4, `Reconstruct above as UML graph input`
    - Aggregate results of the step 3 into one java file
    - Need to generate proper javadoc considering associations, multiplicities, and dependency etc.