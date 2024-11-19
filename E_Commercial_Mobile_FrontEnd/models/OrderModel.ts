import OrderDetailModel from "./OrderDetailModel";

class OrderModel {
    id: number;
    createdDate: Date;
    shippingAddress: string;
    shippingDate: Date;
    shippingFee: number;
    status: string;
    orderDetails: OrderDetailModel[];
    paymentMethod: string;
    deliveryMethod: string;
    promotion: string;
    user: string; // Thông tin người dùng, có thể là UserDto
  
    constructor(id: number, createdDate: Date, shippingAddress: string, shippingDate: Date, 
      shippingFee: number, status: string, orderDetails: OrderDetailModel[], paymentMethod: string, 
      deliveryMethod: string, promotion: string, user: string) {
      this.id = id;
      this.createdDate = createdDate;
      this.shippingAddress = shippingAddress;
      this.shippingDate = shippingDate;
      this.shippingFee = shippingFee;
      this.status = status;
      this.orderDetails = orderDetails;
      this.paymentMethod = paymentMethod;
      this.deliveryMethod = deliveryMethod;
      this.promotion = promotion;
      this.user = user;
    }
  }
  
  export default OrderModel;