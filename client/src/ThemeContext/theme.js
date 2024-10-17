import { createTheme} from "@mui/material/styles";

export const AppLightTheme = createTheme({
    palette: {
        background: {
            default: "#f5f5f5",
        },
    },
});

export const AppDarkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#121212",
        },
    },
});

export const AppThemes = {
    light: AppLightTheme,
    dark: AppDarkTheme,
};