import type { ContextMenuProps, ContextMenuTriggerProps } from "@radix-ui/react-context-menu";
import { describe, it, vi, expect, afterEach } from "vitest";
import { act, render, screen } from '@testing-library/react'

vi.mock("@/components/ui/context-menu", () => {
  const mockContextMenu = vi.fn((props: ContextMenuProps & { children?: React.ReactNode }) => <div data-testid="mock-contextMenu">{ props.children }</div>)
  const mockContextMenuTrigger = vi.fn((props: ContextMenuTriggerProps & { children?: React.ReactNode }) => <> { props.children } </>)
  const mockContextMenuContent = vi.fn((props: ContextMenuProps & { children?: React.ReactNode }) => <div data-testid="mock-contextMenuContent" {...props}>{ props.children }</div>)
  const mockContextMenuItem = vi.fn((props: ContextMenuProps & { children?: React.ReactNode }) => <div data-testid="mock-contextMenuItem">{ props.children }</div>)
  const mockContextMenuShortcut = vi.fn((props: ContextMenuProps & { children?: React.ReactNode }) => <div data-testid="mock-contextMenuShortcut" {...props}>{ props.children }</div>)

  return { 
    ContextMenu: mockContextMenu,
    ContextMenuTrigger: mockContextMenuTrigger,
    ContextMenuContent: mockContextMenuContent,
    ContextMenuItem: mockContextMenuItem,
    ContextMenuShortcut: mockContextMenuShortcut
  }
});

import CustomContextualMenu from '../CustomContextualMenu';

vi.mock("@/components/CustomAlertDialog/CustomAlertDialog", () => {
  const mockCustomAlertDialog = vi.fn((props: { 
    isOpen: boolean,
    title: string, 
    description: string,
    confirmCallback: () => void,
    cancelCallback: () => void,
    children?: React.ReactNode
  }) => <div data-testid="mock-customAlertDialog"> { props.children } </div>)

  return { default: mockCustomAlertDialog }
});

import CustomAlertDialog from "@/components/CustomAlertDialog/CustomAlertDialog";
import * as ContextMenuModule from '@/components/ui/context-menu';

