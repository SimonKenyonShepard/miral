import React, {PureComponent} from 'react';

class WrappedText extends PureComponent {

    constructor(props, context) {
        super(props, context);
        const {
            fontStyle,
            text
        } = props;

        this.state = {
            wordLengths : this.calculateWordLength(text, fontStyle.fontSize, fontStyle.fontFamily)
        };
    }

    calculateWordLength = (text, fontSize, fontFamily) => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.width = '0';
        svg.style.height = '0';
        svg.style.position = 'absolute';
        svg.style.top = '-100%';
        svg.style.left = '-100%';
        const textSizeTester = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textSizeTester.style.fontSize = fontSize;
        textSizeTester.style.fontFamily = fontFamily;
        svg.appendChild(textSizeTester);
        document.body.appendChild(svg);

        const wordLengths = [];
        text.split(/\n|\r/g).forEach(textBlock => {
            const wordsInBlock = [];
            textBlock.split(/\s/g).forEach(word => {
                textSizeTester.innerHTML = word + "&nbsp;";
                const textSize = textSizeTester.getComputedTextLength();
                wordsInBlock.push(textSize);
            });
            wordLengths.push(wordsInBlock);
        });

        document.body.removeChild(svg);

        return wordLengths;
    }

    wrappedText(text, wordLengths, width) {
        let newLines = [];
        text.split(/\n|\r/g).forEach((textBlock, textBlockIterator) => {
            const lines = [""];
            let lineLength = 0;
            textBlock.split(/\s/g).forEach((word, wordIterator) => {
                
                const textSize = wordLengths[textBlockIterator][wordIterator];
                lineLength += textSize;
                if(lineLength < width) {
                    lines[lines.length-1] += word + " ";
                } else {
                    lines.push("");
                    lines[lines.length-1] += word + " ";
                    lineLength = textSize;
                }
            });
            newLines = newLines.concat(lines);
        });

        return newLines;
        
    }
  
    render() {

        const {
            shapeProps,
            fontStyle,
            text,
            padding
        } = this.props;

        const wrappedText = this.wrappedText(
            text,
            this.state.wordLengths,
            shapeProps.width-(padding*2)
        );

        const textXAndPadding = shapeProps.x + padding;
        const textWidthMinusPadding = shapeProps.width - (padding*2);
        const textYAndPadding = shapeProps.y + padding;
        const areaHeightMinusPadding = shapeProps.height - (padding*2);

        let textAnchor = "middle";
        let textAnchorPosition = textXAndPadding + (textWidthMinusPadding/2);
        if(fontStyle.textAlign === "left") {
            textAnchor = "start";
            textAnchorPosition = textXAndPadding;
        } else if (fontStyle.textAlign === "right") {
            textAnchor = "end";
            textAnchorPosition = textXAndPadding + textWidthMinusPadding;
        }

        const textBlockHeight = (wrappedText.length)*(fontStyle.fontSize*1.4);
        let textBaseline = "middle";
        let textBaseLinePosition = (textYAndPadding + (areaHeightMinusPadding/2));
        const isMultiLine = (wrappedText.length > 1);
        if(isMultiLine) {
            textBaseline = "text-before-edge";
            textBaseLinePosition = (textYAndPadding + (areaHeightMinusPadding/2)) - textBlockHeight/2;
        }
        if(fontStyle.alignItems === "top") {
            textBaseline = "text-before-edge";
            textBaseLinePosition = textYAndPadding;
        } else if(fontStyle.alignItems === "bottom") {
            textBaseline = "text-before-edge";
            
            textBaseLinePosition = (textYAndPadding + areaHeightMinusPadding)-textBlockHeight;
        }
        return (
            <text
                    x={(shapeProps.x)}
                    y={(textBaseLinePosition)}
                    fontSize={(fontStyle.fontSize)}
                    fontFamily={(fontStyle.fontFamily || "sans-serif")}
                    pointerEvents={"none"}
                    textAnchor={textAnchor}
                    dominantBaseline={(textBaseline)}
                    style={{
                        letterSpacing : fontStyle.fontSize*0.0083,
                        userSelect : "none"
                    }}
                >
                    {wrappedText.map((line, i) => {
                        
                        const dy = i > 0 ? fontStyle.fontSize*1.4 : fontStyle.fontSize*0.1;
                        return(<tspan pointerEvents={"none"} key={`${line}_${i}`} x={textAnchorPosition} dy={dy} textAnchor={textAnchor}>{line}</tspan>);
                    })}
            </text>
        );
    }
    
  }

  export default WrappedText;