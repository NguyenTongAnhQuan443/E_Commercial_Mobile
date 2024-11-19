class PromotionModel {
    id: number;
    code: string;
    description: string;
    discount: number;
    active: boolean;
    startDate: Date;
    endDate: Date;

    constructor(id: number, code: string, description: string, discount: number, active: boolean, startDate: Date, endDate: Date) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.discount = discount;
        this.active = active;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

export default PromotionModel;