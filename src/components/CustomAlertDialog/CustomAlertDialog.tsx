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

const CustomAlertDialog = ({ title, description, alertTriggerElement, confirmElement }: CustomAlertDialogProps) => {
    return <AlertDialog>
      <AlertDialogTrigger asChild>
        { alertTriggerElement() }
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{ title }</AlertDialogTitle>
          <AlertDialogDescription>{ description }</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            { confirmElement() }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

}

export default CustomAlertDialog;
