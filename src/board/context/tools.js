import React, {createContext, useReducer} from 'react';

const initialState = {
  tool : null,
  currentOpenSubMenu : null,
  autoActivate : null,
  previousSelectedTools : {}
};

const store = createContext(initialState);
const { Provider, Consumer } = store;

const ToolsProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    const newState = {...state};
    switch(action.type) {
      case 'activateTool':
        newState.tool = action.data.tool;
        if(state.currentOpenSubMenu) {
          newState.previousSelectedTools[state.currentOpenSubMenu] = action.data.tool;
        }
        return newState;
      case 'activateSubMenu':
        newState.currentOpenSubMenu = action.data.subMenu;
        if(newState.previousSelectedTools[newState.currentOpenSubMenu] && action.data.subMenu !== null) {
          newState.autoActivate = newState.previousSelectedTools[newState.currentOpenSubMenu];
        } else if (action.data.defaultTool) {
          newState.autoActivate = action.data.defaultTool;
        }
        return newState;
      case 'resetToolbar':
        newState.tool = null;
        newState.currentOpenSubMenu = null;
        newState.autoActivate = null;
        return newState;
      case 'resetAutoActivate':
        newState.autoActivate = null;
        return newState;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

const ToolsConsumer = Consumer;

export { store, ToolsProvider, ToolsConsumer };