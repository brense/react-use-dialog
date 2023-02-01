import { useCallback } from 'react'
import { Box, Button } from '@mui/material'
import ConfirmDialog from './ConfirmDialog'
import useDialog from './useDialog'

export default function App() {
  const confirmDialog = useDialog(ConfirmDialog)

  const handleClick = useCallback(() => {
    confirmDialog.open({
      confirmMessage: 'Are you sure you want to delete this item?',
      onConfirm: () => alert('confirmed!'),
    })
  }, [confirmDialog])

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Button variant="contained" onClick={handleClick}>
        Show confirm dialog
      </Button>
    </Box>
  )
}
