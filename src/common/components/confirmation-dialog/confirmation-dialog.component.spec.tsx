import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('common/components/confirmation-dialog/ConfirmationDialogComponent', () => {
  it('should not render dialog when isOpen is false', () => {
    // Arrange
    const props = {
      isOpen: false,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'Test Title',
      labels: {
        closeButton: 'Cancel',
        acceptButton: 'Confirm',
      },
      children: <div>Test content</div>,
    };

    // Act
    const { container } = render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  it('should render dialog when isOpen is true', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'Test Title',
      labels: {
        closeButton: 'Cancel',
        acceptButton: 'Confirm',
      },
      children: <div>Test content</div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('should render dialog with React node as title', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: <h1>Custom Title Node</h1>,
      labels: {
        closeButton: 'Cancel',
        acceptButton: 'Confirm',
      },
      children: <div>Test content</div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.getByText('Custom Title Node')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    // Arrange
    const onClose = vi.fn();
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose,
      title: 'Test Title',
      labels: {
        closeButton: 'Cancel',
        acceptButton: 'Confirm',
      },
      children: <div>Test content</div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const closeButton = screen.getByText('Cancel');
    fireEvent.click(closeButton);

    // Assert
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(props.onAccept).not.toHaveBeenCalled();
  });

  it('should call onAccept and onClose when accept button is clicked', () => {
    // Arrange
    const onAccept = vi.fn();
    const onClose = vi.fn();
    const props = {
      isOpen: true,
      onAccept,
      onClose,
      title: 'Test Title',
      labels: {
        closeButton: 'Cancel',
        acceptButton: 'Confirm',
      },
      children: <div>Test content</div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const acceptButton = screen.getByText('Confirm');
    fireEvent.click(acceptButton);

    // Assert
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should render children content correctly', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'Test Title',
      labels: {
        closeButton: 'Cancel',
        acceptButton: 'Confirm',
      },
      children: (
        <div>
          <p>Are you sure you want to delete this item?</p>
          <p>This action cannot be undone.</p>
        </div>
      ),
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
    expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
  });
});
