// Tema navideño para DuoLove
export const christmasTheme = {
  colors: {
    // Colores principales
    primary: '#C41E3A', // Rojo navideño
    secondary: '#165B33', // Verde navideño
    accent: '#FFD700', // Dorado
    background: '#2D1B69', // Púrpura oscuro
    backgroundLight: '#F5F5F0', // Blanco nieve
    
    // Gradientes
    gradientStart: '#2D1B69',
    gradientEnd: '#4A2D8F',
    
    // Texto
    text: '#FFFFFF',
    textDark: '#1A1A1A',
    textMuted: '#A0A0A0',
    
    // Estados
    success: '#165B33',
    error: '#C41E3A',
    warning: '#FFD700',
    
    // UI
    card: '#FFFFFF',
    cardDark: '#1E1E1E',
    border: '#E0E0E0',
    shadow: 'rgba(0, 0, 0, 0.1)',
    
    // Navidad específicos
    snow: '#FFFFFF',
    holly: '#C41E3A',
    pine: '#165B33',
    star: '#FFD700',
  },
  
  fonts: {
    regular: 'System',
    bold: 'System',
    light: 'System',
  },
  
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 32,
    title: 36,
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 24,
    round: 999,
  },
  
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

export type ChristmasTheme = typeof christmasTheme;
