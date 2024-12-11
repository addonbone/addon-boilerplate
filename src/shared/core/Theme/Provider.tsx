import React, {useCallback, useEffect, useState} from "react";

import {getTheme as getThemeFromStorage, setTheme as setThemeToStorage} from "@api/theme";

import {useAnalytics} from "@analytics";

import {ThemeContext} from "./context";

import {Mode, Theme} from "@typings/theme";
import {FC} from "@typings/react";

import "./theme.scss";

const isDarkMedia = () => window?.matchMedia("(prefers-color-scheme: dark)")?.matches;

const Provider: FC = ({children}) => {
    const analytics = useAnalytics();

    const [theme, setTheme] = useState<Theme>(() => {
        return isDarkMedia() ? Theme.Dark : Theme.Light;
    });

    const [mode, setMode] = useState<Mode>(Mode.Static);

    const changeTheme = useCallback((theme: Theme) => {
        setTheme(theme);

        setThemeToStorage(theme).catch(e => {
            console.log('ThemeProvider setThemeToStorage error', e);
        });

        analytics.changeTheme(theme);
    }, []);

    const handleToggle = useCallback(() => {
        changeTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
    }, [theme]);

    useEffect(() => {
        document.querySelector("html")?.setAttribute("theme", theme);
    }, [theme]);

    useEffect(() => {
        getThemeFromStorage().then(theme => {
            if (theme && [Theme.Light, Theme.Dark].includes(theme)) {
                setTheme(theme);
            }
        }).catch(e => {
            console.log('ThemeProvider getThemeFromStorage error', e);
        });
    }, []);

    useEffect(() => {
        const url = new URL(document.location.href);

        const mode: Mode = url.searchParams.get('mode') === Mode.Responsive || url.pathname.includes('sidebar.html') ? Mode.Responsive : Mode.Static;

        if (mode !== Mode.Static) {
            setMode(mode);
        }

        document.querySelector("html")?.setAttribute("mode", mode);
    }, []);

    return (
        <ThemeContext.Provider value={{mode, theme, changeTheme, handleToggle}}>
            {children}
        </ThemeContext.Provider>
    );
};

Provider.displayName = "ThemeProvider";

export default Provider;
