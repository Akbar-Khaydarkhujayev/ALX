import {useForm, Controller} from "react-hook-form";
import Select from 'react-select'
import Modal from "../modal/Modal";
import {options} from "./SelectOptions";
import "../../styles/form.scss";
import "./productForm.scss";
import {useModal} from "../../context/modal/ModalContext";
import {defaultProductValue, IProduct} from "../../interfaces/IProduct";
import {useEffect, useState} from "react";
import {useAuth} from "../../context/auth/AuthContext.tsx";

const ProductForm = () => {

    const [error, setError] = useState('');

    const {openModal, setEdit, edit, modal} = useModal();

    const {token} = useAuth();

    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
        reset,
    } = useForm<IProduct>({
        defaultValues: edit
    });

    useEffect(() => {
        reset(edit);
    }, [modal]);

    const onSubmit = async (product: IProduct) => {
        if (token == '') {
            setError('You must log in first')
            return
        }
        const response = await fetch(
            product._id ? `/api/products/${product._id}` : "/api/products",
            {
                method: product._id ? "PUT" : "POST",
                body: JSON.stringify(product),
                headers: {
                    "Content-type": "application/json",
                    'Authorization': token,
                },
            }
        );

        const json = await response.json();

        if (response.ok) {
            document.body.classList.remove('overflow-y-hidden');
            openModal(false);
            setEdit(defaultProductValue);
        } else {
            console.log(json.error);
        }
    };

    return (
        <Modal>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="form add-product-form"
            >
                <label>
                    Title of product:
                    <input
                        type="text"
                        {...register("name", {
                            required: "Enter title",
                            minLength: {
                                value: 4,
                                message: "Minimal length is 4 characters",
                            },
                            maxLength: {
                                value: 16,
                                message: "Max length is 16 characters",
                            },
                        })}
                    />
                    <p className="error">{errors.name?.message}</p>
                </label>
                <label>
                    Price of product:
                    <div className="flex">
                        <input
                            className="add-product-form__price"
                            type="number"
                            {...register("price", {
                                valueAsNumber: true,
                                required: "Enter price",
                                min: {
                                    value: 1000,
                                    message:
                                        "Price must be higher than 1 000 UZS",
                                },
                                max: {
                                    value: 10000000000,
                                    message:
                                        "Price must be less than 10 000 000 000 UZS",
                                },
                            })}
                        />
                        <div>UZS</div>
                    </div>
                    <p className="error">{errors.price?.message}</p>
                </label>
                <label>
                    Description of product:
                    <textarea
                        className="add-product-form__description"
                        {...register("description", {
                            required: "Enter a description",
                            minLength: {
                                value: 10,
                                message: "Minimal length is 10 characters",
                            },
                            maxLength: {
                                value: 100,
                                message: "Max length is 100 characters",
                            },
                        })}
                    />
                    <p className="error">{errors.description?.message}</p>
                </label>
                <label>
                    Image:
                    <input
                        type="text"
                        {...register("image", {
                            required: "Input link for image",
                        })}
                    />
                    <p className="error">{errors.image?.message}</p>
                </label>
                <label>
                    Category:
                    <Controller
                        name="category"
                        control={control}
                        render={({field}) => (
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            <Select
                                {...field}
                                options={options}
                            >
                            </Select>
                        )}
                    />
                </label>
                <button>{edit._id ? "Edit" : "Add"} Product</button>
                <p className='error'>{error}</p>
            </form>
        </Modal>
    );
};

export default ProductForm;
