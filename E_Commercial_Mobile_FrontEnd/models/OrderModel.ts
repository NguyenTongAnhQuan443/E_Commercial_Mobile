import CreditCardModel from "./CreditCardModel";
import DeliveryMethodModel from "./DeliveryMethodModel";
import OrderDetailModel from "./OrderDetailModel";
import PaymentMethodModel from "./PaymentMethodModel";
import PromotionModel from "./Promotion";
import UserModel from "./UserModel";

class OrderModel {
    createdDate: Date;
    shippingAddress: string;
    shippingDate: Date;
    shippingFee: number;
    status: string;
    orderDetails: OrderDetailModel[];
    paymentMethod: PaymentMethodModel
    creditCard: CreditCardModel;
    deliveryMethod: DeliveryMethodModel
    promotion: PromotionModel;
    user: UserModel;
  
    constructor(createdDate: Date, shippingAddress: string, shippingDate: Date, 
      shippingFee: number, status: string, orderDetails: OrderDetailModel[], paymentMethod: PaymentMethodModel,
      creditCard: CreditCardModel, deliveryMethod: DeliveryMethodModel, promotion: PromotionModel, user: UserModel) {
      this.createdDate = createdDate;
      this.shippingAddress = shippingAddress;
      this.shippingDate = shippingDate;
      this.shippingFee = shippingFee;
      this.status = status;
      this.orderDetails = orderDetails;
      this.paymentMethod = paymentMethod;
      this.creditCard = creditCard;
      this.deliveryMethod = deliveryMethod;
      this.promotion = promotion;
      this.user = user;
  }
}

export default OrderModel;