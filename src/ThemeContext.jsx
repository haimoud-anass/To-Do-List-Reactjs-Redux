import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem("mode")|| "lightMode");

    const toggleTheme = () => {
        setTheme(prevTheme => {
            return prevTheme === 'lightMode' ? 'darkMode' : 'lightMode'
        });
            localStorage.setItem("mode",theme==='lightMode' ? 'darkMode' : 'lightMode')
        ;
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};