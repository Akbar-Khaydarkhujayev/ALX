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

export interface getUserData {
    _id: string;
    firstName: string;
    phone: number;
    email: string;
}


export const defaultUserData = {
    _id: '',
    firstName: '',
    phone: 0,
    email: '',
}

export interface ILogin {
    _id?: string;
    email: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
}