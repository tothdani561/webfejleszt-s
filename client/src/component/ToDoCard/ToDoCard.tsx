// components/TodoCard.tsx
import React from "react";
import { TodoCardProps } from "../../interfaces";

const TodoCard: React.FC<TodoCardProps> = ({ title, description, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 flex flex-col justify-between h-full">
            <div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
            <div className="flex justify-end mt-4 space-x-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoCard;
