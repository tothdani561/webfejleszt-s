/*import axios from "axios";
import { useEffect, useState } from "react";
import TodoCard from "../../component/ToDoCard/ToDoCard";
import { Todo } from "../../interfaces";

const ToDoCardPage: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchTodos = async () => {
            try {
            const response = await axios.get<Todo[]>("https://api.example.com/todos");
            setTodos(response.data);
            } catch (err) {
            setError("Failed to load todos");
            } finally {
            setLoading(false);
            }
        };
    
        fetchTodos();
        }, []);
    
        if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
        }
    
        if (error) {
        return <div className="text-center mt-10 text-red-600">{error}</div>;
        }
    
        return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-xl">
            <h1 className="text-3xl font-bold text-center my-8">Todo List</h1>
            {todos.map((todo) => (
                <TodoCard key={todo.id} title={todo.title} description={todo.description} />
            ))}
            </div>
        </div>
    );
};

export default ToDoCardPage;*/



import React from "react";
import TodoCard from "../../component/ToDoCard/ToDoCard";
import Navbar from "../../component/Navbar/Navbar";
import { TodoCardProps } from "../../interfaces";

const TodoListPage: React.FC = () => {
    const todos: TodoCardProps[] = [
        { title: "Learn React", description: "Learn the basics of React" },
        { title: "Practice TypeScript", description: "Enhance TypeScript skills" },
        { title: "Build a Modal", description: "Create a modal component" },
        ];

    return (
        <>
            <Navbar />
            <div className="p-8">
            {todos.map((todo, index) => (
                <TodoCard key={index} title={todo.title} description={todo.description} />
            ))}
            </div>
        </>
    );
};

export default TodoListPage;