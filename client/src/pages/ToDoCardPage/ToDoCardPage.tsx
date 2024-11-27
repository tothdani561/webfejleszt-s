import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import TodoCard from "../../component/ToDoCard/ToDoCard";
import Navbar from "../../component/Navbar/Navbar";

const TodoListPage: React.FC = () => {
    const [todos, setTodos] = useState<{ id: number; title: string; description: string; priority?: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editModal, setEditModal] = useState<{ id: number; title: string; description: string; priority: string } | null>(null);

    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    const getUsernameFromToken = (token: string): string | null => {
        try {
            const payloadBase64 = token.split(".")[1];
            const decodedPayload = atob(payloadBase64);
            const payload = JSON.parse(decodedPayload);
            return payload.sub || null;
        } catch (err) {
            console.error("Failed to parse token:", err);
            return null;
        }
    };

    const username = accessToken ? getUsernameFromToken(accessToken) : null;

    useEffect(() => {
        const fetchTodos = async () => {
            if (!accessToken) {
                navigate("/login");
                return;
            }

            if (!username) {
                setError("Failed to determine username from token. Please log in again.");
                setLoading(false);
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/users/${username}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 401 || response.status === 403) {
                    navigate("/login");
                    return;
                }

                if (!response.ok) {
                    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
                }

                const data = await response.json();

                const transformedTasks = data.tasks.map((task: any) => ({
                    id: task.id,
                    title: task.name,
                    description: task.description,
                    priority: task.priority,
                }));

                setTodos(transformedTasks);
            } catch (err: any) {
                setError(err.message || "An unknown error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, [username, accessToken, navigate]);

    const handleUpdateTask = async (taskId: number, updatedTask: { name: string; description: string; priority: string }) => {
        try {
            const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error(`Failed to update task: ${response.statusText}`);
            }

            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === taskId ? { ...todo, title: updatedTask.name, description: updatedTask.description, priority: updatedTask.priority } : todo
                )
            );
            setEditModal(null);
        } catch (err: any) {
            alert(err.message || "An unknown error occurred.");
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error(`Failed to delete task: ${response.statusText}`);
            }
    
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== taskId));
        } catch (err: any) {
            alert(err.message || "An unknown error occurred.");
        }
    };
    

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="p-8">Loading tasks...</div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="p-8 text-red-500">{error}</div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {todos.length === 0 ? (
                    <div>No tasks found.</div>
                ) : (
                    todos.map((todo) => (
                        <TodoCard
                            key={todo.id}
                            title={todo.title}
                            description={todo.description}
                            onEdit={() =>
                                setEditModal({
                                    id: todo.id,
                                    title: todo.title,
                                    description: todo.description,
                                    priority: todo.priority || "COMMON",
                                })
                            }
                            onDelete={() => handleDeleteTask(todo.id)}
                        />
                    ))
                )}
            </div>


            {editModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
                        <label className="block mb-2">
                            Name:
                            <input
                                className="border p-2 w-full"
                                value={editModal.title}
                                onChange={(e) => setEditModal({ ...editModal, title: e.target.value })}
                            />
                        </label>
                        <label className="block mb-2">
                            Description:
                            <textarea
                                className="border p-2 w-full"
                                value={editModal.description}
                                onChange={(e) => setEditModal({ ...editModal, description: e.target.value })}
                            />
                        </label>
                        <label className="block mb-2">
                            Priority:
                            <select
                                className="border p-2 w-full"
                                value={editModal.priority}
                                onChange={(e) => setEditModal({ ...editModal, priority: e.target.value })}
                            >
                                <option value="COMMON">COMMON</option>
                                <option value="HIGH">HIGH</option>
                                <option value="URGENT">URGENT</option>
                            </select>
                        </label>
                        <div className="flex space-x-4 mt-4">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={() =>
                                    handleUpdateTask(editModal.id, {
                                        name: editModal.title,
                                        description: editModal.description,
                                        priority: editModal.priority,
                                    })
                                }
                            >
                                Save
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => setEditModal(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TodoListPage;
