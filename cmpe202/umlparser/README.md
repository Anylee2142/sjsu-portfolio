 ## Project Journal
= This journal contains mostly of `diary entries` of proejct progress on daily basis.   
= or things that happen in my head (possibly)   
(Some are in github's kanban board as issues. You can also refer to those at `issues` tab)

## Instructions on how to Build and Run your Project
- Install umlgraph as https://www.spinellis.gr/umlgraph/doc/install.html
- Before placing `umlgraph.sh` in bin folder, Fix `-package` to `-private` in java command arguments in the script
- Go to root directory of `umlparser`, and Refer to `Makefile` for generating class diagrams.
    - make test1, make test2, ... make test5
        - For generating a class diagram for each test
    - (or make testAll)
        - For generating all the 5 class diagrams
    - make starbucks
        - For a starbucks class diagram

### Generating diagram
- Refer to `Makefile` and `umlparser.sh` 

### Things used
1. Java 1.8
2. `umlgraph`
3. `Reflection`

------------------------------

### 31th March
1. Figure out the exact requirements of the project.
    > Key Goal = UML Parser that takes java source codes and outputs a class diagram.

2. Key components to be determined
    - Program Language = Java 1.8 (+ shell script)
    - Diagram Generator = `UML graph`
        > Its input format is similar to Java codes itself
    - Code Parser = Java `Reflection` API
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

### 3rd April
1. Complete Basic structure of Reconstructor

2. Finish generating test 1
	- Refer to `/parsedGraph1.java` and `/parsedGraph1.png`

3. Needs to be done
	- Distinguish class vs interface
	- Extract extends and interface
	- Reconstruct methods (with precise parameters)

### 5th April
1. Finish generating test 2, 3
	- Refer to `/parsedGraph2.java` and `/parsedGraph2.png`
	- Refer to `/parsedGraph3.java` and `/parsedGraph3.png`

2. Extract extends and implements phrase, and Convert private attribute with getter and setter into public one
``` Java
class B2 extends P implements A1, A2{
}
```

### 6th April
1. Finish generating test 4, 5
	- Refer to `/parsedGraph4.java` and `/parsedGraph4.png`
	- Refer to `/parsedGraph5.java` and `/parsedGraph5.png`

2. Previously, dependency was implemented by using umlgraph's default option, @inferdep.   
But this can't satisfy requirements of project (e.g. dependency stems from interface etc), So generating more precise dependency relationship was implemented.   
Now, each class has their own `@dependency` annotation(s) if applicable.
``` Java
/**
 * @assoc "" - "*" Observer
 * @depend - "" - Observer
 */
class ConcreteSubject  implements Subject{
	private String subjectState;
	public void detach(Observer obj);
	public void notifyObservers();
	public void showState();
	public void setState(String status);
	public String getState();
	public void attach(Observer obj);
}
```


### 7th April
1. Finish generating starbucks (Extra credit)
	- Refer to `/starbucks.java` and `/starbucks.png`

2. Generating input codes for umlgraph was as expected except some unexpected annotation string errors.   
Fix some relevant bugs and cases.  
	- Refer to this commit `1fd73c33e06575ee80054cf29953342ae0b231ca` for details.

### 15th April
1. Make `umlparser.sh` and `Makefile` for generating test cases and extra credit.
	- Refer to both for details

### 23th April
1. Split responsibilites of Extractor and Reconstructor