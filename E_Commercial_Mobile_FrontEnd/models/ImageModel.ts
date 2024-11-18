class ImageModel {
    id: number;
    name: string;
    imageUri: string;

    constructor(id: number, name: string, imageUri: string) {
        this.id = id;
        this.name = name;
        this.imageUri = imageUri;
    }
}

export default ImageModel;