export function createElementBaseObject(id, type, initialZoomLevel) {
    return {
        id,
        type,
        styles : {
            x : 0,
            y : 0,
            width : 1,
            height: 1,
            fillOpacity: 0,
            fill: "#ffffff",
            stroke : "#000000",
            strokeOpacity : 1,
            strokeWidth : 2*initialZoomLevel,
            strokeDasharray : "0"
        },
        fontStyle : {
            fontSize : 24*initialZoomLevel,
            fontFamily : "",
            fontWeight : "normal",
            fontStyle : "normal",
            textDecorationLine : "",
            color : "#080808",
            textAlign: "center",
            alignItems : "center" 
        },
        text : "",
        initialZoomLevel,
        link : "",
        hidden : false,
        groups : [],
        locked : false,
        comments : [], //not yet implemented
        rotation : 0, //not yet implemented
        flipped : false //not yet implemented
    };
}