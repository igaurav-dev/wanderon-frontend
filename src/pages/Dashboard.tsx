import { useState } from 'react';
import toast from 'react-hot-toast';
import { useItems, useCreateItem, useUpdateItem, useDeleteItem } from '../apis';
import { ItemCard, Modal, ItemForm } from '../components';
import { getErrorMessage, isAuthError } from '../utils';
import type { Item, CreateItemRequest } from '../types';

export function Dashboard() {
    const { data: items, isLoading, error } = useItems();
    const createMutation = useCreateItem();
    const updateMutation = useUpdateItem();
    const deleteMutation = useDeleteItem();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleOpenCreate = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (item: Item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSubmit = async (data: CreateItemRequest) => {
        try {
            if (editingItem) {
                await updateMutation.mutateAsync({ id: editingItem._id, data });
                toast.success('Item updated!');
            } else {
                await createMutation.mutateAsync(data);
                toast.success('Item created!');
            }
            handleCloseModal();
        } catch (err) {
            if (!isAuthError(err)) {
                toast.error(getErrorMessage(err));
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this item?')) return;

        setDeletingId(id);
        try {
            await deleteMutation.mutateAsync(id);
            toast.success('Item deleted!');
        } catch (err) {
            if (!isAuthError(err)) {
                toast.error(getErrorMessage(err));
            }
        } finally {
            setDeletingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
        );
    }

    if (error && !isAuthError(error)) {
        return (
            <div className="max-w-xl mx-auto mt-20 p-6 bg-red-50 rounded-xl text-center">
                <p className="text-red-600">{getErrorMessage(error)}</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Items</h1>
                <button
                    onClick={handleOpenCreate}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                    + Add Item
                </button>
            </div>

            {items?.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                    <p className="text-gray-500 text-lg">No items yet. Create your first one!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items?.map((item) => (
                        <ItemCard
                            key={item._id}
                            item={item}
                            onEdit={handleOpenEdit}
                            onDelete={handleDelete}
                            isDeleting={deletingId === item._id}
                        />
                    ))}
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingItem ? 'Edit Item' : 'New Item'}>
                <ItemForm
                    item={editingItem}
                    onSubmit={handleSubmit}
                    onCancel={handleCloseModal}
                    isLoading={createMutation.isPending || updateMutation.isPending}
                />
            </Modal>
        </div>
    );
}
