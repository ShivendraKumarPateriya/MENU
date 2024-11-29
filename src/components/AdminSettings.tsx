import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useMenuStore } from '../store/menuStore';
import { X, Plus, Trash2 } from 'lucide-react';

interface AdminSettingsProps {
  onClose: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ onClose }) => {
  const { user, updateCredentials } = useAuthStore();
  const { categories, addCategory, removeCategory } = useMenuStore();
  
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [credentialsError, setCredentialsError] = useState('');
  const [categoryError, setCategoryError] = useState('');

  const handleCredentialsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setCredentialsError('');

    if (password.length < 6) {
      setCredentialsError('Password must be at least 6 characters long');
      return;
    }

    updateCredentials(username, password);
    alert('Credentials updated successfully! Please log in again with your new credentials.');
    onClose();
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    setCategoryError('');

    if (!newCategory.trim()) {
      setCategoryError('Category name cannot be empty');
      return;
    }

    if (categories.includes(newCategory.toLowerCase())) {
      setCategoryError('Category already exists');
      return;
    }

    addCategory(newCategory.toLowerCase());
    setNewCategory('');
  };

  const handleRemoveCategory = (category: string) => {
    if (categories.length <= 1) {
      setCategoryError('Cannot remove the last category');
      return;
    }

    if (window.confirm(`Are you sure you want to remove "${category}"? All items in this category will also be removed.`)) {
      removeCategory(category);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>

        <div className="space-y-6">
          {/* Credentials Section */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Update Credentials</h3>
            <form onSubmit={handleCredentialsUpdate}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                {credentialsError && (
                  <p className="text-red-500 text-sm">{credentialsError}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600"
                >
                  Update Credentials
                </button>
              </div>
            </form>
          </section>

          {/* Categories Section */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Manage Categories</h3>
            <form onSubmit={handleAddCategory} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                  placeholder="New category name"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 text-white p-2 rounded-md hover:bg-emerald-600"
                >
                  <Plus size={20} />
                </button>
              </div>
              {categoryError && (
                <p className="text-red-500 text-sm mt-2">{categoryError}</p>
              )}
            </form>

            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                >
                  <span className="capitalize">{category}</span>
                  <button
                    onClick={() => handleRemoveCategory(category)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};