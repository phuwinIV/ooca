'use client';

import { useState } from 'react';
import { items } from '../data/items';

interface UseShoppingCartProps {
  isValidMember: boolean;
}

export function useShoppingCart({ isValidMember }: UseShoppingCartProps) {
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(
    new Map()
  );

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
    let discountMessage = '';
    let discountSet = false;
    let discountMember = false;

    selectedItems.forEach((count, item) => {
      const selectedItem = items.find((i) => i.name === item);
      if (selectedItem) {
        const itemTotal = selectedItem.price * count;

        // Check if the item is eligible for a 5% discount
        if (
          count >= 2 &&
          ['Orange Set', 'Pink Set', 'Green Set'].includes(item)
        ) {
          discountSet = true;
        }

        total += itemTotal;
      }
    });

    // Apply a 5% discount to the total price if eligible
    if (discountSet) {
      //   total *= 0.95;
      discountMessage += '5% discount applied on eligible items. ';
    }

    // Apply a 10% discount for members to the total price
    if (isValidMember) {
      // total *= 0.9;
      discountMember = true;
      discountMessage += '10% member discount applied. ';
    }

    return {
      total: total,
      discountMember,
      discountSet,
      discountMessage: discountMessage.trim(),
    };
  };

  return {
    selectedItems,
    toggleItem,
    removeItem,
    clearAll,
    getTotalPrice,
  };
}
