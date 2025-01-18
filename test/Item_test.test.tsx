import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ItemCard } from '@/components/ItemCard';
import { Item } from '@/types/type';

describe('ItemCard component', () => {
  const item: Item = {
    name: 'Red Set',
    price: 50,
    color: 'bg-red-100 hover:bg-red-200 border-red-200',
  };

  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the item name and price correctly', () => {
    render(<ItemCard item={item} isSelected={false} onSelect={mockOnSelect} />);

    expect(screen.getByText('Red Set')).toBeInTheDocument();
    expect(screen.getByText('50 THB')).toBeInTheDocument();
  });

  it('should apply the correct color classes from item.color', () => {
    render(<ItemCard item={item} isSelected={false} onSelect={mockOnSelect} />);
    const button = screen.getByRole('option');

    expect(button).toHaveClass('bg-red-100');
    expect(button).toHaveClass('hover:bg-red-200');
    expect(button).toHaveClass('border-red-200');
  });

  it('should call onSelect with the correct item name when clicked', () => {
    render(<ItemCard item={item} isSelected={false} onSelect={mockOnSelect} />);
    const button = screen.getByRole('option');

    fireEvent.click(button);

    expect(mockOnSelect).toHaveBeenCalledWith('Red Set');
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it('should add the correct classes when isSelected is true', () => {
    render(<ItemCard item={item} isSelected={true} onSelect={mockOnSelect} />);
    const button = screen.getByRole('option');

    expect(button).toHaveClass('ring-2');
    expect(button).toHaveClass('ring-offset-2');
    expect(button).toHaveClass('ring-blue-500');
    expect(button).toHaveClass('scale-105');
  });

  it('should not have selected classes when isSelected is false', () => {
    render(<ItemCard item={item} isSelected={false} onSelect={mockOnSelect} />);
    const button = screen.getByRole('option');

    expect(button).not.toHaveClass('ring-2');
    expect(button).not.toHaveClass('ring-offset-2');
    expect(button).not.toHaveClass('ring-blue-500');
    expect(button).not.toHaveClass('scale-105');
  });

  it('should be accessible with the correct aria-selected attribute', () => {
    render(<ItemCard item={item} isSelected={true} onSelect={mockOnSelect} />);
    const button = screen.getByRole('option');

    expect(button).toHaveAttribute('aria-selected', 'true');
  });

  it('should not have aria-selected attribute set to true when not selected', () => {
    render(<ItemCard item={item} isSelected={false} onSelect={mockOnSelect} />);
    const button = screen.getByRole('option');

    expect(button).toHaveAttribute('aria-selected', 'false');
  });
});
