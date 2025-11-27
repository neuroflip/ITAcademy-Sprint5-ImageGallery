import { describe, it, vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomAlertDialog from "@/components/CustomAlertDialog/CustomAlertDialog";
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

const onSelectMock = vi.fn();
const onDragStartMock = vi.fn();
const onDragEndMock = vi.fn();
const onReorderMock = vi.fn();
const onDragDropMock = vi.fn();
const setDataMock = vi.fn();

const contextValue: DragAndDropContextProps = {
  selectedImagesIds: new Set(),
  onDragStart: onDragStartMock,
  onDragEnd: onDragEndMock,
  onDragLeave: vi.fn(),
  onDragOver: vi.fn(),
  onDrop: onDragDropMock,
  onReorderImage: onReorderMock,
  onSelectImage: onSelectMock,
  onDeleteImage: vi.fn(),
  onSelectAllImages: vi.fn(),
  onDeselectAllImages: vi.fn(),
  onDeleteSelectedImages: vi.fn()
};


describe("ImageItem", () => {
  describe("ImageItem rendering", () => {
    it("renders the image item container and an image", () => {
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
  describe("ImageItem drag and drop management", () => {
    it("calls to select functionality when the image is clicked", () => {
      render(<DragAndDropContext.Provider value={contextValue}>
          <ImageItem imageData={imageData} isFeatured={false} isSelected={false} />
        </DragAndDropContext.Provider>);

      const imageContainerItem = screen.getByTestId("imageContainer");

      fireEvent.click(imageContainerItem);

      expect(onSelectMock).toHaveBeenCalled();
    });

    it("calls to drag start functionality when the image is dragged", () => {
      render(<DragAndDropContext.Provider value={contextValue}>
          <ImageItem imageData={imageData} isFeatured={false} isSelected={false} />
        </DragAndDropContext.Provider>);

      const imageContainerItem = screen.getByTestId("imageContainer");

      fireEvent.dragStart(imageContainerItem,{
        dataTransfer: {
          setData: setDataMock
        }
      });

      expect(onDragStartMock).toHaveBeenCalled();
      expect(setDataMock).toHaveBeenCalledWith("draggedElementId", "10");
    });

    it("calls to drag end functionality when the image is finally dragged", () => {
      render(<DragAndDropContext.Provider value={contextValue}>
          <ImageItem imageData={imageData} isFeatured={false} isSelected={false} />
        </DragAndDropContext.Provider>);

      const imageContainerItem = screen.getByTestId("imageContainer");

      fireEvent.dragEnd(imageContainerItem);

      expect(onDragEndMock).toHaveBeenCalled();
    });

  });
});