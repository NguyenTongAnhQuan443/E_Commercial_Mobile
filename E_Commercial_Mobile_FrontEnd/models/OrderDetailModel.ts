class OrderDetailModel {
    orderDetailID: number;
    quantity: number;
    salePrice: number;
  
    constructor(orderDetailID: number, quantity: number, salePrice: number) {
      this.orderDetailID = orderDetailID;
      this.quantity = quantity;
      this.salePrice = salePrice;
    }
  }
  
  export default OrderDetailModel;