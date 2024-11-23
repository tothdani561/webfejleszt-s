// components/TodoCard.tsx
import React, { useState } from "react";
import { TodoCardProps } from "../../interfaces";
import ToDoModal from "./ToDoModal";

const TodoCard: React.FC<TodoCardProps> = ({ title, description }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
    <>
        <div
            className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 cursor-pointer"
            onClick={handleCardClick}
        >
            <h3 className="text-xl font-bold mb-2">{title}</h3>
        </div>
        <ToDoModal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
            <p>{description}</p>
        </ToDoModal>
    </>
    );
};

export default TodoCard;