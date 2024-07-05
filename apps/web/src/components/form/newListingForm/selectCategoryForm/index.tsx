'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useGetListingsCategory } from '@/features/listings/hooks/useGetListings';

export const SelectCategory = ({ onNext }: any) => {
  const { categories } = useGetListingsCategory();
  const getCategory = localStorage.getItem('selectedCategory');
  const [selectedCategory, setSelectedCategory] = useState(
    getCategory ? getCategory : '',
  );

  const handleCategoryClick = (id: any) => {
    setSelectedCategory(id);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem('selectedCategory', selectedCategory);
    onNext();
  };

  return (
    <form className="flex flex-col gap-4 w-3/5 h-full" onSubmit={handleSubmit}>
      <div className="flex items-center justify-center font-semibold text-xl">
        Pick a category
      </div>
      <div className="grid grid-cols-3 gap-10 w-full h-full pt-7">
        {categories ? (
          categories.map((item: any) => {
            const isSelected = item.id === Number(selectedCategory);
            return (
              <div
                key={item.id}
                className={`w-full flex items-center justify-center cursor-pointer ${isSelected ? 'bg-zinc-200 rounded-lg shadow-xl' : ''}`}
                onClick={() => handleCategoryClick(item.id)}
              >
                <div
                  className={`border border-black rounded-lg h-12 w-44 flex items-center justify-center ${isSelected ? 'bg-zinc-200 rounded-lg shadow-xl border border-zinc-500' : ''}`}
                >
                  {item.category}
                </div>
              </div>
            );
          })
        ) : (
          <div>Loading</div>
        )}
      </div>
      <div className="flex justify-end">
<<<<<<< HEAD
        <Button className="w-28 h-8" type="submit">
=======
        <Button
          className="w-28 h-8"
          type="submit"
          disabled={!selectedCategory ? true : false}
        >
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
          Next
        </Button>
      </div>
    </form>
  );
};
