
public class Decorator extends Screen {

    public Decorator(State state) { super(state); }

    @Override
    public String head() {
        String head = super.head() ;
        String output = "" ;
        if (head.contains("\n")) {
            for (String token: head.split("\n")) { output += centerString(token) + "\n" ; }
            return output ;
        }

        return centerString(super.head()) + "\n\n" ;
    }

    @Override
    public String foot() {
        return centerString(super.foot()) + "\n" ;
    }

    @Override
    public String display() {
        return this.head() + this.body() + this.foot();
    }

    private String centerString(String message) {

        if (message == null || 40 <= message.length())
            return message;

        StringBuilder sb = new StringBuilder(40);

        int firstHalf = (int) Math.ceil((40 - message.length())/2F);

        for (int i = 0; i < firstHalf; i++) {
            sb.append(" ");
        }
        sb.append(message);
        while (sb.length() < 40) {
            sb.append(" ");
        }
        return sb.toString();
    }
}
