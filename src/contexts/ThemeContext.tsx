import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Theme } from '../types';
import type { UserProfile } from '../types';
import { themes } from '../themes';

interface ThemeContextType {
  theme: Theme;
  currentProfile: UserProfile | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode; profile: UserProfile | null }> = ({
  children,
  profile,
}) => {
  const theme = profile ? themes[profile] : themes.clement;

  return (
    <ThemeContext.Provider value={{ theme, currentProfile: profile }}>
      <div
        style={{
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
          minHeight: '100vh',
          fontFamily: theme.fonts.body,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
