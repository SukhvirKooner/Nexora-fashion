import React, { useState, useEffect } from 'react';
import CategoryAccordion from './CategoryAccordion';

interface SidebarFilterProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({
  selectedCategories,
  onCategoryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && isMobile && !target.closest('.sidebar-content')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isMobile]);

  const menCategories = ['Coat', 'Shirt',  'Sweater', 'Boots', 'Sneakers', 'Belt', 'Denim','Trousers', 'Loafers'];
  const womenCategories = ['Blouse', 'Handbag', 'Trench', 'Jacket', 'Scarf', 'T-Shirt', 'Wide-Leg', 'Cardigan', 'Sunglasses'];

  return (
    <div className="relative">
      <button
        className={`fixed top-20 left-4 z-50 h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer text-black lg:hidden ${
          isOpen && isMobile ? 'opacity-0 pointer-events-none' : ''
        }`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <span
          className={`absolute block h-0.5 w-5 bg-black transform transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'top-4'}`}
        ></span>
        <span
          className={`absolute block h-0.5 w-5 bg-black transform transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'top-5'}`}
        ></span>
        <span
          className={`absolute block h-0.5 w-5 bg-black transform transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'top-6'}`}
        ></span>
      </button>

      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`sidebar-content fixed left-0 top-0 z-40 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:translate-x-0 lg:shadow-none lg:w-full`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filter</h2>
            {isMobile && !isOpen && (
              <button 
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-2"
                aria-label="Close sidebar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
          <div className="mt-4">
            <CategoryAccordion
              title="MEN"
              categories={menCategories}
              selectedCategories={selectedCategories}
              onCategoryChange={onCategoryChange}
            />
          </div>
          <CategoryAccordion
            title="WOMEN"
            categories={womenCategories}
            selectedCategories={selectedCategories}
            onCategoryChange={onCategoryChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
