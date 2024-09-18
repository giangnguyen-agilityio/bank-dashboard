const colorPalette = {
  white: {
    100: '#ffffff', // White
    200: '#fff5d9', // Papaya Whip
    300: '#f5f7fa', // White Smoke
  },
  black: {
    500: '#232323', // Raisin Black
  },
  blue: {
    10: '#edf1f7', // Light Blue
    20: '#e6eff5', // Light Alice Blue
    25: '#dfeaf2', // Light Powder Blue
    50: '#718ebf', // Wild Blue Yonder
    100: '#343c6a', // Dark Slate Blue
    200: '#1814f3', // Blue (dark)
    300: '#2d60ff', // Dodger Blue
  },
  gray: {
    100: '#b1b1b1', // Sliver
    150: '#6b7280', // AuroMetalSaurus
    200: '#4f4f4f', // Dark Gray
  },
  green: {
    50: '#dcfaf8', // Mint Cream
    100: '#41D4A8', // Eucalyptus
    150: '#16DBAA', // Light Green Turquoise
    200: '#16DBCC', // Medium Turquoise
    300: '#2b6d6d', // Teal Green
  },
  red: {
    100: '#FE5C73', // Coral Pink
    200: '#FF4B4A', // Red Salsa
  },
  yellow: {
    100: '#FFBB38', // Bright Amber
  },
  orange: {
    100: '#FC7900', // Pumpkin
  },
  pink: {
    100: '#FFE0EB', // Misty Rose
    200: '#FA00FF', // Fuchsia Pink
  },
};

const colors = {
  text: {
    default: colorPalette.black[500],
    primary: colorPalette.blue[50],
    secondary: colorPalette.blue[100],
    tertiary: colorPalette.white[100],
    success: colorPalette.green[150],
    warning: colorPalette.red[100],
  },

  background: {
    default: colorPalette.white[100],
    primary: colorPalette.white[300],
    tertiary: colorPalette.blue[200],
  },

  border: {
    default: colorPalette.blue[25],
    primary: colorPalette.blue[300],
    secondary: colorPalette.blue[20],
  },
};

export { colorPalette, colors };
