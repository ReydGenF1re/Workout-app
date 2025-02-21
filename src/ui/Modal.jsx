import React from 'react';
import Button from "./Button.jsx";


const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center">
            <div className="bg-zinc-900 p-4 rounded shadow-lg">
                {children}
                <Button bgColor={'bg-linear-65 from-purple-500 to-pink-500'} fn={onClose}>Закрыть</Button>
            </div>
        </div>
    );
};

export default Modal;
