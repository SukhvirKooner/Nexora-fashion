import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CategoryAccordionProps {
  title: string;
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

const CategoryAccordion: React.FC<CategoryAccordionProps> = ({
  title,
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
  };

  return (
    <div className="border-b border-gray-200 py-2">
      <button
        className="flex w-full items-center justify-between text-lg font-semibold py-2"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="pt-2 pb-4 pl-4 text-sm">
          {categories.map((category) => (
            <li key={category} className="mb-1">
              <button
                className={`cursor-pointer hover:underline text-left w-full ${
                  selectedCategories.includes(category) ? 'font-bold' : ''
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryAccordion;
