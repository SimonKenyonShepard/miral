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
      "#000000", //black
      "#999", //grey
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
      "#080808", //text grey/black
      "#03a678", //green
      "#4183D7", //blue
      "#9370DB", //purple
      "#AA8F00", //dirty yellow
      "#E65722", //orange
      "#F22613" //red
    ],
  },
  dark: {
    
  },
};

export const ThemeContext = React.createContext(
  themes.light
);
