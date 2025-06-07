import React from 'react'
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
} from '@mui/material'

import { useTranslation } from 'react-i18next'
import { useColorMode } from '@/themes/ColorModeContext'

const Setting = () => {
  const theme = useTheme()
  const { toggleColorMode, mode } = useColorMode()
  const { t, i18n } = useTranslation()
  const [confirmOpen, setConfirmOpen] = React.useState(false)

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value)
  }

  const handleDeleteAccount = () => {
    // Call API để xóa tài khoản (đặt confirmOpen=false sau khi xong)
    console.log('Account deleted')
    setConfirmOpen(false)
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        {t('Settings')}
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {t('Appearance')}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={mode === 'dark'}
              onChange={toggleColorMode}
              color="primary"
            />
          }
          label={mode === 'dark' ? t('Dark Mode') : t('Light Mode')}
        />
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {t('Language')}
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="language-label">{t('Select Language')}</InputLabel>
          <Select
            labelId="language-label"
            value={i18n.language}
            label={t('Select Language')}
            onChange={handleLanguageChange}
          >
            <MenuItem value="vi">Tiếng Việt</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" color="error" gutterBottom>
          {t('Danger Zone')}
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => setConfirmOpen(true)}
        >
          {t('Delete Account')}
        </Button>
      </Paper>

      {/* Dialog xác nhận xóa tài khoản */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      >
        <DialogTitle>{t('Confirm Deletion')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('Are you sure you want to delete your account? This action cannot be undone.')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>
            {t('Cancel')}
          </Button>
          <Button
            onClick={handleDeleteAccount}
            color="error"
            variant="contained"
          >
            {t('Delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Setting
