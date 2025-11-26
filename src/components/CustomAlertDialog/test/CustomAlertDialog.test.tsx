import { type AlertDialogActionProps, type AlertDialogCancelProps, type AlertDialogContentProps, type AlertDialogDescriptionProps, type AlertDialogProps, type AlertDialogTitleProps, type AlertDialogTriggerProps } from "@radix-ui/react-alert-dialog";
import { describe, it, vi, expect, afterEach } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react'
import CustomAlertDialog from "../CustomAlertDialog";
import CustomButton from "@/components/CustomButton/CustomButton";

vi.mock('@/components/CustomButton/CustomButton', () => {
  const mockCustomButton = vi.fn((props: React.ButtonHTMLAttributes<HTMLButtonElement> & { text: string, children?: React.ReactNode }) => <button data-testid="mock-customButton" {...props}></button>);

  return { default: mockCustomButton }
});

vi.mock("@/components/ui/alert-dialog", () => {
  const mockAlertDialog = vi.fn((props: AlertDialogProps) => <div data-testid="mock-alertDialog"> { props.children } </div>);
  const mockAlertDialogTrigger = vi.fn((props: AlertDialogTriggerProps & { children?: React.ReactNode }) => <> { props.children } </>);
  const mockAlertDialogContent = vi.fn((props: AlertDialogContentProps & { children?: React.ReactNode }) => <div data-testid="mock-alertDialogContent" {...props}> { props.children } </div>);
  const mockAlertDialogHeader = vi.fn((props: { children?: React.ReactNode }) => <div data-testid="mock-alertDialogHeader" {...props}> { props.children } </div>);
  const mockAlertDialogTitle = vi.fn((props: AlertDialogTitleProps & { children?: React.ReactNode }) => <div data-testid="mock-alertDialogTitle" {...props}></div>);
  const mockAlertDialogDescription = vi.fn((props: AlertDialogDescriptionProps & { children?: React.ReactNode }) => <div data-testid="mock-alertDialogDescription" {...props}></div>);
  const mockAlertDialogFooter = vi.fn((props: { children?: React.ReactNode }) => <div data-testid="mock-alertDialogFooter" {...props}>{ props.children }</div>);
  const mockAlertDialogCancel = vi.fn((props: AlertDialogCancelProps & React.RefAttributes<HTMLButtonElement>) => <> { props.children } </>);
  const mockAlertDialogAction = vi.fn((props: AlertDialogActionProps & React.RefAttributes<HTMLButtonElement>) => <> { props.children } </>);
  
  return { 
    AlertDialog: mockAlertDialog,
    AlertDialogTrigger: mockAlertDialogTrigger,
    AlertDialogContent: mockAlertDialogContent,
    AlertDialogHeader: mockAlertDialogHeader,
    AlertDialogTitle: mockAlertDialogTitle,
    AlertDialogDescription: mockAlertDialogDescription,
    AlertDialogFooter: mockAlertDialogFooter,
    AlertDialogCancel: mockAlertDialogCancel,
    AlertDialogAction: mockAlertDialogAction
  }
});

import * as AlertDialogModule from '@/components/ui/alert-dialog';

