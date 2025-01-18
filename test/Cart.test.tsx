import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ShopingCartClient } from '@/components/ShopingCartClient';

jest.mock('../hook/useShopingCart', () => ({
  useShoppingCart: jest.fn(),
}));

import { useShoppingCart } from '../hook/useShopingCart';

describe('ShopingCartClient Price and Discount Tests', () => {
  const mockedUseShoppingCart = useShoppingCart as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display correct total price without any discounts', () => {
    mockedUseShoppingCart.mockImplementation(() => ({
      selectedItems: new Map([['Orange Set', 1]]),
      toggleItem: jest.fn(),
      removeItem: jest.fn(),
      clearAll: jest.fn(),
      getTotalPrice: () => ({
        total: '100.00',
        discountSet: false,
        discountMember: false,
      }),
    }));

    render(<ShopingCartClient />);
    expect(screen.getByText(/Total Price: 100.00/)).toBeInTheDocument();
  });

  it('should apply set discount when buying multiple sets', () => {
    mockedUseShoppingCart.mockImplementation(() => ({
      selectedItems: new Map([['Orange Set', 2]]),
      toggleItem: jest.fn(),
      removeItem: jest.fn(),
      clearAll: jest.fn(),
      getTotalPrice: () => ({
        total: '240.00',
        discountSet: true,
        discountMember: false,
      }),
    }));

    render(<ShopingCartClient />);
    fireEvent.click(screen.getByText(/Pay/i));

    // Check if set discount is displayed correctly
    expect(screen.getByText(/Set Discount: -฿12.00/)).toBeInTheDocument();
    expect(screen.getByText(/Final Total: ฿228/)).toBeInTheDocument();
  });

  it('should handle empty cart correctly', () => {
    mockedUseShoppingCart.mockImplementation(() => ({
      selectedItems: new Map(),
      toggleItem: jest.fn(),
      removeItem: jest.fn(),
      clearAll: jest.fn(),
      getTotalPrice: () => ({
        total: '0.00',
        discountSet: false,
        discountMember: false,
      }),
    }));

    render(<ShopingCartClient />);
    expect(screen.getByText(/Total Price: 0.00/)).toBeInTheDocument();
    expect(screen.queryByText(/Pay/)).not.toBeInTheDocument();
  });

  it('should clear all items correctly', () => {
    const mockClearAll = jest.fn();
    mockedUseShoppingCart.mockImplementation(() => ({
      selectedItems: new Map([
        ['Orange Set', 1],
        ['Green Set', 1],
      ]),
      toggleItem: jest.fn(),
      removeItem: jest.fn(),
      clearAll: mockClearAll,
      getTotalPrice: () => ({
        total: '200.00',
        discountSet: false,
        discountMember: false,
      }),
    }));

    render(<ShopingCartClient />);
    const clearButton = screen.getByText('Clear All');
    fireEvent.click(clearButton);

    expect(mockClearAll).toHaveBeenCalled();
  });
});
