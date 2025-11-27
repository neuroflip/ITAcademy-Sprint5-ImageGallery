import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomAlertDialog from "@/components/CustomAlertDialog/CustomAlertDialog";
import { getContainerClassName } from "../helpers/utils";
import { alertDialogDescription, alertDialogTitle } from "../ImageItem.d";
import DragAndDropContext from "@/components/DragAndDropImagesManager/context/DragAndDropContext";
import type { DragAndDropContextProps } from "@/components/DragAndDropImagesManager/context/DragAndDropContext.d";
import ImageItem from "../ImageItem";

const imageData = {
  id: 10,
  imageSizes: {
    small: "image10-small",
    large: "image10-large"
  },
  alt: "Image Alt string"

}

vi.mock('@/components/CustomButton/CustomButton', () => {
  const mockCustomButton = vi.fn((props: React.ButtonHTMLAttributes<HTMLButtonElement> & { text: string, children?: React.ReactNode }) => <button data-testid="mock-customButton" {...props}></button>);

  return { default: mockCustomButton }
});

vi.mock("@/components/CustomAlertDialog/CustomAlertDialog", () => {
  const mockCustomAlertDialog = vi.fn((props: { 
    isOpen: boolean,
    title: string, 
    description: string,
    alertTriggerElement: () => HTMLElement,
    confirmCallback: () => void,
    cancelCallback: () => void,
    children?: React.ReactNode
  }) => <div data-testid="mock-customAlertDialog"> { props.children } </div>)

  return { default: mockCustomAlertDialog }
});

import CustomAlertDialog from "@/components/CustomAlertDialog/CustomAlertDialog";

vi.mock("../helpers/utils", () => {
  return {
    getContainerClassName: vi.fn().mockReturnValue("containerClassName")
  }
});

vi.mock("../ImageItem.d", () => {
  return {
    alertDialogDescription: "alert Description",
    alertDialogTitle: "alert Title"
  }
});

describe("ImageItem", () => {
  describe("ImageItem rendering", () => {
    it("renders the image item container and an image", () => {
      const contextValue: DragAndDropContextProps = {
        selectedImagesIds: new Set(),
        onDragStart: vi.fn(),
        onDragEnd: vi.fn(),
        onDragLeave: vi.fn(),
        onDragOver: vi.fn(),
        onDrop: vi.fn(),
        onReorderImage: vi.fn(),
        onSelectImage: vi.fn(),
        onDeleteImage: vi.fn(),
        onSelectAllImages: vi.fn(),
        onDeselectAllImages: vi.fn(),
        onDeleteSelectedImages: vi.fn()
      };

      render(<DragAndDropContext.Provider value={contextValue}>
          <ImageItem imageData={imageData} isFeatured={false} isSelected={false} />
        </DragAndDropContext.Provider>);
      
      const imageContainerItem = screen.getByTestId("imageContainer");
      const imageTag = screen.getByRole("img");
      
      expect(imageContainerItem).toBeInTheDocument();
      expect(imageTag).toBeInTheDocument();
      expect(imageContainerItem.className).toBe("containerClassName");
      expect(imageTag.getAttribute("src")).toBe(imageData.imageSizes.small);
      expect(imageTag.getAttribute("tabindex")).toBe('0');
      expect(imageTag.getAttribute("loading")).toBe("lazy");
      expect(imageTag.getAttribute("decoding")).toBe("async");
      expect(imageTag.className).toBe("imageItem__image");
      expect(imageTag.getAttribute("alt")).toBe(imageData.alt);
      expect(imageTag.dataset.image).toBe(String(imageData.id));
      const alertDialog = screen.getByTestId("mock-customAlertDialog");
      const calledWith = (CustomAlertDialog as ReturnType<typeof vi.fn>).mock.calls[0][0];

      expect(alertDialog).toBeTruthy();
      expect(CustomAlertDialog).toHaveBeenCalled();
      expect(calledWith).toEqual(expect.objectContaining({
        title: "alert Title",
        description: "alert Description",
        confirmCallback: expect.any(Function),
        cancelCallback: expect.any(Function)
      }));
    });
  });
});