describe("CustomAlertDialog", () => {
  afterEach(() => {
    vi.clearAllMocks();
  })

  describe("CustomAlertDialog rendering", () => {
    it("renders the AlertDialog as closed and all his hierarchy", () => {
      const alertTriggerElement = () => <div>Trigger</div>;
      const confirmCallback = vi.fn();
      const cancelCallback = vi.fn();
      const isOpen = false;
      const title = "Alert Title";
      const description = "Alert Description";

      render(<CustomAlertDialog
        isOpen = { isOpen }
        alertTriggerElement = { alertTriggerElement }
        confirmCallback = { confirmCallback }
        cancelCallback = { cancelCallback }
        title = { title }
        description = { description }></CustomAlertDialog>);

      const alertDialog = screen.getByTestId("mock-alertDialog");
      const mockAlertDialog = AlertDialogModule.AlertDialog as ReturnType<typeof vi.fn>;
      const mockAlertDialogTrigger = AlertDialogModule.AlertDialogTrigger as ReturnType<typeof vi.fn>;
      const mockAlertDialogContent = AlertDialogModule.AlertDialogContent as ReturnType<typeof vi.fn>;      
      const mockAlertDialogHeader = AlertDialogModule.AlertDialogHeader as ReturnType<typeof vi.fn>;
      const mockAlertDialogTitle = AlertDialogModule.AlertDialogTitle as ReturnType<typeof vi.fn>;
      const mockAlertDialogDescription = AlertDialogModule.AlertDialogDescription as ReturnType<typeof vi.fn>;
      const mockAlertDialogFooter = AlertDialogModule.AlertDialogFooter as ReturnType<typeof vi.fn>;
      const mockAlertDialogCancel = AlertDialogModule.AlertDialogCancel as ReturnType<typeof vi.fn>;
      const mockAlertDialogAction = AlertDialogModule.AlertDialogAction as ReturnType<typeof vi.fn>;
      const calledWith = mockAlertDialog.mock.calls[0][0];

      expect(alertDialog).toBeInTheDocument();
      expect(mockAlertDialog).toHaveBeenCalled();
      expect(mockAlertDialogTrigger).toHaveBeenCalled();
      expect(mockAlertDialogContent).toHaveBeenCalled();
      expect(mockAlertDialogHeader).toHaveBeenCalled();
      expect(mockAlertDialogTitle).toHaveBeenCalled(); 
      expect(mockAlertDialogDescription).toHaveBeenCalled();   
      expect(mockAlertDialogFooter).toHaveBeenCalled();
      expect(mockAlertDialogCancel).toHaveBeenCalled();
      expect(mockAlertDialogAction).toHaveBeenCalled();
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
      expect(calledWith).toEqual(expect.objectContaining({
        open: false
      }));
    });

    it("renders the AlertDialog as open if indicated", () => {
      const alertTriggerElement = () => <div>Trigger</div>;
      const confirmCallback = vi.fn();
      const cancelCallback = vi.fn();
      const isOpen = true;
      const title = "Alert Title";
      const description = "Alert Description";

      render(<CustomAlertDialog
        isOpen = { isOpen }
        alertTriggerElement = { alertTriggerElement }
        confirmCallback = { confirmCallback }
        cancelCallback = { cancelCallback }
        title = { title }
        description = { description }></CustomAlertDialog>);
    
      const alertDialog = screen.getByTestId("mock-alertDialog");
      const mockAlertDialog = AlertDialogModule.AlertDialog as ReturnType<typeof vi.fn>;
      const calledWith = mockAlertDialog.mock.calls[0][0];

      expect(alertDialog).toBeTruthy();
      expect(mockAlertDialog).toHaveBeenCalled();
      expect(calledWith).toEqual(expect.objectContaining({
        open: true,
      }));
    });

    it("renders the AlertDialogCancel and AlertDialogAction using CustomButtons", () => {
      const alertTriggerElement = () => <div>Trigger</div>;
      const confirmCallback = vi.fn();
      const cancelCallback = vi.fn();
      const isOpen = false;
      const title = "Alert Title";
      const description = "Alert Description";

      render(<CustomAlertDialog
        isOpen = { isOpen }
        alertTriggerElement = { alertTriggerElement }
        confirmCallback = { confirmCallback }
        cancelCallback = { cancelCallback }
        title = { title }
        description = { description }></CustomAlertDialog>);

      const customButton = screen.getAllByTestId("mock-customButton");

      expect(customButton.length).toBe(2);

      const mockCustomButton = (CustomButton as ReturnType<typeof vi.fn>);

      expect(mockCustomButton).toHaveBeenCalledTimes(2);
      expect(mockCustomButton.mock.calls[0][0]).toEqual(expect.objectContaining({ onClick: cancelCallback,  text: "Cancel" }));
      expect(mockCustomButton.mock.calls[1][0]).toEqual(expect.objectContaining({ onClick: confirmCallback,  text: "Continue" }));
    });

    it("calls to cancelCallback when clicking on AlertDialogCancel button", () => {
      const alertTriggerElement = () => <div>Trigger</div>;
      const confirmCallback = vi.fn();
      const cancelCallback = vi.fn();
      const isOpen = false;
      const title = "Alert Title";
      const description = "Alert Description";

      render(<CustomAlertDialog
        isOpen = { isOpen }
        alertTriggerElement = { alertTriggerElement }
        confirmCallback = { confirmCallback }
        cancelCallback = { cancelCallback }
        title = { title }
        description = { description }></CustomAlertDialog>);

      const customActionButtons = screen.getAllByTestId("mock-customButton");
      const cancelButton = customActionButtons[0];

      fireEvent.click(cancelButton);

      expect(cancelCallback).toHaveBeenCalledTimes(1);
    });

    it("calls to confirmCallback when clicking on AlertDialogAction button", () => {
      const alertTriggerElement = () => <div>Trigger</div>;
      const confirmCallback = vi.fn();
      const cancelCallback = vi.fn();
      const isOpen = false;
      const title = "Alert Title";
      const description = "Alert Description";

      render(<CustomAlertDialog
        isOpen = { isOpen }
        alertTriggerElement = { alertTriggerElement }
        confirmCallback = { confirmCallback }
        cancelCallback = { cancelCallback }
        title = { title }
        description = { description }></CustomAlertDialog>);

      const customButtons = screen.getAllByTestId("mock-customButton");
      const confirmButton = customButtons[1];

      fireEvent.click(confirmButton);

      expect(confirmCallback).toHaveBeenCalledTimes(1);
    });
  });
});