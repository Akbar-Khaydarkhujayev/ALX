import React, {createContext, useState, Dispatch, SetStateAction } from "react";
import {IProduct, defaultProductValue} from "../../interfaces/IProduct";

interface ModalContextProps {
    modal: boolean;
    edit: IProduct;
    openModal: Dispatch<SetStateAction<boolean>>;
    setEdit: Dispatch<SetStateAction<IProduct>>;
}

interface ChildrenProps {
    children: React.ReactNode;
}

export const ModalContext = createContext<ModalContextProps>({modal: false, edit: defaultProductValue} as ModalContextProps);

export const ModalProvider: React.FC<ChildrenProps> = ({children}) => {
    const [modal, openModal] = useState<boolean>(false);
    const [edit, setEdit] = useState<IProduct>(defaultProductValue);

    return (
        <ModalContext.Provider value={{
            modal: modal,
            edit: edit,
            openModal,
            setEdit,
        }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => React.useContext(ModalContext);