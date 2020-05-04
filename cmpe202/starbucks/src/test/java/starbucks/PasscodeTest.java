/* (c) Copyright 2018 Paul Nguyen. All Rights Reserved */

package starbucks;

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class PasscodeTest
{

    IApp app ;

    public PasscodeTest()
    {
    }

    @Before
    public void setUp()
    {
        app = (IApp) Device.getNewInstance() ;
    }

   @Test
    public void PasscodeTest1()
    {
        assertEquals("", app.screen().trim());
        app.touch(1,5) ;
        app.touch(2,5) ;
        app.touch(3,5) ;
        app.touch(1,6) ;
        assertEquals("My Cards", app.screen().trim());
    }
    @Test
    public void PasscodeTest2()
    {
        app = (IApp) Device.getNewInstance("2468") ;
        assertEquals("", app.screen().trim());
        app.touch(2,5) ;
        app.touch(1,6) ;
        app.touch(3,6) ;
        app.touch(2,7) ;
        assertEquals("My Cards", app.screen().trim());
    }

    @Test
    public void PasscodeTest3()
    {
        app = (IApp) Device.getNewInstance("111111") ;
        assertEquals("", app.screen().trim());
        app.touch(1,5) ;
        app.touch(1,5) ;
        app.touch(1,5) ;
        app.touch(1,5) ;
        app.touch(1,5) ;
        app.touch(1,5) ;
        assertEquals("My Cards", app.screen().trim());
    }

    @Test
    public void PasscodeTest4()
    {
        app.display() ;
        app.touch(1,5) ;
        app.screenContents() ;
        app.touch(2,5) ;
        app.touch(1,5) ;
        app.touch(1,6) ;

        app.display() ;
        app.screenContents();
        app.touch(1,5);
        app.screenContents();
        // ERROR HERE ;
        app.touch(2,5);
        app.touch(3,5);
        app.screenContents();
        app.touch(1,6);

    }

    @Test
    public void PasscodeTest5()
    {
        app.display() ;
        app.touch(3,8) ;
        app.touch(3,8) ;
        app.touch(1,5) ;
        app.display() ;
        app.display() ;
    }

    @Test
    public void PasscodeTest6()
    {
        app.display();
        app.touch(1,5) ;
        app.touch(1,5) ;
        app.touch(1,5) ;
        app.touch(1,5) ;
        app.display() ;
        System.err.println("qwer");
    }

    @Test
    public void PasscodeTest7()
    {
//        System.out.println("qwer          ".replaceAll("\\s+$",""));
//        System.out.println(this + "qwer" + true);
        String[] a = {"1", null, "3"};
        String[] b = {"1", null, "3"};
        List<String> lista = new ArrayList<String>(Arrays.asList(a));
        List<String> listb = new ArrayList<String>(Arrays.asList(b));
        lista.set(0, "qwer");
        listb.set(0, "qwer");
        System.out.println(lista);
        System.out.println(listb);
    }

    @Test
    public void PasscodeTest8()
    {
        ConcurrentHashMap<String, Integer>
                chm = new ConcurrentHashMap<String, Integer>();

        chm.put("Geeks", 100);
        chm.put("GFG", 10);
        chm.put("GeeksforGeeks", 25);
        chm.put("Contribute", 102);

        System.out.println(chm.get("1234"));

        Integer tmp = chm.get("1234");
        if (tmp == null) {
            System.out.println("qewr");
        }
    }

    @After
    public void tearDown()
    {
    }
}