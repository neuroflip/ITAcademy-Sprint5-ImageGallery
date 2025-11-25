import * as React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import CustomAlertDialog from "../CustomAlertDialog/CustomAlertDialog";

import type { CustomContextualMenuProps } from "./ContextualMenu.d";

const CustomContextualMenu = ({ triggerElement, onSelectAll, onDeselectAll, onDeleteSelected }: CustomContextualMenuProps) => {
  const [alertDialogIsOpen, setAlertDialogIsOpen ] = React.useState<boolean>(false);
  const confirmCallback = () => { onDeleteSelected(); setAlertDialogIsOpen(false) };
  const cancelCallback = () => { setAlertDialogIsOpen(false) };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger className="flex items-center justify-center rounded-md text-sm">
          { triggerElement }
        </ContextMenuTrigger>
        <ContextMenuContent className="w-80 bg-background">
          <ContextMenuItem inset onSelect={ onSelectAll }>
            Select All
            <ContextMenuShortcut>⌘A</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset onSelect={ onDeselectAll }>
            Delesect All
            <ContextMenuShortcut>⌘⌥A</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset onSelect={ () => setAlertDialogIsOpen(true) }>
              Delete selected Images
              <ContextMenuShortcut>⌘D</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <CustomAlertDialog
        isOpen = { alertDialogIsOpen }
        title = "Are you absolutely sure?"
        description = "This action cannot be undone. This will permanently delete the image from the Image Gallery."
        confirmCallback={ confirmCallback }
        cancelCallback={ cancelCallback }>
      </CustomAlertDialog>
    </>
  )
}

export default CustomContextualMenu;