import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Gallery from '../Gallery';
import DragAndDropContext from '../../DragAndDropImagesManager/DragAndDropContext';
import type { ImageItemProps } from '@/components/ImageItem/ImageItem.d';
import type { CustomContextualMenuProps } from '@/components/CustomContextualMenu/CustomContextualMenu.d';

vi.mock('@/components/ImageItem/ImageItem', () => ({
  default: ({ imageData, isFeatured, isSelected }: ImageItemProps) => (
    <div data-testid={`mock-image-${imageData.id}`} data-featured={isFeatured} data-selected={isSelected} />
  )
}))

vi.mock('@/components/CustomContextualMenu/CustomContextualMenu', () => ({
  default: ({ triggerElement, onSelectAll, onDeselectAll, onDeleteSelected }: CustomContextualMenuProps) => (
    <div data-testid="mock-customContextualMenu">
      <div data-testid="trigger">{ triggerElement }</div>
      <button data-testid="selectAll" onClick={ onSelectAll }>Select All</button>
      <button data-testid="deselectAll" onClick={ onDeselectAll }>Deselect All</button>
      <button data-testid="deleteSelected" onClick={ onDeleteSelected }>Delete All Selected Images</button>
    </div>
  )
}))

const imageData = [
  { id: 1, imageSizes: { small: 'image one-small', large: 'image one-large' }, alt: 'image one', order: 0 },
  { id: 2, imageSizes: { small: 'image two-small', large: 'image two-large' }, alt: 'image two', order: 1 }
]

describe('Gallery', () => {
  it('renders fallback message and click to reload link when there is no image data', () => {
    render(<Gallery images={ [] } />)

    expect(screen.getByText(/No images available in the gallery/i)).toBeInTheDocument();
    expect(screen.getByText(/click to reload/i)).toBeInTheDocument();
  })

  it('renders image items when images provided', () => {
    const selectedImages = new Set([1]).add(1);
    const contextValue = {
      selectedImagesIds: selectedImages,
      onDragStart: () => {},
      onDragEnd: () => {},
      onDragLeave: () => {},
      onDragOver: () => {},
      onDrop: () => {},
      onReorderImage: () => {},
      onSelectImage: () => {},
      onDeleteImage: () => {},
      onSelectAllImages: () => {},
      onDeselectAllImages: () => {},
      onDeleteSelectedImages: () => {}
    }

    render(<DragAndDropContext.Provider value={ contextValue }>
        <Gallery images={ imageData } />
      </DragAndDropContext.Provider>);

    expect(screen.getByTestId('mock-image-1')).toBeInTheDocument();
    expect(screen.getByTestId('mock-image-2')).toBeInTheDocument();
    expect(screen.getByTestId('mock-image-1').getAttribute('data-featured')).toBe('true');
    expect(screen.getByTestId('mock-image-1').getAttribute('data-selected')).toBe('true');
    expect(screen.getByTestId('mock-image-2').getAttribute('data-featured')).toBe('false');
    expect(screen.getByTestId('mock-image-2').getAttribute('data-selected')).toBe('false');
  })

  it('passes context handlers to CustomContextualMenu', () => {
    const onSelectAll = vi.fn()
    const onDeselectAll = vi.fn()
    const onDeleteSelected = vi.fn()

    const contextValue = {
      selectedImagesIds: new Set<number>(),
      onDragStart: () => {}, onDragEnd: () => {}, onDragLeave: () => {}, onDragOver: () => {}, onDrop: () => {}, onReorderImage: () => {}, onSelectImage: () => {}, onDeleteImage: () => {},
      onSelectAllImages: onSelectAll,
      onDeselectAllImages: onDeselectAll,
      onDeleteSelectedImages: onDeleteSelected
    }

    render(
      <DragAndDropContext.Provider value={ contextValue }>
        <Gallery images={ imageData } />
      </DragAndDropContext.Provider>
    )

    fireEvent.click(screen.getByTestId('selectAll'))
    fireEvent.click(screen.getByTestId('deselectAll'))
    fireEvent.click(screen.getByTestId('deleteSelected'))

    expect(onSelectAll).toHaveBeenCalled()
    expect(onDeselectAll).toHaveBeenCalled()
    expect(onDeleteSelected).toHaveBeenCalled()
  })
})
