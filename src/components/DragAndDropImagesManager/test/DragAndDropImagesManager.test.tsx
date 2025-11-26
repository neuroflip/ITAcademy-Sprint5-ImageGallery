import React from 'react'
import { describe, it, vi, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DragAndDropImagesManager from '../DragAndDropImagesManager'
import DragAndDropContext from '../context/DragAndDropContext'

vi.mock('../hooks/useDragAndDropUI', () => {
  const onDragStart = vi.fn();
  const onDragEnd = vi.fn();
  const onDragOver = vi.fn();
  const onDragLeave = vi.fn();
  const onDrop = vi.fn();
  const factory = () => [onDragStart, onDragEnd, onDragOver, onDragLeave, onDrop];
  return { default: factory, mocks: { onDragStart, onDragEnd, onDragOver, onDragLeave, onDrop } };
})

vi.mock('../hooks/useImagesData', () => {
  const imagesData = [
    { id: 1, imageSizes: { small: 's1', large: 'L1' }, alt: 'a1' },
    { id: 2, imageSizes: { small: 's2', large: 'L2' }, alt: 'a2' }
  ];
  const selectedImagesId = new Set<number>([1]);
  const onReorderImage = vi.fn();
  const onDeleteImage = vi.fn();
  const onDeleteSelectedImages = vi.fn();
  const onSelectImage = vi.fn();
  const onSelectAllImages = vi.fn();
  const onDeselectAllImages = vi.fn();
  const factory = () => [imagesData, selectedImagesId, onReorderImage, onDeleteImage, onDeleteSelectedImages, onSelectImage, onSelectAllImages, onDeselectAllImages];
  return { default: factory, mocks: { imagesData, selectedImagesId, onReorderImage, onDeleteImage, onDeleteSelectedImages, onSelectImage, onSelectAllImages, onDeselectAllImages } };
})

import * as DragCustomHook from '../hooks/useDragAndDropUI';
import * as ImagesDataCustomHook from '../hooks/useImagesData';
import type { ImagesData } from '@/ImagesDataProvider/ImagesDataProvider.d';

const GalleryMock = ({ images }: { images?: Array<ImagesData> }) => {
  const context = React.useContext(DragAndDropContext);

  return (
    <div>
      <div data-testid="imagesCount">{ images ? images.length : 0 }</div>
      <div data-testid="selectedImagesCount">{ context.selectedImagesIds ? Array.from(context.selectedImagesIds).length : 0 }</div>
      <button data-testid="buttonOnDragStart" onClick={() => context.onDragStart && context.onDragStart({} as React.DragEvent<HTMLDivElement>)} />
      <button data-testid="buttonOnDrop" onClick={() => context.onDrop && context.onDrop({} as React.DragEvent<HTMLDivElement>)} />
      <button data-testid="buttonOnSelectAll" onClick={() => context.onSelectAllImages && context.onSelectAllImages()} />
    </div>
  );
}

describe('DragAndDropImagesManager', () => {
  it('clones children and passes images prop from useImagesData', () => {
    render(<DragAndDropImagesManager><GalleryMock /></DragAndDropImagesManager>);

    expect(screen.getByTestId('imagesCount').textContent).toBe('2');
    expect(screen.getByTestId('selectedImagesCount').textContent).toBe('1');
  })

  it('provides context functions for drag and drop and other handlers', () => {
    render(<DragAndDropImagesManager><GalleryMock /></DragAndDropImagesManager>);

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const mockDragOn = (DragCustomHook as any).mocks.onDragStart;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const mockDrop = (DragCustomHook as any).mocks.onDrop;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const mockSelectAll = (ImagesDataCustomHook as any).mocks.onSelectAllImages;

    fireEvent.click(screen.getByTestId('buttonOnDragStart'));
    fireEvent.click(screen.getByTestId('buttonOnDrop'));
    fireEvent.click(screen.getByTestId('buttonOnSelectAll'));

    expect(mockDragOn).toHaveBeenCalled();
    expect(mockDrop).toHaveBeenCalled();
    expect(mockSelectAll).toHaveBeenCalled();
  })
})
