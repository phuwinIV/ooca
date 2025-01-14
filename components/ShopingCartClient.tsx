'use client';

import { useShoppingCart } from '../hook/useShopingCart';
import { ItemCard } from './ItemList';
import { SelectedItems } from './SelectedItem';
import { MembershipInput } from './MemberInput';
import { items } from '../data/items';
import { useState } from 'react';

export function ShoppingCartClient() {
  const {
    selectedItems,
    setMemberCard,
    toggleItem,
    removeItem,
    clearAll,
    getTotalPrice,
  } = useShoppingCart();

  const [showInvoice, setShowInvoice] = useState(false);

  const handlePay = () => {
    setShowInvoice(true);
  };

  return (
    <>
      <MembershipInput onChange={setMemberCard} />

      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold tracking-tight'>Choose Your Sets</h2>
        {selectedItems.size > 0 && (
          <button onClick={clearAll}>Clear All</button>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {items.map((item) => (
          <ItemCard
            key={item.name}
            item={item}
            isSelected={selectedItems.has(item.name)}
            onSelect={toggleItem}
          />
        ))}
      </div>

      <SelectedItems selectedItems={selectedItems} onRemove={removeItem} />

      <div className='text-right'>
        <h3 className='text-xl font-bold'>Total: ฿{getTotalPrice()}</h3>
        {selectedItems.size > 0 && (
          <button
            onClick={handlePay}
            className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'
          >
            Pay
          </button>
        )}
      </div>

      {showInvoice && (
        <div className='mt-6 p-4 border rounded'>
          <h2 className='text-2xl font-bold mb-4'>Invoice</h2>
          <ul>
            {Array.from(selectedItems.entries()).map(([item, count]) => (
              <li key={item}>
                {item} x{count}
              </li>
            ))}
          </ul>
          <h3 className='text-xl font-bold mt-4'>Total: ฿{getTotalPrice()}</h3>
        </div>
      )}
    </>
  );
}
