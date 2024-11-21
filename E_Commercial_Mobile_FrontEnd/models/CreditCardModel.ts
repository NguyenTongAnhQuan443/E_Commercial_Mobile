class CreditCardModel {
    id: number;
    cardNumber: string;
    expiryDate: string;
    cvv: string;

    constructor(id?: number, cardNumber?: string, expiryDate?: string, cvv?: string) {
        this.id = id ?? null;
        this.cardNumber = cardNumber || ''; 
        this.expiryDate = expiryDate || '';
        this.cvv = cvv || '';
    }
}

export default CreditCardModel;