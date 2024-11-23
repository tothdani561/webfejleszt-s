export interface Todo {
    id: number;
    title: string;
    description: string;
}

export interface TodoCardProps {
    title: string;
    description: string;
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