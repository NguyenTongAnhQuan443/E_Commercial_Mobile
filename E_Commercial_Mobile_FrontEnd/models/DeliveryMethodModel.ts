class DeliveryMethodModel {
    id: number;
    name: string;
    fee: number;
    description: string;
    isActive: boolean;
    
    constructor(id: number, name: string, fee: number, description: string, isActive: boolean) {
        this.id = id;
        this.name = name;
        this.fee = fee;
        this.description = description;
        this.isActive = isActive;
    }
}

export default DeliveryMethodModel;