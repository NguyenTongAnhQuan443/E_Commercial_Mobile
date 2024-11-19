import ProductModel from "./ProductModel";

class CartItemlModel {
  product: ProductModel;
  quantity: number;
  price: number;

  constructor(product: ProductModel, quantity: number, price: number) {
    if (quantity <= 0 || price < 0) {
        throw new Error("Quantity and price must be greater than 0.");
      }
    this.product = product;
    this.quantity = quantity;
    this.price = price;
  }

}

export default CartItemlModel;