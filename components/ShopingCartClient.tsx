'use client';

import { useShoppingCart } from '../hook/useShopingCart';
import { ItemCard } from './ItemCard';
import { SelectedItems } from './SelectedItem';
import MembershipForm from './MemberInput';
import { items } from '../data/items';
import { useState } from 'react';

export function ShoppingCartClient() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [isValidMember, setIsValidMember] = useState(false);
  const [memberDetails, setMemberDetails] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Pass isValidMember to the hook
  const { selectedItems, toggleItem, removeItem, clearAll, getTotalPrice } =
    useShoppingCart({ isValidMember });

  const { total, discountMessage } = getTotalPrice();

  const handleMembershipChange = (isMember: boolean) => {
    if (!isMember) {
      setIsValidMember(false);
      setMemberDetails(null);
    }
  };

  const handlePay = () => {
    setShowInvoice(true);
  };

  const handleValidationChange = (
    isValid: boolean,
    memberData?: { id: string; name: string }
  ) => {
    setIsValidMember(isValid);
    setMemberDetails(memberData || null);
  };

  return (
    <>
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

      <div className='p-4'>
        <MembershipForm
          onMembershipChange={handleMembershipChange}
          onValidationChange={handleValidationChange}
        />

        {isValidMember && memberDetails && (
          <div className='mt-6 p-4 bg-green-50 rounded-lg'>
            <h3 className='text-lg font-semibold text-green-800'>
              Verified Member
            </h3>
            <p className='text-green-700'>
              ID: {memberDetails.id} <br />
              Name: {memberDetails.name}
            </p>
            <p className='text-green-700 mt-2 font-medium'>
              Member Discount: 10% off
            </p>
          </div>
        )}
      </div>

      <div className='text-right'>
        <h3 className='text-xl font-bold'>
          <p>Total Price: {total}</p>
          {isValidMember && (
            <span className='text-green-600 text-sm ml-2'>
              (10% member discount applied)
            </span>
          )}
        </h3>
        {selectedItems.size > 0 && (
          <button
            onClick={handlePay}
            className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors'
          >
            Pay
          </button>
        )}
      </div>

      {showInvoice && (
        <div className='mt-6 p-4 border rounded'>
          <h2 className='text-2xl font-bold mb-4'>Invoice</h2>
          <ul className='space-y-2'>
            {Array.from(selectedItems.entries()).map(([item, count]) => (
              <li key={item} className='flex justify-between'>
                <span>
                  {item} x{count}
                </span>
                <span className='font-medium'>
                  ฿{(items.find((i) => i.name === item)?.price || 0) * count}
                </span>
              </li>
            ))}
          </ul>
          <div className='mt-4 pt-4 border-t'>
            {isValidMember && (
              <div className='text-green-600 text-right mb-2'>
                Member Discount: -10%
              </div>
            )}
            <h3 className='text-xl font-bold text-right'>
              <p>Total Price: {total}</p>
              {discountMessage && <p>{discountMessage}</p>}
            </h3>
          </div>
        </div>
      )}
    </>
  );
}
