'use client';

import { useShoppingCart } from '../hook/useShopingCart';
import { ItemCard } from './ItemCard';
import { SelectedItems } from './SelectedItem';
import MembershipForm from './MemberInput';
import { items } from '../data/items';
import { useState } from 'react';

export function ShopingCartClient() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [isValidMember, setIsValidMember] = useState(false);
  const [memberDetails, setMemberDetails] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { selectedItems, toggleItem, removeItem, clearAll, getTotalPrice } =
    useShoppingCart({ isValidMember });

  const hasItems = selectedItems.size > 0;

  const { total, discountSet } = getTotalPrice();

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
        {hasItems && (
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
            {Array.from(selectedItems.entries()).map(([item, count]) => {
              const itemData = items.find((i) => i.name === item);
              const price = itemData?.price || 0;
              const itemTotal = price * count;

              return (
                <li key={item} className='flex justify-between'>
                  <span>
                    {item} x{count}
                  </span>
                  <span className='font-medium'>฿{itemTotal.toFixed(2)}</span>
                </li>
              );
            })}
          </ul>
          <div className='mt-4 pt-4 border-t'>
            {(() => {
              let discountAmount = 0;
              let memberDiscountAmount = 0;
              let setDiscountAmount = 0;

              if (isValidMember) {
                memberDiscountAmount = total * 0.1;
                discountAmount += memberDiscountAmount;
              }
              if (discountSet) {
                setDiscountAmount = (total - memberDiscountAmount) * 0.05;
                discountAmount += setDiscountAmount;
              }

              return (
                <>
                  {isValidMember && (
                    <div className='text-rose-600 text-right mb-2'>
                      Member Discount: ฿{memberDiscountAmount.toFixed(2)}
                    </div>
                  )}
                  {discountSet && (
                    <div className='text-rose-600 text-right mb-2'>
                      Set Discount: ฿{setDiscountAmount.toFixed(2)}
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className='text-right text-gray-800 font-medium'>
                      Total Discounts: ฿{discountAmount.toFixed(2)}
                    </div>
                  )}
                </>
              );
            })()}

            <h3 className='text-xl font-bold text-right'>
              Price: ฿
              {(() => {
                let finalTotal = total;
                if (isValidMember) {
                  finalTotal *= 0.9;
                }
                if (discountSet) {
                  finalTotal *= 0.95;
                }
                return finalTotal;
              })()}
            </h3>
          </div>
        </div>
      )}
    </>
  );
}
