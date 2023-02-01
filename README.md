# react-use-dialog

React hook to control and trigger dialogs.

## Installation

`npm i react-use-dialog`

## Usage

1. Include the `DialogContextProvider`, before any component that uses the `useDialog` hook.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DialogContextProvider } from "react-use-dialog";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DialogContextProvider>
      <App />
    </DialogContextProvider>
  </React.StrictMode>
);
```

2. Use your own dialog.

```tsx
import { useCallback } from "react";
import MyCustomConfirmDialog from "./MyCustomConfirmDialog";
import useDialog from "react-use-dialog";

export default function App() {
  const confirmDialog = useDialog(MyCustomConfirmDialog);

  const handleClick = useCallback(() => {
    confirmDialog.open({
      confirmMessage: "Are you sure you want to delete this item?",
      onConfirm: () => alert("confirmed!"),
    });
  }, [confirmDialog]);

  return <Button onClick={handleClick}>Show confirm dialog</Button>;
}
```

3. Dialog example (with mui dialog):

```tsx
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogProps,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useCallback } from "react";

type ConfirmDialogProps = DialogProps & {
  confirmMessage: string;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void | Promise<void>;
  onConfirm?: () => void | Promise<void>;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog({
  confirmMessage,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  ...dialogProps
}: ConfirmDialogProps) {
  const handleConfirm = useCallback(
    async (event: {}) => {
      onConfirm && (await onConfirm());
      dialogProps.onClose && dialogProps.onClose(event, "backdropClick");
    },
    [onConfirm]
  );

  const handleCancel = useCallback(
    async (event: {}) => {
      onCancel && (await onCancel());
      dialogProps.onClose && dialogProps.onClose(event, "backdropClick");
    },
    [onCancel]
  );

  return (
    <Dialog TransitionComponent={Transition} {...dialogProps}>
      <DialogContent>{confirmMessage}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="error">
          {cancelText || "Cancel"}
        </Button>
        <Button onClick={handleConfirm} color="primary">
          {confirmText || "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
```

## API
### `useDialog`
Your custom dialog must atleast have an `open` and `onClose` prop. All other props will be available for override when you init `useDialog` or as parameters in the `open` method that is returned.
```ts
type DialogComponent = React.ComponentType<{ open: boolean, onClose: () => void }>
function useDialog<T = DialogComponent,  P = React.ComponentProps<T>>(dialogComponent: T, dialogProps?: Omit<P, 'open' | 'onClose'>): { open: (dialogProps?: Omit<P, 'open' | 'onClose'> )}
```
