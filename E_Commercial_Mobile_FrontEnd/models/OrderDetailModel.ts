class OrderDetailModel {
    orderId: number;
    productId: number;
    quantity: number;
    salePrice: number;
  
    constructor(orderId?: number, productId?: number, quantity?: number, salePrice?: number) {
      this.orderId = orderId ?? null;
      this.productId = productId || 0;
      this.quantity = quantity || 0;
      this.salePrice = salePrice || 0;
    }
  }
  
  export default OrderDetailModel;