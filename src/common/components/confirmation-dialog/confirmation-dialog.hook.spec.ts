import { renderHook, act } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { Lookup } from '#common/models';

describe('common/components/confirmation-dialog/useConfirmationDialog', () => {
  it('should return initial state with isOpen false and empty lookup', () => {
    // Arrange & Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual({ id: '', name: '' });
  });

  it('should set isOpen to true and itemToDelete when onOpenDialog is called', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());
    const item: Lookup = { id: 'test-id', name: 'Test Item' };

    // Act
    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(item);
  });

  it('should set isOpen to false when onClose is called', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());
    const item: Lookup = { id: 'test-id', name: 'Test Item' };

    // Act
    act(() => {
      result.current.onOpenDialog(item);
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(item);
  });

  it('should reset itemToDelete to empty lookup when onAccept is called', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());
    const item: Lookup = { id: 'test-id', name: 'Test Item' };

    // Act
    act(() => {
      result.current.onOpenDialog(item);
      result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual({ id: '', name: '' });
    expect(result.current.isOpen).toBe(true);
  });

  it('should handle complete workflow: open -> accept -> close', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());
    const item: Lookup = { id: 'test-id', name: 'Test Item' };

    // Act - Open dialog
    act(() => {
      result.current.onOpenDialog(item);
    });
    // Assert
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(item);

    // Act - Accept
    act(() => {
      result.current.onAccept();
    });
    // Assert
    expect(result.current.itemToDelete).toEqual({ id: '', name: '' });

    // Act - Close
    act(() => {
      result.current.onClose();
    });
    // Assert
    expect(result.current.isOpen).toBe(false);
  });

  it('should maintain state independence across multiple hook instances', () => {
    // Arrange
    const { result: result1 } = renderHook(() => useConfirmationDialog());
    const { result: result2 } = renderHook(() => useConfirmationDialog());
    const item1: Lookup = { id: 'item-1', name: 'Item 1' };
    const item2: Lookup = { id: 'item-2', name: 'Item 2' };

    // Act
    act(() => {
      result1.current.onOpenDialog(item1);
      result2.current.onOpenDialog(item2);
    });

    // Assert
    expect(result1.current.itemToDelete).toEqual(item1);
    expect(result2.current.itemToDelete).toEqual(item2);

    // Act
    act(() => {
      result1.current.onClose();
    });

    // Assert
    expect(result1.current.isOpen).toBe(false);
    expect(result2.current.isOpen).toBe(true);
  });
});
