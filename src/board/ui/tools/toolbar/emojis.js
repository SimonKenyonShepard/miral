import React, {Component} from 'react';
import MultiTool from './multiTool';
import { store } from '../../../context/tools';

import './styles.css';

import Emoji from './emoji';

class Emojis extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};

        this.subMenuType = "emoji";
        if(!window.workshoppr) {
            window.workshoppr = {};
        }
        window.workshoppr.emojiCharacter = String.fromCodePoint((String("128513").toString(16)));
    }

    uglyHack(e) {
        //NEEDS TO BE REMOOVED ONCE WE SWITCH TO STORES FOR ELEMENT DATA
        window.workshoppr.emojiCharacter = String.fromCodePoint((String(e.target.id).toString(16)));
    }
  
    render() {
        const {
            handleDrawCanvasShow,
            registerDragHandler,
            handleDragMove,
            handleDragEnd,
            currentSelectedTool,
            handleDeselectAllElements
        } = this.props;

        const emojRange = [128512,128515,128516,128513,128518,128517,129315,128514,128578,128579,128521,128522,128519,129392,128525,129321,128536,128535,9786,128538,128537,128523,128539,128540,129322,128541,129297,129303,129325,129323,129300,129296,129320,128528,128529,128527,128530,128580,128556,128558,129317,128524,128532,128554,129316,128564,128567,129298,129301,129314,129326,129319,129397,129398,129396,128565,129327,129312,129395,128526,129299,129488,128533,128577,128562,128563,129402,128552,128560,128549,128546,128557,128561,128534,128531,128553,128548,128545,129324,128520,128127,128128,9760,128169,129313,128121,128122,128123,128125,128126,129302,128570,128569,128571,128576,128575,128584,128585,128586,128139,128140,128157,128148,10084,129505,128155,128154,128153,128156,128175,128165,128166,128168,128371,128163,128172,128495,128173,128164,128075,129306,128400,9995,128406,128076,9996,129310,129311,129304,129305,128072,128073,128070,128405,128071,9757,128077,128078,128074,129307,129308,128079,128588,128080,129309,128591,9997,128133,128170,129462,128066,128067,129504,129463,129460,128064,128065,128069,128068,128118,129490,128104,129492,128105,128117,128116,128581,128129,128587,129318,129335,127877,129464,129465,129497,129498,129499,129500,129501,129502,129503,127939,128131,128378,129496,128704,128716,128053,128018,129421,128054,128021,128041,128058,129418,129437,128049,128008,129409,128047,128005,128006,128052,128014,129412,129427,129420,128046,128002,128003,128055,128022,128023,128015,128016,128042,128043,129426,129433,128024,129423,129435,128045,128001,128057,128048,128063,128007,129428,129415,128059,128040,128060,129432,129441,128062,129411,128020,128019,128035,128036,128038,128039,129413,129414,129442,129417,129434,128056,129436,128010,128034,129422,128013,129430,129429,128051,128044,128032,128033,128025,128012,129419,128027,128028,128029,128030,128375,129410,129439,129440,128144,127801,127794,127795,127796,127797,9752,127809,127815,127816,127817,127818,127819,127820,127821,129389,127822,127823,127825,127827,129373,127813,129381,127814,129364,129365,127798,127812,127838,129384,129360,129374,129472,129385,127828,127839,127829,127789,129386,127790,127859,127857,127846,127849,127856,129473,127851,127852,127853,127868,127870,127863,127864,127866,127867,129346,127757,127758,127759,128506,129517,127956,127755,127957,127958,128642,128643,128644,128652,128656,128658,128657,128659,128661,127949,128690,128756,128761,128758,128755,128674,9992,128641,127771,9728,127776,9729,9925,9928,127780,127782,127784,127786,127785,127752,9748,9889,10052,9731,127754,127875,127876,129512,127880,127881,127882,127873,127942,9917,127936,127955,127918,127922,9824,9829,9830,9827,128083];

        const subMenuTools = [];

        emojRange.forEach(x => {
            const emojiEntity = String.fromCodePoint((String(x).toString(16)));
              subMenuTools.push(
                <Emoji
                    emojiCharacter={(
                    <span className={"emojiCharacter"} id={x} onClick={this.uglyHack}>    
                        {emojiEntity}
                    </span>
                    )}
                    emojiCharacterNumber={emojiEntity}
                    key={"tool_emoji-"+x}
                    handleDeselectAllElements={handleDeselectAllElements}
                    handleDrawCanvasShow={handleDrawCanvasShow}
                    registerDragHandler={registerDragHandler}
                    handleDragMove={handleDragMove}
                    handleDragEnd={handleDragEnd}
                    currentSelectedTool={currentSelectedTool}
                />
            );
        });

        return (
           
            <MultiTool 
                type={this.subMenuType}
                subMenuItems={subMenuTools}
                defaultTool={"emoji-128513"}
                noIconChange={true}
            />
                   
        );
    }
    
  }

  Emojis.contextType = store;

  export default Emojis;