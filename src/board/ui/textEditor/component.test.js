import React from 'react';

import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import TextEditor from './index';

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

it("is hidden when it renders without data", () => {

  let styles = null;
  act(() => {
    render(<TextEditor
      data={null}
    />, container);
    const editorNode = container.firstChild;
    styles = window.getComputedStyle(editorNode);
  });

  expect(styles["_values"].visibility).toBe("hidden");

});

it("it displays the element text when it recieved data with existing text", () => {

  let editorNode = null,
    testString = "this is a test",
    offsetX = -5000,
    offsetY = -5000,
    zoomLevel = 100,
    handleUpdatedText = function () { return true },
    textEditor = {
      id: "sdkfjnskdjfnskdj",
      type: "shape",
      styles: {
        x: 4000,
        y: 4000,
        width: 3000,
        height: 3000,
        fillOpacity: "0",
        stroke: "black",
        strokeWidth: 200
      },
      text: testString,
    };

  act(() => {
    render(<TextEditor
      data={textEditor}
      gridSpace={{ offsetX, offsetY, zoomLevel }}
      handleUpdatedText={handleUpdatedText}
    />, container);
    editorNode = container.querySelector('.textContainer');
  });

  expect(editorNode.textContent).toBe(testString);

});

it("it is correctly positioned", () => {

  let styles = null,
    editorNode = null,
    testString = "this is a test",
    offsetX = -50,
    offsetY = -50,
    zoomLevel = 10,
    handleUpdatedText = function () { return true },
    textEditor = {
      id: "sdkfjnskdjfnskdj",
      type: "shape",
      styles: {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        fillOpacity: "0",
        stroke: "black",
        strokeWidth: 200
      },
      text: testString,
    };

  act(() => {
    render(<TextEditor
      data={textEditor}
      gridSpace={{ offsetX, offsetY, zoomLevel }}
      handleUpdatedText={handleUpdatedText}
    />, container);
    editorNode = container.firstChild;
    styles = window.getComputedStyle(editorNode);
  });

  const finalWidth = textEditor.styles.width / zoomLevel,
    finalHeight = textEditor.styles.height / zoomLevel,
    finalX = (textEditor.styles.x / zoomLevel) - (offsetX / zoomLevel),
    finalY = (textEditor.styles.y / zoomLevel) - (offsetY / zoomLevel);

  expect(styles["_values"].width).toBe(`${finalWidth}px`);
  expect(styles["_values"].height).toBe(`${finalHeight}px`);

  expect(styles["_values"].top).toBe(`${finalX}px`);
  expect(styles["_values"].left).toBe(`${finalY}px`);

});

it("is returns updated text after losing focus", () => {

  let 
    functionWasCalled = false,
    testString = "this is a test",
    offsetX = 0,
    offsetY = 0,
    zoomLevel = 0,
    handleUpdatedText = (data) => { console.log("run"); functionWasCalled = data; },
    textEditor = {
      id: "sdkfjnskdjfnskdj",
      type: "shape",
      styles: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        fillOpacity: "0",
        stroke: "black",
        strokeWidth: 0
      },
      text: testString,
    };

  act(() => {
    render(<TextEditor
      data={textEditor}
      gridSpace={{ offsetX, offsetY, zoomLevel }}
      handleUpdatedText={handleUpdatedText}
    />, container);
    const editorNode = container.querySelector('.textContainer');
    Simulate.blur(editorNode);
  });

  expect(functionWasCalled.id).toBe("sdkfjnskdjfnskdj");
  expect(functionWasCalled.newText).toBe("this is a test");

});

it("it resizes the text when the text overflows the container", () => {

  // let styles = null;
  // act(() => {
  //     render(<TextEditor 
  //         data={null}
  //     />, container);
  //     const editorNode = container.firstChild;
  //     styles = window.getComputedStyle(editorNode);
  // });

  // expect(styles["_values"].visibility).toBe("hidden");

});