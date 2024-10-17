import { Button } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from './index'

const ToggleTheme = () => {
    const { themeMode,toggleTheme } = useContext(ThemeContext);

    const handleSwitchThemeMode = () => {
        toggleTheme()
    }
  return (
    <>
        <Button  onClick={handleSwitchThemeMode}>
            {themeMode === "light" ? "Dark" : "Light"} Mode
        </Button>
    </>
  )
}

export default ToggleTheme