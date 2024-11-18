class ReviewModel {
    id: number;
    rating: number;
    comment: string;
    reviewDate: Date;
    username: string;

    constructor(id: number, rating: number, comment: string, reviewDate: Date, username: string) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.reviewDate = reviewDate;
        this.username = username;
    }

}

export default ReviewModel;