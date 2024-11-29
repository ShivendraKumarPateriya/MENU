import React from 'react';
import { MenuItem } from '../types/menu';
import { Edit2, Trash2 } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  isAdmin?: boolean;
  onEdit?: (item: MenuItem) => void;
  onDelete?: (id: string) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  isAdmin = false,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
          <span className="text-lg font-bold text-emerald-600">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="mt-2 text-gray-600">{item.description}</p>
        {isAdmin && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => onEdit?.(item)}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <Edit2 size={16} /> Edit
            </button>
            <button
              onClick={() => onDelete?.(item.id)}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};