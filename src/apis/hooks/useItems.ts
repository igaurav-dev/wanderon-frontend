import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getItems, getItem, createItem } from '../services';
import type { Item, CreateItemRequest } from '../../types';

const ITEMS_KEY = ['items'];

export function useItems() {
    return useQuery<Item[], Error>({
        queryKey: ITEMS_KEY,
        queryFn: getItems,
    });
}

export function useItem(id: string) {
    return useQuery<Item, Error>({
        queryKey: [...ITEMS_KEY, id],
        queryFn: () => getItem(id),
        enabled: !!id,
    });
}

export function useCreateItem() {
    const queryClient = useQueryClient();

    return useMutation<Item, Error, CreateItemRequest>({
        mutationFn: createItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ITEMS_KEY });
        },
    });
}
