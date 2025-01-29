'use client';

import { useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
}

export default function CategoryFilter() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">分类</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <label key={category.id} className="flex items-center">
            <input
              type="radio"
              name="category"
              value={category.id}
              checked={selectedCategory === category.id}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mr-2"
            />
            {category.name}
          </label>
        ))}
      </div>
    </div>
  );
}