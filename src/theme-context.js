import React from 'react';

export const themes = {
  light: {
    preDefinedColors : [
      "#FC72A6", //pink
      "#1B8CA6", //blue
      "#C8DE02", //green
      "#EBE000", //yellow
      "#F2A105" //orange
    ],
    primaryColors : [
      "#ffffff", //white
      "#000000", //black
      "#999", //grey
    ],
  },
  dark: {
    
  },
};

export const ThemeContext = React.createContext(
  themes.light
);
