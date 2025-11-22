import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import type { CustomContextMenuProps } from "./ContextualMenu.d";

const CustomContextMenu = ({ triggerElement, onSelectAll, onDeselectAll, onDeleteSelected }: CustomContextMenuProps) => {
  return (
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
        <ContextMenuItem inset onSelect={ onDeleteSelected }>
          Delete selected images
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default CustomContextMenu;