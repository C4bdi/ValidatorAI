
import React from 'react';

export type CategoryType = 
  | 'djurNatur' 
  | 'husHem' 
  | 'matDryck' 
  | 'skonhetHalsa' 
  | 'modeDesign' 
  | 'teknikIT' 
  | 'sportFritid' 
  | 'kulturUtbildning';

interface CategoryOption {
  id: CategoryType;
  label: string;
  icon: string;
}

const categories: CategoryOption[] = [
  { id: 'djurNatur', label: 'Djur & Natur', icon: '🌿' },
  { id: 'husHem', label: 'Hus & hem', icon: '🏠' },
  { id: 'matDryck', label: 'Mat & dryck', icon: '🍽️' },
  { id: 'skonhetHalsa', label: 'Skönhet & hälsa', icon: '💆' },
  { id: 'modeDesign', label: 'Mode & design', icon: '👗' },
  { id: 'teknikIT', label: 'Teknik & IT', icon: '💻' },
  { id: 'sportFritid', label: 'Sport & fritid', icon: '⚽' },
  { id: 'kulturUtbildning', label: 'Kultur & utbildning', icon: '🎭' },
];

interface CategorySelectorProps {
  selectedCategory: CategoryType | null;
  onChange: (category: CategoryType) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onChange }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-medium mb-4 text-secondary">Projektkategori</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onChange(category.id)}
          >
            <span className="text-2xl mb-2">{category.icon}</span>
            <span className="text-sm text-secondary">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
