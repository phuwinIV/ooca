import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ItemCard } from '@/components/ItemCard';

describe('ItemCard component', () => {
  const item = {
    name: 'item name',
    price: 100,
    color: 'bg-red-500',
  };

  it('should render item name and price', () => {
    render(<ItemCard item={item} isSelected={false} onSelect={() => {}} />);
    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(`${item.price} THB`)).toBeInTheDocument();
  });

  it('should call onSelect when clicked', () => {
    const onSelect = jest.fn();
    render(<ItemCard item={item} isSelected={false} onSelect={onSelect} />);
    screen.getByRole('option').click();
    expect(onSelect).toHaveBeenCalledWith(item.name);
  });

  it('should have correct class when isSelected is true', () => {
    render(<ItemCard item={item} isSelected={true} onSelect={() => {}} />);
    expect(screen.getByRole('option')).toHaveClass(
      'ring-2 ring-offset-2 ring-blue-500 scale-105'
    );
  });

  it('should have correct class when isSelected is false', () => {
    render(<ItemCard item={item} isSelected={false} onSelect={() => {}} />);
    expect(screen.getByRole('option')).not.toHaveClass(
      'ring-2 ring-offset-2 ring-blue-500 scale-105'
    );
  });
});
