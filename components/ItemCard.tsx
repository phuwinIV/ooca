import { type Item } from '../types/type';

interface ItemCardProps {
  item: Item;
  isSelected: boolean;
  onSelect: (name: string) => void;
}

export function ItemCard({ item, isSelected, onSelect }: ItemCardProps) {
  let bgColor = '';

  if (item.name === 'Red Set') {
    bgColor = 'bg-red-100 hover:bg-red-200 border-red-200';
  } else if (item.name === 'Green Set') {
    bgColor = 'bg-green-100 hover:bg-green-200 border-green-200';
  } else if (item.name === 'Blue Set') {
    bgColor = 'bg-blue-100 hover:bg-blue-200 border-blue-200';
  } else if (item.name === 'Yellow Set') {
    bgColor = 'bg-yellow-100 hover:bg-yellow-200 border-yellow-200';
  } else if (item.name === 'Pink Set') {
    bgColor = 'bg-pink-100 hover:bg-pink-200 border-pink-200';
  } else if (item.name === 'Purple Set') {
    bgColor = 'bg-purple-100 hover:bg-purple-200 border-purple-200';
  } else if (item.name === 'Orange Set') {
    bgColor = 'bg-orange-100 hover:bg-orange-200 border-orange-200';
  }

  return (
    <button
      onClick={() => onSelect(item.name)}
      className={`
        ${bgColor}
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
