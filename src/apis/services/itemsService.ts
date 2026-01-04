import { axiosInstance } from '../axiosInstance';
import type { Item, CreateItemRequest, UpdateItemRequest, DeleteResponse } from '../../types';

export async function getItems(): Promise<Item[]> {
    const response = await axiosInstance.get<Item[]>('/items');
    return response.data;
}

export async function getItem(id: string): Promise<Item> {
    const response = await axiosInstance.get<Item>(`/items/${id}`);
    return response.data;
}

export async function createItem(data: CreateItemRequest): Promise<Item> {
    const response = await axiosInstance.post<Item>('/items', data);
    return response.data;
}

export async function updateItem(id: string, data: UpdateItemRequest): Promise<Item> {
    const response = await axiosInstance.patch<Item>(`/items/${id}`, data);
    return response.data;
}

export async function deleteItem(id: string): Promise<DeleteResponse> {
    const response = await axiosInstance.delete<DeleteResponse>(`/items/${id}`);
    return response.data;
}
