import { render, screen, fireEvent } from '@testing-library/react';
import { SelectedItems } from '@/components/SelectedItem';
import '@testing-library/jest-dom';

describe('SelectedItems', () => {
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing if selectedItems is empty', () => {
    render(<SelectedItems selectedItems={new Map()} onRemove={mockOnRemove} />);

    expect(screen.queryByText(/Selected Sets:/i)).not.toBeInTheDocument();
  });

  it('renders selected items correctly', () => {
    const selectedItems = new Map([
      ['Item 1', 2],
      ['Item 2', 1],
    ]);

    render(
      <SelectedItems selectedItems={selectedItems} onRemove={mockOnRemove} />
    );

    expect(screen.getByText(/Selected Sets:/i)).toBeInTheDocument();
    expect(screen.getByText('Item 1 - 2 set')).toBeInTheDocument();
    expect(screen.getByText('Item 2 - 1 set')).toBeInTheDocument();
  });

  it('calls onRemove when the remove button is clicked', () => {
    const selectedItems = new Map([['Item 1', 2]]);
    render(
      <SelectedItems selectedItems={selectedItems} onRemove={mockOnRemove} />
    );

    const removeButton = screen.getByLabelText(/Remove Item 1/i);
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith('Item 1');
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  it('renders the correct number of items', () => {
    const selectedItems = new Map([
      ['Item 1', 2],
      ['Item 2', 3],
      ['Item 3', 1],
    ]);

    render(
      <SelectedItems selectedItems={selectedItems} onRemove={mockOnRemove} />
    );

    expect(screen.getAllByRole('button', { name: /Remove/i })).toHaveLength(3);
  });
});
