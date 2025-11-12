import type { Theme } from '../types';

export const clementTheme: Theme = {
  name: 'clement',
  colors: {
    primary: '#00D9FF',      // Cyan électrique
    secondary: '#FF6B00',    // Orange énergique
    background: '#0A0E1A',   // Noir profond
    surface: '#1A1F2E',      // Gris foncé
    text: '#FFFFFF',
    textSecondary: '#B0B8C8',
    success: '#00FF88',      // Vert néon
    warning: '#FFD700',
    error: '#FF3366',
    accent: '#9D00FF',       // Violet électrique
  },
  fonts: {
    heading: "'Bebas Neue', 'Arial Black', sans-serif",
    body: "'Inter', 'Roboto', sans-serif",
  },
};

export const charlotteTheme: Theme = {
  name: 'charlotte',
  colors: {
    primary: '#FF6B9D',      // Rose vif
    secondary: '#FFB6D9',    // Rose pastel
    background: '#FFF5F8',   // Rose très clair
    surface: '#FFFFFF',
    text: '#2D1B2E',         // Violet très foncé
    textSecondary: '#8B6B8F',
    success: '#7ED957',      // Vert pomme
    warning: '#FFC547',      // Jaune doux
    error: '#FF5C8D',
    accent: '#C77DFF',       // Violet pastel
  },
  fonts: {
    heading: "'Quicksand', 'Montserrat', sans-serif",
    body: "'Nunito', 'Open Sans', sans-serif",
  },
};

export const themes = {
  clement: clementTheme,
  charlotte: charlotteTheme,
};
