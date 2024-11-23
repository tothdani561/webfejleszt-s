// interfaces/TodoCardProps.ts
export interface TodoCardProps {
    title: string;
    description?: string;
}

import React from "react";

    type ModalProps = {
        isOpen: boolean;
        onClose: () => void;
        title: string;
        children?: React.ReactNode;
    };
    
const ToDoModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            >
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'}`}
                onClick={onClose}
            ></div>
            <div
                className={`bg-white rounded-lg shadow-lg p-6 w-96 z-60 relative transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-90'}`}
            >
                <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 font-bold text-xl"
                >
                    &times;
                </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default ToDoModal;