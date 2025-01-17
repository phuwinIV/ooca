import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ShopingCartClient from '@/components/ShopingCartClient';

describe('ShopingCartClient component', () => {
  const selectedItems = new Map([
    ['item1', 2],
    ['item2', 3],
  ]);

  const getTotalPrice = jest.fn(() => 500);

  it('should render invoice when showInvoice is true', () => {
    render(
      <ShopingCartClient
        showInvoice={true}
        selectedItems={selectedItems}
        getTotalPrice={getTotalPrice}
      />
    );

    expect(screen.getByText('Invoice')).toBeInTheDocument();
    expect(screen.getByText('item1 x2')).toBeInTheDocument();
    expect(screen.getByText('item2 x3')).toBeInTheDocument();
    expect(screen.getByText('Total: ฿500')).toBeInTheDocument();
  });

  it('should not render invoice when showInvoice is false', () => {
    render(
      <ShopingCartClient
        showInvoice={false}
        selectedItems={selectedItems}
        getTotalPrice={getTotalPrice}
      />
    );

    expect(screen.queryByText('Invoice')).not.toBeInTheDocument();
  });
});
