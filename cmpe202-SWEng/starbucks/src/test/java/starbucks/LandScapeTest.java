/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package starbucks;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class LandScapeTest
{

    IApp app ;

    public LandScapeTest()
    {
    }

    @Before
    public void setUp()
    {
        app = (IApp) Device.getNewInstance() ;
    }

    @Test
    public void AddCardTest1()
    {
        String[] lines ;
        assertEquals("", app.screen().trim());
        app.touch(1,5) ;
        app.touch(2,5) ;
        app.touch(3,5) ;
        app.touch(1,6) ;
        app.display() ;
        app.landscape() ;
        app.execute("A");
        app.execute("B");
        app.execute("C");
        app.execute("D");
        app.execute("E");
        app.display();
        System.err.println(StringUtils.center("$0.00", 15, 'A'));
    }

    @After
    public void tearDown()
    {
    }
}
