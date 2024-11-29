import React, { useState } from 'react';
import { useMenuStore } from '../store/menuStore';
import { MenuGrid } from './MenuGrid';
import { MenuCategory } from '../types/menu';
import { Search } from 'lucide-react';

const categories: MenuCategory[] = ['appetizers', 'main', 'desserts', 'beverages'];

export const ClientView: React.FC = () => {
  const { items } = useMenuStore();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('appetizers');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
          <p className="text-gray-300 max-w-2xl">
            Discover our carefully curated selection of dishes, prepared with the finest ingredients
            and served with passion.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg capitalize whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <MenuGrid
          items={searchQuery ? filteredItems : items}
          category={selectedCategory}
        />
      </div>
    </div>
  );
};