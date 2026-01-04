import type { Item } from '../types';

interface ItemCardProps {
    item: Item;
    onEdit: (item: Item) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export function ItemCard({ item, onEdit, onDelete, isDeleting }: ItemCardProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">
                    {item.name}
                </h3>
            </div>

            {item.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
            )}

            <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">Qty:</span>
                    <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                        {item.quantity}
                    </span>
                </div>
                {item.price !== undefined && (
                    <p className="text-xl font-bold text-emerald-600">
                        ${item.price.toFixed(2)}
                    </p>
                )}
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                    onClick={() => onEdit(item)}
                    className="flex-1 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(item._id)}
                    disabled={isDeleting}
                    className="flex-1 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
}
