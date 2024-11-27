import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import TodoCard from "../../component/ToDoCard/ToDoCard";
import Navbar from "../../component/Navbar/Navbar";

const TodoListPage: React.FC = () => {
    const [todos, setTodos] = useState<{ id: number; title: string; description: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate(); // Initialize useNavigate
    const accessToken = localStorage.getItem("accessToken");

    // Helper function to decode JWT and extract username
    const getUsernameFromToken = (token: string): string | null => {
        try {
            const payloadBase64 = token.split(".")[1]; // JWT payload
            const decodedPayload = atob(payloadBase64); // Decode Base64
            const payload = JSON.parse(decodedPayload); // Parse JSON
            return payload.sub || null; // Return username if exists
        } catch (err) {
            console.error("Failed to parse token:", err);
            return null;
        }
    };

    const username = accessToken ? getUsernameFromToken(accessToken) : null;

    useEffect(() => {
        const fetchTodos = async () => {
            if (!accessToken) {
                navigate("/login"); // Redirect to login if token is missing
                return;
            }

            if (!username) {
                setError("Failed to determine username from token. Please log in again.");
                setLoading(false);
                navigate("/login"); // Redirect to login if username can't be determined
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
                    // If unauthorized or forbidden, redirect to login
                    navigate("/login");
                    return;
                }

                if (!response.ok) {
                    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
                }

                const data = await response.json();

                // Transform the response to include the ID for each task
                const transformedTasks = data.tasks.map((task: any) => ({
                    id: task.id, // Include the ID
                    title: task.name,
                    description: task.description,
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
            <div className="p-8">
                {todos.length === 0 ? (
                    <div>No tasks found.</div>
                ) : (
                    todos.map((todo) => (
                        <TodoCard key={todo.id} title={todo.title} description={todo.description} />
                    ))
                )}
            </div>
        </>
    );
};

export default TodoListPage;
