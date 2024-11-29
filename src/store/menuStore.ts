import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MenuState, MenuItem } from '../types/menu';

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      categories: ['appetizers', 'main', 'desserts', 'beverages'],
      items: [
        {
          id: '1',
          name: 'Bruschetta',
          description: 'Grilled bread rubbed with garlic and topped with tomatoes, olive oil, and herbs',
          price: 8.99,
          category: 'appetizers',
          image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&q=80&w=800',
        },
        {
          id: '2',
          name: 'Grilled Salmon',
          description: 'Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables',
          price: 24.99,
          category: 'main',
          image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=800',
        },
      ],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      updateItem: (id, updatedItem) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updatedItem } : item
          ),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),
      removeCategory: (category) =>
        set((state) => ({
          categories: state.categories.filter((c) => c !== category),
          items: state.items.filter((item) => item.category !== category),
        })),
    }),
    {
      name: 'menu-storage',
    }
  )
);