import React, { useCallback, useContext, useReducer } from 'react'

type DialogComponent = React.ComponentType<{
  open: boolean
  onClose: () => void
}>

const initialState = {
  dialogComponent: (() => <React.Fragment />) as DialogComponent,
  open: false,
}

function dialogContextReducer(
  prev: typeof initialState,
  next: Partial<typeof initialState>
) {
  return { ...prev, ...next }
}

const DialogContext = React.createContext<
  React.Dispatch<Partial<typeof initialState>> | undefined
>(undefined)

export default function useDialog<
  T = DialogComponent,
  // @ts-ignore
  P = React.ComponentProps<T>
>(dialogComponent: T, dialogProps?: Omit<P, 'open' | 'onClose'>) {
  const setDialogContext = useContext(DialogContext)!
  const baseDialogProps = dialogProps

  if (typeof setDialogContext === 'undefined') {
    throw new Error('Did you forget to include <DialogContextProvider />')
  }

  const open = useCallback(
    (dialogProps?: typeof baseDialogProps) => {
      setDialogContext({
        // @ts-ignore
        dialogComponent,
        open: true,
        ...baseDialogProps,
        ...dialogProps,
      })
    },
    [setDialogContext]
  )

  return { open }
}

export function DialogContextProvider({
  children,
}: React.PropsWithChildren<unknown>) {
  const [
    { dialogComponent: DialogComponent, open, ...props },
    setDialogContext,
  ] = useReducer(dialogContextReducer, initialState)

  const handleClose = useCallback(() => {
    setDialogContext({ open: false })
  }, [setDialogContext])

  return (
    <DialogContext.Provider value={setDialogContext}>
      {children}
      <DialogComponent open={open} onClose={handleClose} {...props} />
    </DialogContext.Provider>
  )
}
