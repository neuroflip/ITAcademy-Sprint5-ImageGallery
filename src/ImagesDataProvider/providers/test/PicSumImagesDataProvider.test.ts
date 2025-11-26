import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import PicSumImagesDataProvider from '../PicSumImagesDataProvider'
import { TOTAL_IMAGES, API_URL } from '../PicSumImagesDataProvider.d'

describe('PicSumImagesDataProvider', () => {
  let randomSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.5);
  })

  afterEach(() => {
    randomSpy.mockRestore();
  })

  it('returns an array with TOTAL_IMAGES length and sequential ids starting at 1', () => {
    const provider = new PicSumImagesDataProvider();
    const images = provider.getImages();

    expect(images.length).toBe(TOTAL_IMAGES);
    for (let i=0; i< images.length; i++) {
      expect(images[i].id).toBe(i + 1);  
    }
  })

  it('builds image URLs using the API_URL and in sequence', () => {
    const provider = new PicSumImagesDataProvider();
    const images = provider.getImages();
    const initialIndex = Math.floor(0.5 * 50);
    const firstExpectedSmall = `${API_URL}${initialIndex}/495/330.webp`;
    const firstExpectedLarge = `${API_URL}${initialIndex}/705/470.webp`;
    const lastIndex = initialIndex + TOTAL_IMAGES - 1;
    const lastExpectedSmall = `${API_URL}${lastIndex}/495/330.webp`;
    const lastExpectedLarge = `${API_URL}${lastIndex}/705/470.webp`;
    
    expect(images[0].imageSizes.small).toBe(firstExpectedSmall);
    expect(images[0].imageSizes.large).toBe(firstExpectedLarge);
    expect(images[TOTAL_IMAGES - 1].imageSizes.small).toBe(lastExpectedSmall);
    expect(images[TOTAL_IMAGES - 1].imageSizes.large).toBe(lastExpectedLarge);
  })

  it('generates alt texts with a human readable pattern', () => {
    const provider = new PicSumImagesDataProvider();
    const images = provider.getImages();

    expect(images[0].alt).toContain('Image number 1');
    expect(images[TOTAL_IMAGES - 1].alt).toContain(`Image number ${TOTAL_IMAGES}`);
  })
})
