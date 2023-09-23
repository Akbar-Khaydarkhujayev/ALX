export interface IRegister {
    _id?: string;
    firstName: string;
    lastName: string;
    phone: number;
    email: string;
    password: string;
    confirmPassword: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ILogin {
    _id?: string;
    email: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
}