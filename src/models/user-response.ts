export interface UserResponse {
    data: UserData;
    error: boolean;
}

export interface UserData {
    users: UserItem[];
}

export interface UserItem {
    createdAt: string;
    email: string;
    id: string;
    name: string;
    type: string;
    updatedAt: string;
    username: string;
}