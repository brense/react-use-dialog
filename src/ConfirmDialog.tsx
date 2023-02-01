import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogProps,
  Slide,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import React, { useCallback } from 'react'

type ConfirmDialogProps = DialogProps & {
  confirmMessage: string
  cancelText?: string
  confirmText?: string
  onCancel?: () => void | Promise<void>
  onConfirm?: () => void | Promise<void>
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

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
      onConfirm && (await onConfirm())
      dialogProps.onClose && dialogProps.onClose(event, 'backdropClick')
    },
    [onConfirm]
  )

  const handleCancel = useCallback(
    async (event: {}) => {
      onCancel && (await onCancel())
      dialogProps.onClose && dialogProps.onClose(event, 'backdropClick')
    },
    [onCancel]
  )

  return (
    <Dialog TransitionComponent={Transition} {...dialogProps}>
      <DialogContent>{confirmMessage}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="error">
          {cancelText || 'Cancel'}
        </Button>
        <Button onClick={handleConfirm} color="primary">
          {confirmText || 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
