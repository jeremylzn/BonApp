export interface User {
    isAdmin: boolean;
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    password?: string;
    __v?: number;
    token?: string;
}

export interface AuthResponseData {
    user: User;
    token: string;
}

