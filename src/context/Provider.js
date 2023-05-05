import React, { createContext, useState } from "react";
import { lightTheme, darkTheme } from "./theme";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    // const toggleTheme = () => {

    //     setTheme(theme === "light" ? "dark" : "light");
    // };
    const handleModeTheme = {
        darkMode() {
            setTheme("dark");
        },
        lightMode() {
            setTheme("light");
        }
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                handleModeTheme,
                variables: theme === "light" ? 'light' : 'dark',
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};