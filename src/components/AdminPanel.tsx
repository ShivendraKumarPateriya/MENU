import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenuStore } from '../store/menuStore';
import { useAuthStore } from '../store/authStore';
import { MenuItem } from '../types/menu';
import { MenuGrid } from './MenuGrid';
import { MenuForm } from './MenuForm';
import { AdminSettings } from './AdminSettings';
import { Plus, LogOut, Settings } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { items, categories, addItem, updateItem, removeItem } = useMenuStore();
  const { isAuthenticated, logout } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | undefined>();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      removeItem(id);
    }
  };

  const handleSubmit = (item: MenuItem) => {
    if (editingItem) {
      updateItem(item.id, item);
    } else {
      addItem(item);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setEditingItem(undefined);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
          >
            <Plus size={20} /> Add New Item
          </button>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Settings size={20} /> Settings
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg capitalize ${
                selectedCategory === category
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <MenuGrid
        items={items}
        category={selectedCategory}
        isAdmin={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <MenuForm
          item={editingItem}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsFormOpen(false);
            setEditingItem(undefined);
          }}
          categories={categories}
        />
      )}

      {isSettingsOpen && (
        <AdminSettings onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
};