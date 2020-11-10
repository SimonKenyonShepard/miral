import React from 'react';

export const themes = {
  light: {
    preDefinedColors : [
      // "#FC72A6", //pink
      // "#1B8CA6", //blue
      // "#C8DE02", //green
      // "#EBE000", //yellow
      // "#F2A105" //orange
      "#ffffff", //white
      "#F28D95", //pink
      "#7EBFD9", //blue
      "#BBF244", //green
      "#F2C744", //yellow
      "#F29C50" //orange
    ],
    primaryColors : [
      "#ffffff", //white
      "#000000", //black
      "#999", //grey
    ],
    fontColors : [
      "#ffffff", //white
      "#999", //grey
      "#080808" //text grey/black
    ],
  },
  dark: {
    
  },
};

export const ThemeContext = React.createContext(
  themes.light
);
