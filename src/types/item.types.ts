export interface Item {
    _id: string;
    name: string;
    description?: string;
    quantity: number;
    price?: number;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateItemRequest {
    name: string;
    description?: string;
    quantity: number;
    price?: number;
}

export interface UpdateItemRequest {
    name?: string;
    description?: string;
    quantity?: number;
    price?: number;
}

export interface DeleteResponse {
    message: string;
}
