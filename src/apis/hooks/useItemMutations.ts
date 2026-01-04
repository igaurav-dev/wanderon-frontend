import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateItem, deleteItem } from '../services';
import type { Item, UpdateItemRequest, DeleteResponse } from '../../types';

const ITEMS_KEY = ['items'];

interface UpdateItemParams {
    id: string;
    data: UpdateItemRequest;
}

export function useUpdateItem() {
    const queryClient = useQueryClient();

    return useMutation<Item, Error, UpdateItemParams>({
        mutationFn: ({ id, data }) => updateItem(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ITEMS_KEY });
        },
    });
}

export function useDeleteItem() {
    const queryClient = useQueryClient();

    return useMutation<DeleteResponse, Error, string>({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ITEMS_KEY });
        },
    });
}
