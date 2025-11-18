import type { JSX } from "react";

type CustomAlertDialogProps = {
  title: string,
  description: string,
  alertTriggerElement: () => JSX.Element,
  confirmElement: () => JSX.Element
}

export type{ CustomAlertDialogProps };