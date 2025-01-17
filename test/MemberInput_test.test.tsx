import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MembershipInput } from '@/components/MemberInput';

describe('MembershipInput component', () => {
  it('should call onChange with input value', () => {
    const onChange = jest.fn();
    render(<MembershipInput onChange={onChange} />);
    const input = screen.getByRole('textbox');
    const value = 'member card';
    fireEvent.change(input, { target: { value } });
    expect(onChange).toHaveBeenCalledWith(value);
  });
});
