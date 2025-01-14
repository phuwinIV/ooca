import { type Item } from '../types/type';

interface ItemCardProps {
  item: Item;
  isSelected: boolean;
  onSelect: (name: string) => void;
}

export function ItemCard({ item, isSelected, onSelect }: ItemCardProps) {
  return (
    <button
      onClick={() => onSelect(item.name)}
      className={`
        ${item.color}
        rounded-lg p-4 transition-all duration-200
        border-2 
        ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500 scale-105' : ''}
        hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      `}
      aria-selected={isSelected}
      role='option'
    >
      <span className='font-medium'>{item.name}</span>
      <br />
      <span>{item.price} THB</span>
    </button>
  );
}
