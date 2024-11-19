import CategoryModel from "./CategoryModel";
import ImageModel from "./ImageModel";
import ReviewModel from "./ReviewModel";

class ProductModel {
    id: number;
    name: string;
    description: string;
    price: number;
    weight: string;
    quantity: number;
    avgRating: number;
    category: CategoryModel;
    images: ImageModel[];
    reviews: ReviewModel[];

    constructor(id: number, name: string, description: string, price: number, weight: string, quantity: number, avgRating: number, category: CategoryModel, images: ImageModel[], reviews: ReviewModel[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.weight = weight;
        this.quantity = quantity;
        this.avgRating = avgRating;
        this.category = category;
        this.images = images;
        this.reviews = reviews;
    }
}

export default ProductModel;