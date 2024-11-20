class CreditCardModel {
    id: number;
    cardNumber: string;
    expirationDate: string;
    cvv: string;

    constructor(id?: number, cardNumber?: string, expirationDate?: string, cvv?: string) {
        this.id = id || 0;
        this.cardNumber = cardNumber || ''; 
        this.expirationDate = expirationDate || '';
        this.cvv = cvv || '';
    }
}

export default CreditCardModel;