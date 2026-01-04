import { useState, useEffect } from 'react';
import type { Item, CreateItemRequest } from '../types';

interface ItemFormProps {
    item?: Item | null;
    onSubmit: (data: CreateItemRequest) => void;
    onCancel: () => void;
    isLoading: boolean;
}

export function ItemForm({ item, onSubmit, onCancel, isLoading }: ItemFormProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (item) {
            setName(item.name);
            setDescription(item.description || '');
            setQuantity(item.quantity);
            setPrice(item.price);
        }
    }, [item]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, description: description || undefined, quantity, price });
    };

    const inputClass = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors";

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className={inputClass}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                    <input
                        type="number"
                        min="0"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className={inputClass}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={price ?? ''}
                        onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : undefined)}
                        className={inputClass}
                    />
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {isLoading ? 'Saving...' : item ? 'Update' : 'Create'}
                </button>
            </div>
        </form>
    );
}
