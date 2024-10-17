import { createContext, useState, useEffect } from "react";
import { AppThemes } from "./theme"; // Import AppThemes instead of individual themes
import { ThemeProvider } from "@mui/material";
export const ThemeContext = createContext(null);

export const ThemeContextProvider = ({ children }) => {
    const systemThemeMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    const [themeMode, setThemeMode] = useState(systemThemeMode);
    const [theme, setTheme] = useState(AppThemes[systemThemeMode]);

    const toggleTheme = () => {
        const newThemeMode = themeMode === "light" ? "dark" : "light";
        setThemeMode(newThemeMode);
        setTheme(AppThemes[newThemeMode]);
        localStorage.setItem("theme", newThemeMode);
    };

    useEffect(() => {
        const persistedTheme = localStorage.getItem("theme");
        if (persistedTheme) {
            setThemeMode(persistedTheme);
            setTheme(AppThemes[persistedTheme]);
        }

        // Apply TailwindCSS dark mode class
        if (themeMode === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [themeMode]);

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};
