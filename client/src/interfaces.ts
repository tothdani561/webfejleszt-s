export interface Todo {
    id: number;
    title: string;
    description: string;
}

export interface TodoCardProps {
    title: string;
    description: string;
    onEdit: () => void;
    onDelete: () => void;
}

export interface RegistrationData {
    username: string;
    password: string;
    email: string;
}

export interface LoginData {
    username: string;
    password: string;
}