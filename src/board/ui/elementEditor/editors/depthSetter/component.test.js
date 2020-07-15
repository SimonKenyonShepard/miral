import React from 'react';

import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import ElementEditor from './index';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("is hidden when it 0 elements or more than 1 elements are selected", () => {

  let editorNode = null;
  let selectedElements = [],
        gridSpace = {
          offsetX : 0,
          offsetY : 0,
          zoomLevel : 1
        };
  act(() => {
    render(<ElementEditor
      selectedElements={selectedElements}
      gridSpace={gridSpace}
    />, container);
    editorNode = container.firstChild;
  });

  expect(editorNode.classList.contains('isVisible')).toBe(false);

  selectedElements = ["1", "2", "3"];
  act(() => {
    render(<ElementEditor
      selectedElements={selectedElements}
      gridSpace={gridSpace}
    />, container);
    editorNode = container.firstChild;
  });

  expect(editorNode.classList.contains('isVisible')).toBe(false);

});

it("is visible when one element is selected", () => {

  let editorNode = null;
  const selectedElements = [{
    styles : {
      x : 500,
      y : 500,
      width: 600
    }
  }],
        gridSpace = {
          offsetX : 0,
          offsetY : 0,
          zoomLevel : 1
        };
  act(() => {
    render(<ElementEditor
      selectedElements={selectedElements}
      gridSpace={gridSpace}
    />, container);
    editorNode = container.firstChild;
  });

  expect(editorNode.classList.contains('isVisible')).toBe(true);

});

it("is correctly positioned when one element is selected", () => {

  let styles = null;
  const halfEditorWidth = 200,
        editorHeightPlusMargin = 40+40,
        selectedElements = [{
          styles : {
            x : 500,
            y : 500,
            width: 600
          }
        }],
        gridSpace = {
          offsetX : -100,
          offsetY : -100,
          zoomLevel : 1
        };
  
  const expectedPositionX = ((selectedElements[0].styles.x/gridSpace.zoomLevel)+(selectedElements[0].styles.width/2))-halfEditorWidth,
        expectedPositionY = (selectedElements[0].styles.y/gridSpace.zoomLevel)-editorHeightPlusMargin;

  act(() => {
    render(<ElementEditor
      selectedElements={selectedElements}
      gridSpace={gridSpace}
    />, container);
    const editorNode = container.firstChild;
    styles = window.getComputedStyle(editorNode);
  });

  expect(styles["_values"].left).toBe(`${expectedPositionY}px`);
  expect(styles["_values"].top).toBe(`${expectedPositionX}px`);

});

// it("it displays the element text when it recieved data with existing text", () => {

//   let editorNode = null,
//     testString = "this is a test",
//     offsetX = -5000,
//     offsetY = -5000,
//     zoomLevel = 100,
//     handleUpdatedText = function () { return true },
//     textEditor = {
//       id: "sdkfjnskdjfnskdj",
//       type: "rect",
//       styles: {
//         x: 4000,
//         y: 4000,
//         width: 3000,
//         height: 3000,
//         fillOpacity: "0",
//         stroke: "black",
//         strokeWidth: 200
//       },
//       text: testString,
//     };

//   act(() => {
//     render(<TextEditor
//       data={textEditor}
//       gridSpace={{ offsetX, offsetY, zoomLevel }}
//       handleUpdatedText={handleUpdatedText}
//     />, container);
//     editorNode = container.querySelector('.textContainer');
//   });

//   expect(editorNode.textContent).toBe(testString);

// });

// it("it is correctly positioned", () => {

//   let styles = null,
//     editorNode = null,
//     testString = "this is a test",
//     offsetX = -50,
//     offsetY = -50,
//     zoomLevel = 10,
//     handleUpdatedText = function () { return true },
//     textEditor = {
//       id: "sdkfjnskdjfnskdj",
//       type: "rect",
//       styles: {
//         x: 50,
//         y: 50,
//         width: 100,
//         height: 100,
//         fillOpacity: "0",
//         stroke: "black",
//         strokeWidth: 200
//       },
//       text: testString,
//     };

//   act(() => {
//     render(<TextEditor
//       data={textEditor}
//       gridSpace={{ offsetX, offsetY, zoomLevel }}
//       handleUpdatedText={handleUpdatedText}
//     />, container);
//     editorNode = container.firstChild;
//     styles = window.getComputedStyle(editorNode);
//   });

//   const finalWidth = textEditor.styles.width / zoomLevel,
//     finalHeight = textEditor.styles.height / zoomLevel,
//     finalX = (textEditor.styles.x / zoomLevel) - (offsetX / zoomLevel),
//     finalY = (textEditor.styles.y / zoomLevel) - (offsetY / zoomLevel);

//   expect(styles["_values"].width).toBe(`${finalWidth}px`);
//   expect(styles["_values"].height).toBe(`${finalHeight}px`);

//   expect(styles["_values"].top).toBe(`${finalX}px`);
//   expect(styles["_values"].left).toBe(`${finalY}px`);

// });

// it("is returns updated text after losing focus", () => {

//   let 
//     functionWasCalled = false,
//     testString = "this is a test",
//     offsetX = 0,
//     offsetY = 0,
//     zoomLevel = 0,
//     handleUpdatedText = (data) => { console.log("run"); functionWasCalled = data; },
//     textEditor = {
//       id: "sdkfjnskdjfnskdj",
//       type: "rect",
//       styles: {
//         x: 0,
//         y: 0,
//         width: 0,
//         height: 0,
//         fillOpacity: "0",
//         stroke: "black",
//         strokeWidth: 0
//       },
//       text: testString,
//     };

//   act(() => {
//     render(<TextEditor
//       data={textEditor}
//       gridSpace={{ offsetX, offsetY, zoomLevel }}
//       handleUpdatedText={handleUpdatedText}
//     />, container);
//     const editorNode = container.querySelector('.textContainer');
//     Simulate.blur(editorNode);
//   });

//   expect(functionWasCalled.id).toBe("sdkfjnskdjfnskdj");
//   expect(functionWasCalled.newText).toBe("this is a test");

// });