describe("CustomContextualMenu", () => {
  afterEach(() => {
    vi.clearAllMocks();
  })
  describe("CustomContextualMenu rendering", () => {
    it("renders the ContextMenu and all his ContextMenu items hierarchy", () => {
      const triggerElement = <div>Trigger</div>;
      const onSelectAll = vi.fn();
      const onDeselectAll = vi.fn();
      const onDeleteSelected = vi.fn();

      render(<CustomContextualMenu 
        triggerElement= { triggerElement }
        onSelectAll = { onSelectAll }
        onDeselectAll = { onDeselectAll }
        onDeleteSelected = { onDeleteSelected }></CustomContextualMenu>);

      const contextMenu = screen.getByTestId("mock-contextMenu");
      const mockContextMenu = ContextMenuModule.ContextMenu as ReturnType<typeof vi.fn>;
      const mockContextMenuTrigger = ContextMenuModule.ContextMenuTrigger as ReturnType<typeof vi.fn>;
      const mockContextMenuContent = ContextMenuModule.ContextMenuContent as ReturnType<typeof vi.fn>;
      const mockContextMenuItem = ContextMenuModule.ContextMenuItem as ReturnType<typeof vi.fn>;
      const mockContextMenuShortcut = ContextMenuModule.ContextMenuShortcut as ReturnType<typeof vi.fn>;

      expect(contextMenu).toBeTruthy();
      expect(mockContextMenu).toHaveBeenCalled();
      expect(mockContextMenuTrigger).toHaveBeenCalled();
      expect(mockContextMenuContent).toHaveBeenCalled();
      expect(mockContextMenuItem).toHaveBeenCalledTimes(3);
      expect(mockContextMenuShortcut).toHaveBeenCalledTimes(3);    
      expect(mockContextMenuItem.mock.calls[0][0].children[0]).toBe("Select All");
      expect(mockContextMenuItem.mock.calls[1][0].children[0]).toBe("Delesect All");
      expect(mockContextMenuItem.mock.calls[2][0].children[0]).toBe("Delete selected Images");
      expect(mockContextMenuItem.mock.calls[0][0].children[1].props.children).toBe("⌘A");
      expect(mockContextMenuItem.mock.calls[1][0].children[1].props.children).toBe("⌘⌥A");
      expect(mockContextMenuItem.mock.calls[2][0].children[1].props.children).toBe("⌘D");
    });

    it("renders the CustomAlertDialog component", () => {
      const triggerElement = <div>Trigger</div>;
      const onSelectAll = vi.fn();
      const onDeselectAll = vi.fn();
      const onDeleteSelected = vi.fn();

      render(<CustomContextualMenu 
        triggerElement= { triggerElement }
        onSelectAll = { onSelectAll }
        onDeselectAll = { onDeselectAll }
        onDeleteSelected = { onDeleteSelected }></CustomContextualMenu>);

      const alertDialog = screen.getByTestId("mock-customAlertDialog");
      const calledWith = (CustomAlertDialog as ReturnType<typeof vi.fn>).mock.calls[0][0];

      expect(alertDialog).toBeTruthy();
      expect(CustomAlertDialog).toHaveBeenCalled();
      expect(calledWith).toEqual(expect.objectContaining({
        isOpen: false,
        title: "Are you absolutely sure?",
        description: "This action cannot be undone. This will permanently delete the image from the Image Gallery.",
        confirmCallback: expect.any(Function),
        cancelCallback: expect.any(Function)
      }));
    });

    it("renders the CustomAlertDialog component", () => {
      const triggerElement = <div>Trigger</div>;
      const onSelectAll = vi.fn();
      const onDeselectAll = vi.fn();
      const onDeleteSelected = vi.fn();

      render(<CustomContextualMenu 
        triggerElement= { triggerElement }
        onSelectAll = { onSelectAll }
        onDeselectAll = { onDeselectAll }
        onDeleteSelected = { onDeleteSelected }></CustomContextualMenu>);

      const alertDialog = screen.getByTestId("mock-customAlertDialog");
      const calledWith = (CustomAlertDialog as ReturnType<typeof vi.fn>).mock.calls[0][0];

      expect(alertDialog).toBeTruthy();
      expect(CustomAlertDialog).toHaveBeenCalled();
      expect(calledWith).toEqual(expect.objectContaining({
        isOpen: false,
        title: "Are you absolutely sure?",
        description: "This action cannot be undone. This will permanently delete the image from the Image Gallery.",
        confirmCallback: expect.any(Function),
        cancelCallback: expect.any(Function)
      }));
    });

    it("calls to onSelectAll after clikc on first menu item option", () => {
      const triggerElement = <div>Trigger</div>;
      const onSelectAll = vi.fn();
      const onDeselectAll = vi.fn();
      const onDeleteSelected = vi.fn();

      render(<CustomContextualMenu 
        triggerElement= { triggerElement }
        onSelectAll = { onSelectAll }
        onDeselectAll = { onDeselectAll }
        onDeleteSelected = { onDeleteSelected }></CustomContextualMenu>);

      const mockContextMenuItem = ContextMenuModule.ContextMenuItem as ReturnType<typeof vi.fn>;
      act(() => {
        mockContextMenuItem.mock.calls[0][0].onSelect();
      });

      expect(onSelectAll).toHaveBeenCalled();
    });
    
    it("calls to onDeselectAll after clikc on second menu item option", () => {
      const triggerElement = <div>Trigger</div>;
      const onSelectAll = vi.fn();
      const onDeselectAll = vi.fn();
      const onDeleteSelected = vi.fn();

      render(<CustomContextualMenu 
        triggerElement= { triggerElement }
        onSelectAll = { onSelectAll }
        onDeselectAll = { onDeselectAll }
        onDeleteSelected = { onDeleteSelected }></CustomContextualMenu>);

      const mockContextMenuItem = ContextMenuModule.ContextMenuItem as ReturnType<typeof vi.fn>;
      act(() => {
        mockContextMenuItem.mock.calls[1][0].onSelect();
      });

      expect(onDeselectAll).toHaveBeenCalled();
    });

    it("sets the AlertDialog as opened after call the three menu item option (Delete Selected Images)", () => {
      const triggerElement = <div>Trigger</div>;
      const onSelectAll = vi.fn();
      const onDeselectAll = vi.fn();
      const onDeleteSelected = vi.fn();

      render(<CustomContextualMenu 
        triggerElement= { triggerElement }
        onSelectAll = { onSelectAll }
        onDeselectAll = { onDeselectAll }
        onDeleteSelected = { onDeleteSelected }></CustomContextualMenu>);

      const mockContextMenuItem = ContextMenuModule.ContextMenuItem as ReturnType<typeof vi.fn>;
      act(() => {
        mockContextMenuItem.mock.calls[2][0].onSelect();
      });
      const calledWith = (CustomAlertDialog as ReturnType<typeof vi.fn>).mock.calls[1][0];

      expect(calledWith).toEqual(expect.objectContaining({
        isOpen: true,
        title: "Are you absolutely sure?",
        description: "This action cannot be undone. This will permanently delete the image from the Image Gallery.",
        confirmCallback: expect.any(Function),
        cancelCallback: expect.any(Function)
      }));
    });
  });
});