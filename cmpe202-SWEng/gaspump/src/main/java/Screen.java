import java.util.ArrayList;
import java.util.Collections;

public class Screen {

    protected State current ;

    private String head = "";
    private String body = "";
    private String foot = "";

    public Screen(State state) { current = state ; }

    public void setState(State state) { current = state ; }

    public String display() {
        this.head = head() ;
        this.body = body() ;
        this.foot += foot() ;
        return this.head + this.body + this.foot ;
    }

    public String head() { return current.titleMessage() ; }

    public String body() {
        String body = "" ;
        body += "[A]                                  [E]\n" ;
        body += "\n"                                         ;
        body += "[B]                                  [F]\n" ;
        body += "\n"                                         ;
        body += "[C]                                  [G]\n" ;
        body += "\n"                                         ;
        body += "[D]                                  [H]\n" ;
        body += "\n"                                         ;

        body = body.replace("[A]                                  [E]",
                formatButton("A", "E", current.ButtonA(), current.ButtonE()) ) ;
        body = body.replace("[B]                                  [F]",
                formatButton("B", "F", current.ButtonB(), current.ButtonF()) ) ;
        body = body.replace("[C]                                  [G]",
                formatButton("C", "G", current.ButtonC(), current.ButtonG()) ) ;
        body = body.replace("[D]                                  [H]",
                formatButton("D", "H", current.ButtonD(), current.ButtonH()) ) ;

        return body ;
    }

    public String foot() {
        ArrayList<String> ad = new ArrayList<>() ;
        ad.add("Join our Rewards Program.") ;
        ad.add("Hungry? Visit our Snack Bar.") ;
        ad.add("Save with a Car Wash.") ;
        ad.add("Star Wars Movie Preview.") ;
        ad.add("New on HBO Now.") ;
        ad.add("New iPhone 13 at AT&T.") ;
        ad.add("Macy's Summer Clearance.") ;
        ad.add("Get Your Smog Check Now.") ;
        Collections.shuffle(ad);

        return ad.get(0) ;
    }

    private String formatButton(String leftOption, String rightOption, String leftArg, String rightArg) {
        // 40
        String out = "" ;
        String leftComponent = String.format("[%s] %s", leftOption, leftArg) ;
        String rightComponent = String.format("%s [%s]", rightArg, rightOption) ;

        int spaceLength = 40 - (leftComponent.length() + rightComponent.length()) ;
        String spaces = (spaceLength==0)?"":String.format("%" + spaceLength + "s", "");

        return leftComponent + spaces + rightComponent;
    }

}
