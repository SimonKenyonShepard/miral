import React from 'react';

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
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

it("it displays the element text when it recieved data ", () => {
  
  // let styles = null;
  // act(() => {
  //     render(<TextEditor 
  //         data={null}
  //     />, container);
  //     const editorNode = container.firstChild;
  //     styles = window.getComputedStyle(editorNode);
  // });
  
  // expect(styles["_values"].visibility).toBe("hidden");
  //EXPECT TEXT TO BE THERE
  //EXPECT CONTAINER POSITION TO BE CORRECT

});

it("is returns updated text after losing focus", () => {
  
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