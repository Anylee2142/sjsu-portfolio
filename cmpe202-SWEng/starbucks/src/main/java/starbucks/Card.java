package starbucks;

/** Class for Added Card*/
public class Card
{

    private String cardNumber = "";
    private float balance = -1;

    /**
     * Constructor for Card class
     * @param cardNumber indicates 9-digit card number
     * @param balance
     * */
    public Card(
            String cardNumber,
            float balance
    ) {
        this.cardNumber = cardNumber ;
        this.balance = balance ;
    }

    /** Get balance */
    public float getBalance() {
        return balance;
    }

    /** Get card number of instance*/
    public String getCardNumber() {
        return cardNumber;
    }

    /** Pay $1.5 */
    public void payCard() { if (balance >= 1.5) balance -= (float)1.5; }
}
