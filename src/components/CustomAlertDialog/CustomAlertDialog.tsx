import type { CustomAlertDialogProps } from './CustomAlertDialog.d';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import ImageButton from '../ImageButton/ImageButton';

const CustomAlertDialog = ({ isOpen, title, description, confirmCallback, cancelCallback, alertTriggerElement }: CustomAlertDialogProps) => {

  return <AlertDialog open={ isOpen }>
    <AlertDialogTrigger asChild>
      { alertTriggerElement && alertTriggerElement() }
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{ title }</AlertDialogTitle>
        <AlertDialogDescription>{ description }</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel asChild>
          <ImageButton onClick={ cancelCallback } text="Cancel"/>
        </AlertDialogCancel>
        <AlertDialogAction asChild>
          <ImageButton onClick={ confirmCallback } text="Continue"/>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

}

export default CustomAlertDialog;
