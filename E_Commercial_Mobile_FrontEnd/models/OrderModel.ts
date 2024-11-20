import CreditCardModel from "./CreditCardModel";
import OrderDetailModel from "./OrderDetailModel";

class OrderModel {
    createdDate: Date;
    shippingAddress: string;
    shippingDate: Date;
    shippingFee: number;
    status: string;
    orderDetails: OrderDetailModel[];
    paymentMethod: number;
    creditCard: CreditCardModel;
    deliveryMethod: number;
    promotion: string;
    user: number;
  
    constructor(createdDate: Date, shippingAddress: string, shippingDate: Date, 
      shippingFee: number, status: string, orderDetails: OrderDetailModel[], paymentMethod: number, 
      creaditCard: CreditCardModel, deliveryMethod: number, promotion: string, user: number) {
      this.createdDate = createdDate;
      this.shippingAddress = shippingAddress;
      this.shippingDate = shippingDate;
      this.shippingFee = shippingFee;
      this.status = status;
      this.orderDetails = orderDetails;
      this.paymentMethod = paymentMethod;
      this.creditCard = creaditCard;
      this.deliveryMethod = deliveryMethod;
      this.promotion = promotion;
      this.user = user;
    }
  }
  
  export default OrderModel;