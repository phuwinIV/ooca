import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MembershipForm from '../components/MemberInput';

describe('MembershipForm Component', () => {
  const mockOnMembershipChange = jest.fn();
  const mockOnValidationChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render membership form correctly', () => {
    render(
      <MembershipForm
        onMembershipChange={mockOnMembershipChange}
        onValidationChange={mockOnValidationChange}
      />
    );

    expect(screen.getByText('Membership Details')).toBeInTheDocument();
    expect(screen.getByLabelText('I am a member')).toBeInTheDocument();
  });

  it('should call onMembershipChange when checkbox is checked', () => {
    render(
      <MembershipForm
        onMembershipChange={mockOnMembershipChange}
        onValidationChange={mockOnValidationChange}
      />
    );

    const checkbox = screen.getByLabelText('I am a member');
    fireEvent.click(checkbox);

    expect(mockOnMembershipChange).toHaveBeenCalledWith(true);
  });

  it('should show input field when checkbox is checked', () => {
    render(
      <MembershipForm
        onMembershipChange={mockOnMembershipChange}
        onValidationChange={mockOnValidationChange}
      />
    );

    const checkbox = screen.getByLabelText('I am a member');
    fireEvent.click(checkbox);

    expect(
      screen.getByPlaceholderText(
        'Enter your membership card number (e.g., 123)'
      )
    ).toBeInTheDocument();
  });

  it('should call onValidationChange with correct member data on valid input', () => {
    render(
      <MembershipForm
        onMembershipChange={mockOnMembershipChange}
        onValidationChange={mockOnValidationChange}
      />
    );

    const checkbox = screen.getByLabelText('I am a member');
    fireEvent.click(checkbox);

    const input = screen.getByPlaceholderText(
      'Enter your membership card number (e.g., 123)'
    );
    fireEvent.change(input, { target: { value: '123' } });

    expect(mockOnValidationChange).toHaveBeenCalledWith(true, {
      id: '123',
      name: 'John Doe',
    });
  });

  it('should call onValidationChange with false on invalid input', () => {
    render(
      <MembershipForm
        onMembershipChange={mockOnMembershipChange}
        onValidationChange={mockOnValidationChange}
      />
    );

    const checkbox = screen.getByLabelText('I am a member');
    fireEvent.click(checkbox);

    const input = screen.getByPlaceholderText(
      'Enter your membership card number (e.g., 123)'
    );
    fireEvent.change(input, { target: { value: '999' } });

    expect(mockOnValidationChange).toHaveBeenCalledWith(false, undefined);
  });

  it('should display success message for valid membership number', () => {
    render(
      <MembershipForm
        onMembershipChange={mockOnMembershipChange}
        onValidationChange={mockOnValidationChange}
      />
    );

    const checkbox = screen.getByLabelText('I am a member');
    fireEvent.click(checkbox);

    const input = screen.getByPlaceholderText(
      'Enter your membership card number (e.g., 123)'
    );
    fireEvent.change(input, { target: { value: '123' } });

    expect(screen.getByText('Welcome back, John Doe!')).toBeInTheDocument();
  });

  it('should display error message for invalid membership number', () => {
    render(
      <MembershipForm
        onMembershipChange={mockOnMembershipChange}
        onValidationChange={mockOnValidationChange}
      />
    );

    const checkbox = screen.getByLabelText('I am a member');
    fireEvent.click(checkbox);

    const input = screen.getByPlaceholderText(
      'Enter your membership card number (e.g., 123)'
    );
    fireEvent.change(input, { target: { value: '999' } });

    expect(
      screen.getByText('Invalid membership number. Please try again.')
    ).toBeInTheDocument();
  });

  it('should clear input and messages when checkbox is unchecked', () => {
    render(
      <MembershipForm
        onMembershipChange={mockOnMembershipChange}
        onValidationChange={mockOnValidationChange}
      />
    );

    const checkbox = screen.getByLabelText('I am a member');
    fireEvent.click(checkbox);

    const input = screen.getByPlaceholderText(
      'Enter your membership card number (e.g., 123)'
    );
    fireEvent.change(input, { target: { value: '123' } });

    fireEvent.click(checkbox); // Uncheck the checkbox

    expect(input).not.toBeInTheDocument();
    expect(mockOnMembershipChange).toHaveBeenCalledWith(false);
    expect(mockOnValidationChange).toHaveBeenCalledWith(false);
  });
});
