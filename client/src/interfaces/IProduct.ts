export interface IProduct {
    _id?: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: { value: number, label: string};
    user_id: string;
    createdAt?: string;
    updatedAt?: string;
}

export const defaultProductValue = {
    _id: '',
    name: '',
    price: 1000,
    description: '',
    image: '',
    category: {value: 1, label: 'Electronics'},
    user_id: '',
    createdAt: '',
    updatedAt: '',
}