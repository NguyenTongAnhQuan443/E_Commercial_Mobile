class UserModel {
    id: number;
    fullName: string;
    email: string;
    gender: string;
    phone: string;
    address: string;
    enabled: boolean;
    avatar: string;
    
    constructor(id: number, fullName: string, email: string, gender?: string, phone?: string, address?: string, enabled?: boolean, avatar?: string) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.gender = gender || '';
        this.phone = phone || '';
        this.address = address || '';
        this.enabled = enabled || false;
        this.avatar = avatar || '';
    }

}

export default UserModel;