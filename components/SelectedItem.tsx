import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface SelectedItemsProps {
  selectedItems: Map<string, number>;
  onRemove: (item: string) => void;
}

export function SelectedItems({
  selectedItems = new Map(),
  onRemove,
}: SelectedItemsProps) {
  if (selectedItems.size === 0) return null;

  return (
    <div className='mt-6 space-y-2'>
      <div className='text-gray-600'>Selected Sets:</div>
      <div className='flex flex-wrap gap-2'>
        {Array.from(selectedItems.entries()).map(([item, count]) => (
          <Badge
            key={item}
            variant='secondary'
            className='text-sm flex items-center gap-1 pr-1'
          >
            {item} - {count} set
            <button
              onClick={() => onRemove(item)}
              className='hover:bg-gray-200 rounded-full p-1'
              aria-label={`Remove ${item}`}
            >
              <X size={12} />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
