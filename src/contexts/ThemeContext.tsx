import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type ThemeContextProps = {
  isDarkTheme: boolean;
  setIsDarkTheme: Dispatch<SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    // poza komponentem dziecka providera zwróci nulla
    throw new Error("Missing themeContext, it's not wrapped in ThemeProvider");
  }
  return ctx;
};
