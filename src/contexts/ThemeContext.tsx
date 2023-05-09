import ReactSwitch from "react-switch";

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type ThemeContextProps = {
  themeName: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState("light");

  const toggleTheme = () => {
    setThemeName((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <div className="theme" id={themeName}>
        <div className="switch">
          <label>{themeName === "light" ? "Light Mode" : "Dark Mode"} </label>
          <ReactSwitch onChange={toggleTheme} checked={themeName === "dark"} />
        </div>
        {children}
        <br />
        <br />
        <br />
        <br />
      </div>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error("Missing themeContext, it's not wrapped in ThemeProvider");
  }
  return ctx;
};
