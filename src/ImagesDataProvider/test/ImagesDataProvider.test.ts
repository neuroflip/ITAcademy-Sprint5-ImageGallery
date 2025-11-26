import { describe, it, vi, expect } from "vitest";

vi.mock('../providers/PicSumImagesDataProvider', () => {
  const mockGetImages = vi.fn();
  
  class MockPicSumImagesDataProvider {
    getImages() { return mockGetImages(); }
  }

  return { 
    default: MockPicSumImagesDataProvider, 
    mockGetImages: mockGetImages
  };
});

import ImagesDataProvider from "../ImagesDataProvider";
import * as PicSumImagesDataProvider from "../providers/PicSumImagesDataProvider";
type PicSumImagesDataProviderMock = {
  default: new () => { getImages: () => [] };
  mockGetImages: ReturnType<typeof vi.fn>;
}

const PicSumModule = PicSumImagesDataProvider as PicSumImagesDataProviderMock;
const mockGetImages = PicSumModule.mockGetImages;

describe("ImagesDataProvider", () => {
    it("calling getImageDataArray, calls to provider getImages function", () => {
      const providerClass = PicSumImagesDataProvider.default;
      const imagesDataProvider = new ImagesDataProvider(new providerClass());

      imagesDataProvider.getImageDataArray();

      expect(mockGetImages).toHaveBeenCalled();
    });
});