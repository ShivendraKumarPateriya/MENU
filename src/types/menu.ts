export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
};

export interface MenuState {
  items: MenuItem[];
  categories: string[];
  addItem: (item: MenuItem) => void;
  updateItem: (id: string, item: Partial<MenuItem>) => void;
  removeItem: (id: string) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
}