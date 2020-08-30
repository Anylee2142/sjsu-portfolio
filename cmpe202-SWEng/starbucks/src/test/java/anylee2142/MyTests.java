/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package anylee2142;

import starbucks.*;
import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;



import java.util.Arrays;

public class MyTests
{

    IApp app ;

    public MyTests()
    {
    }

    @Before
    public void setUp()
    {
        app = (IApp) Device.getNewInstance() ;
    }

    @Test
    public void MyTest1()
    {
        String[] lines ;
        assertEquals("", app.screen().trim());
        app.touch(1,5) ;
        app.touch(2,5) ;
        app.touch(3,5) ;
        app.touch(1,6) ;

        app.execute("E") ; // Settings Page
        assertEquals("Settings", app.screen().trim());
        app.touch(1,1) ; // Add New Card
        assertEquals("Add Card", app.screen().trim());

        app.touch(1,5); // 1
        app.touch(2,5); // 2
        app.touch(3,5); // 3
        app.touch(2,3); // Focus on card code
        app.touch(1,6); // 4
        app.touch(2,6); // 5
        app.touch(3,6); // 6
        app.touch(1,2); // Focus on card number
        app.touch(1,7); // 7
        app.touch(2,7); // 8
        app.touch(3,7); // 9
        app.touch(3,7); // 9
        app.touch(3,7); // 9
        app.touch(3,7); // 9

        // check digit entry
        app.display() ;
        lines = app.screenContents().split("\n");
        assertEquals("[123789999]", lines[4].trim());
        assertEquals("[456]", lines[5].trim());

        // add card - see balance
        app.next() ;
        app.display() ;
        assertEquals("My Cards", app.screen().trim());
        lines = app.screenContents().split("\n");
        assertEquals("$20.00", lines[7].trim());

        // Check if the stored card number is correct
        app.touch(3,3);
        app.display() ;
        lines = app.screenContents().split("\n");
        assertEquals("[123789999]", lines[6].trim());
        assertEquals("Scan Now", lines[9].trim());

        // Check if payment has no problem
        app.touch(2,2);  // Pay $1.50
        app.touch(3,3); // switch to balance
        lines = app.screenContents().split("\n");
        assertEquals("$18.50", lines[7].trim());
    }
    @Test
    public void MyTest2()
    {
        String[] lines ;
        assertEquals("", app.screen().trim());
        app.touch(1,5) ;
        app.touch(2,5) ;
        app.touch(3,5) ;
        app.touch(1,6) ;

        app.execute("E") ; // Settings Page
        assertEquals("Settings", app.screen().trim());
        app.touch(1,1) ; // Add New Card
        assertEquals("Add Card", app.screen().trim());

        app.touch(2,3); // Focus on card code
        app.touch(1,5); // 1
        app.touch(2,5); // 2
        app.touch(3,5); // 3
        app.touch(1,2); // Focus on card number
        app.touch(1,6); // 4
        app.touch(2,6); // 5
        app.touch(3,6); // 6
        app.touch(1,7); // 7
        app.touch(2,7); // 8
        app.touch(3,7); // 9
        app.touch(3,7); // 9
        app.touch(3,7); // 9
        app.touch(3,7); // 9

        // check digit entry
        app.display() ;
        lines = app.screenContents().split("\n");
        assertEquals("[456789999]", lines[4].trim());
        assertEquals("[123]", lines[5].trim());

        // add card - see balance
        app.next() ;
        app.display() ;
        assertEquals("My Cards", app.screen().trim());
        lines = app.screenContents().split("\n");
        assertEquals("$20.00", lines[7].trim());

        // Check if the stored card number is correct
        app.touch(3,3);
        app.display() ;
        lines = app.screenContents().split("\n");
        assertEquals("[456789999]", lines[6].trim());
        assertEquals("Scan Now", lines[9].trim());

        // Check if payment has no problem
        app.touch(2,2);  // Pay $1.50
        app.touch(3,3); // switch to balance
        lines = app.screenContents().split("\n");
        assertEquals("$18.50", lines[7].trim());
    }

