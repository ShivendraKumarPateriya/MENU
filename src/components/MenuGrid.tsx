import React from 'react';
import { MenuCard } from './MenuCard';
import { MenuItem, MenuCategory } from '../types/menu';

interface MenuGridProps {
  items: MenuItem[];
  category: MenuCategory;
  isAdmin?: boolean;
  onEdit?: (item: MenuItem) => void;
  onDelete?: (id: string) => void;
}

export const MenuGrid: React.FC<MenuGridProps> = ({
  items,
  category,
  isAdmin = false,
  onEdit,
  onDelete,
}) => {
  const filteredItems = items.filter((item) => item.category === category);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};