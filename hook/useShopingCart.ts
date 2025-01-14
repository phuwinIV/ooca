'use client';

import { useState } from 'react';
import { items } from '../data/items';

export function useShoppingCart() {
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(
    new Map()
  );
  const [memberCard, setMemberCard] = useState<string>('');

  const isMember = memberCard.trim() !== '';

  const toggleItem = (item: string) => {
    const newSelected = new Map(selectedItems);
    if (newSelected.has(item)) {
      newSelected.set(item, newSelected.get(item)! + 1);
    } else {
      newSelected.set(item, 1);
    }
    setSelectedItems(newSelected);
  };

  const removeItem = (item: string) => {
    const newSelected = new Map(selectedItems);
    if (newSelected.has(item)) {
      const count = newSelected.get(item)!;
      if (count > 1) {
        newSelected.set(item, count - 1);
      } else {
        newSelected.delete(item);
      }
    }
    setSelectedItems(newSelected);
  };

  const clearAll = () => {
    setSelectedItems(new Map());
  };

  const getTotalPrice = () => {
    let total = 0;
    selectedItems.forEach((count, item) => {
      const selectedItem = items.find((i) => i.name === item);
      if (selectedItem) {
        let itemTotal = selectedItem.price * count;

        // Apply a 5% discount for certain items if count >= 2
        if (
          count >= 2 &&
          ['Orange Set', 'Pink Set', 'Green Set'].includes(item)
        ) {
          itemTotal *= 0.95;
        }

        // Apply a 10% discount for members
        if (isMember) {
          itemTotal *= 0.9;
        }

        total += itemTotal;
      }
    });
    return total.toFixed(2);
  };

  return {
    selectedItems,
    memberCard,
    setMemberCard,
    toggleItem,
    removeItem,
    clearAll,
    getTotalPrice,
    isMember, // Expose for UI purposes
  };
}