    @Test
    public void MyTest3()
    {
        String[] lines ;
        assertEquals("", app.screen().trim());
        app.touch(1,5) ;
        app.touch(2,5) ;
        app.touch(3,5) ;
        app.touch(1,6) ;

        app.execute("E") ; // Settings Page
        assertEquals("Settings", app.screen().trim());
        app.touch(1,1) ; // Add New Card
        assertEquals("Add Card", app.screen().trim());

        app.touch(2,3); // Focus on card code
        app.touch(1,5); // 1
        app.touch(2,5); // 2
        app.touch(1,2); // Focus on card number
        app.touch(1,6); // 4
        app.touch(2,6); // 5
        app.touch(3,6); // 6
        app.touch(2,3); // Focus on card code
        app.touch(3,5); // 3
        app.touch(1,2); // Focus on card number
        app.touch(1,7); // 7
        app.touch(2,7); // 8
        app.touch(3,7); // 9
        app.touch(3,7); // 9
        app.touch(3,7); // 9
        app.touch(3,7); // 9

        // check digit entry
        app.display() ;
        lines = app.screenContents().split("\n");
        assertEquals("[456789999]", lines[4].trim());
        assertEquals("[123]", lines[5].trim());

        // add card - see balance
        app.next() ;
        app.display() ;
        assertEquals("My Cards", app.screen().trim());
        lines = app.screenContents().split("\n");
        assertEquals("$20.00", lines[7].trim());

        // Check if the stored card number is correct
        app.touch(3,3);
        app.display() ;
        lines = app.screenContents().split("\n");
        assertEquals("[456789999]", lines[6].trim());
        assertEquals("Scan Now", lines[9].trim());

        // Check if payment has no problem
        app.touch(2,2);  // Pay $1.50
        app.touch(3,3); // switch to balance
        lines = app.screenContents().split("\n");
        assertEquals("$18.50", lines[7].trim());
    }

    @Test
    public void MyTest4()
    {
        // If prev from AddCard, screen should be center-decorated, not left.
        // I have checked that my code used left-decorated Settings after prev from AddCard, but no tests assert it.
        String[] lines ;
        assertEquals("", app.screen().trim());
        app.touch(1,5) ;
        app.touch(2,5) ;
        app.touch(3,5) ;
        app.touch(1,6) ;

        app.execute("E") ; // Settings Page
        assertEquals("Settings", app.screen().trim());
        app.touch(1,1) ; // Add New Card
        assertEquals("Add Card", app.screen().trim());

        app.touch(2,3); // Focus on card code
        app.touch(1,5); // 1
        app.touch(2,5); // 2
        app.touch(1,2); // Focus on card number
        app.touch(1,6); // 4
        app.touch(2,6); // 5
        app.touch(3,6); // 6
        app.touch(2,3); // Focus on card code
        app.touch(3,5); // 3
        app.touch(1,2); // Focus on card number
        app.touch(1,7); // 7
        app.touch(2,7); // 8
        app.touch(3,7); // 9
        app.touch(3,7); // 9
        app.touch(3,7); // 9
        app.touch(3,7); // 9

        // check digit entry
        app.display() ;
        lines = app.screenContents().split("\n");
        assertEquals("  [456789999]", lines[4]);
        assertEquals("     [123]", lines[5]);

        // Previous
        app.prev() ;
        app.display() ;
        assertEquals("    Settings", app.screen());
        lines = app.screenContents().split("\n");
        assertEquals("    Add Card", lines[4]);
        assertEquals("  Delete Card", lines[5]);
        assertEquals("    Billing", lines[6]);
        assertEquals("    Passcode", lines[7]);
        assertEquals("  About|Terms", lines[9]);
        assertEquals("      Help", lines[10]);

        app.execute("A") ; // Settings Page
        app.display() ;
        lines = app.screenContents().split("\n");
        assertEquals("$0.00", lines[7].trim());
    }

    @Test
    public void MyTest5()
    {
        // Pressing 'X' should not influence the AddCard's logic under with focus, when no input
        String[] lines ;
        assertEquals("", app.screen().trim());
        app.touch(1,5) ;
        app.touch(2,5) ;
        app.touch(3,5) ;
        app.touch(1,6) ;

        app.execute("E") ; // Settings Page
        assertEquals("Settings", app.screen().trim());
        app.touch(1,1) ; // Add New Card
        assertEquals("Add Card", app.screen().trim());


        app.touch(2,3); // Focus on card code
        app.touch(1,5); // 1
        app.touch(2,5); // 2
        app.touch(3,8); // X
        app.touch(3,8); // X, No input at the moment
        app.touch(3,8); // X, Should not influence the logic
        app.touch(1,6); // 4
        app.touch(3,6); // 6
        app.touch(2,7); // 8
        app.touch(1,2); // Focus on card number
        app.touch(1,6); // 4
        app.touch(2,6); // 5
        app.touch(3,6); // 6
        app.touch(3,8); // X
        app.touch(3,8); // X
        app.touch(3,8); // X, No input at the moment
        app.touch(3,8); // X, Should not influence the logic
        app.touch(1,7); // 7
        app.touch(2,7); // 8
        app.touch(3,7); // 9
        app.touch(3,7); // 9
        app.touch(3,7); // 9
        app.touch(3,7); // 9
        app.touch(3,7); // 9
        app.touch(3,7); // 9
        app.touch(3,7); // 9

        app.display() ;
        lines = app.screenContents().split("\n");
        assertEquals("[789999999]", lines[4].trim());
        assertEquals("[468]", lines[5].trim());

        app.next() ;
        app.display() ;
        assertEquals("My Cards", app.screen().trim());
        lines = app.screenContents().split("\n");
        assertEquals("$20.00", lines[7].trim());
    }

    @Test
    public void MyTest6()
    {
    }

    @After
    public void tearDown()
    {
    }
}