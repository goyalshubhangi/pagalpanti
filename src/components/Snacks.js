import { Close as CloseIcon } from '@mui/icons-material'
import { IconButton, Snackbar } from '@mui/material'

export default function Snacks({ message, open, setOpen }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={() => setOpen(false)}
      message={message}
      action={
        <>
          <IconButton size='small' color='inherit' onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </>
      }
    />
  )
}
