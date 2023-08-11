// elements
const load = elId("load-loading-visualiser");
const chordElmnt = elId("chord");
const chordCanvas = elId("chord-map");
const chordCtx = chordCanvas.getContext('2d');

let chordMap = [];
let rootNote = "";
let type = "";

function draw() {

    // storing canvas properties
    const width = chordCanvas.width;
    const height = chordCanvas.height;

    // position adjustment
    const postionAdjustNum = positionAdjustment(chordMap);


    // chord name change (if type is major, eliminate it)
    chordElmnt.innerHTML = type === 'major' ? rootNote : rootNote + type;

    // clearing the canvas
    chordCtx.clearRect(0, 0, width, height);


    // drawing bars
    drawingBars(width, height);

    // drawing strings
    drawingStrings(chordMap, width, height);

    // drawing crosses
    drawingCrosses(chordMap, height);

    // drawing coordinates
    drawingLetters(height);
    drawingNumbers(width, postionAdjustNum);

    // drawing fingers
    drawingPoints(chordMap, width, height, postionAdjustNum);
}

draw();