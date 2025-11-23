import * as React from 'react';

type CustomAlertDialogProps = {
  isOpen?: boolean,
  title: string,
  description: string,
  alertTriggerElement?: () => React.JSX.Element,
  confirmCallback: () => void,
  cancelCallback: () => void
}

export type { CustomAlertDialogProps };