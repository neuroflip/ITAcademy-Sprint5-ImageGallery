
import { describe, it, vi, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useImagesData from '../hooks/useImagesData';
import type { ImagesData } from '@/ImagesDataProvider/ImagesDataProvider.d';

const initialImagesData = [
  { id: 1, imageSizes: { small: 'image1-small', large: 'image1-large' }, alt: 'Alt image 1'},
  { id: 2, imageSizes: { small: 'image2-small', large: 'image2-large' }, alt: 'Alt image 2'},
  { id: 3, imageSizes: { small: 'image3-small', large: 'image3-large' }, alt: 'Alt image 3'}
];

vi.mock('../../../ImagesDataProvider/ImagesDataProvider', () => {
  return { 
    default: vi.fn(class {
      getImageDataArray = vi.fn().mockReturnValue(initialImagesData);
    })
  }
});

describe('useImagesData', () => {
  it('returns the images Data array', () => {
    const { result } = renderHook(() => useImagesData());
    const imagesData: Array<ImagesData> = result.current[0];

    expect(imagesData).toStrictEqual(initialImagesData);
  });

  it('returns an empty set as selectedImagesIds', () => {
    const { result } = renderHook(() => useImagesData());
    const expectedResult = new Set();
    const selectedImagesIds: Set<number> = result.current[1];

    expect(selectedImagesIds).toStrictEqual(expectedResult);
  });

  it('reorders the image from a initial position to a destination position in the imagesData array', () => {
    const { result } = renderHook(() => useImagesData());
    const onReorderImage = result.current[2];
    const expectedResult = [
      { id: 3, imageSizes: { small: 'image3-small', large: 'image3-large' }, alt: 'Alt image 3'},
      { id: 1, imageSizes: { small: 'image1-small', large: 'image1-large' }, alt: 'Alt image 1'},
      { id: 2, imageSizes: { small: 'image2-small', large: 'image2-large' }, alt: 'Alt image 2'}
    ];
    
    act(() => {
      onReorderImage(3, 1);
    })

    const imagesData = result.current[0];

    expect(imagesData).toStrictEqual(expectedResult);
  });

  it('deletes an image from the images data array', () => {
    const { result } = renderHook(() => useImagesData());
    const onDeleteImage = result.current[3];
    const expectedResult = [
      { id: 1, imageSizes: { small: 'image1-small', large: 'image1-large' }, alt: 'Alt image 1'},
      { id: 3, imageSizes: { small: 'image3-small', large: 'image3-large' }, alt: 'Alt image 3'}
    ];

    act(() => {
      onDeleteImage(2);
    })

    const imagesData = result.current[0];

    expect(imagesData).toStrictEqual(expectedResult);
  });

  it('selects images', () => {
    const { result } = renderHook(() => useImagesData());
    const expectedResult = new Set([1, 2]);
    const onSelectImage = result.current[5];

    act(() => {
      onSelectImage(1);
      onSelectImage(2);
    });

    const selectedImages = result.current[1];

    expect(selectedImages).toStrictEqual(expectedResult);
  });

  it('deselects an image if the image was previously selected', () => {
    const { result } = renderHook(() => useImagesData());
    const expectedResult = new Set();
    const onSelectImage = result.current[5];

    act(() => {
      onSelectImage(1);
      onSelectImage(1);
    });

    const selectedImages = result.current[1];

    expect(selectedImages).toStrictEqual(expectedResult);
  });

  it('selects all the images', () => {
    const { result } = renderHook(() => useImagesData());
    const expectedResult = new Set([1, 2, 3]);
    const onSelectAllImages = result.current[6];

    act(() => {
      onSelectAllImages();
    });

    const selectedImages = result.current[1];

    expect(selectedImages).toStrictEqual(expectedResult);
  });

  it('deletes selected images from the images data array', () => {
    const { result } = renderHook(() => useImagesData());
    const expectedResult = [ { id: 1, imageSizes: { small: 'image1-small', large: 'image1-large' }, alt: 'Alt image 1'} ];
    const expectedSelectedResult = new Set();
    const onDeleteSelectedImages = result.current[4];
    const onSelectImage = result.current[5];

    act(() => {
      onSelectImage(2);
      onSelectImage(3);
      onDeleteSelectedImages();
    });

    const imagesData = result.current[0];
    const selectedImages = result.current[1];

    expect(imagesData).toStrictEqual(expectedResult);
    expect(selectedImages).toStrictEqual(expectedSelectedResult);
  });

  it('selects all the images', () => {
    const { result } = renderHook(() => useImagesData());
    const onDeselectAllImages = result.current[7];
    const expectedResult = new Set();

    act(() => {
      onDeselectAllImages();
    });

    const selectedImages = result.current[1];

    expect(selectedImages).toStrictEqual(expectedResult);
  });
});