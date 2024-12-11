import {createContext, useContext} from "react";

import {Mode, Theme} from "@typings/theme";

export interface ThemeContract {
    mode: Mode;

    theme: Theme;

    changeTheme(theme: Theme): void;

    handleToggle(): void;
}

export const ThemeContext = createContext<ThemeContract>({
    mode: Mode.Static,
    theme: Theme.Light,
    changeTheme: () => {
    },
    handleToggle() {
    }
});

ThemeContext.displayName = "ThemeContext";

export const useTheme = () => useContext(ThemeContext);
