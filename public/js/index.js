// elements
const load = elId("load-loading-visualiser");
const chordElmnt = elId("chord");
const chordCanvas = elId("chord-map");
const chordCtx = chordCanvas.getContext('2d');

// variables
let config;
let chords;
let rows;

const activeChords = [];

let loopInterval;
let loopRowIndex = 0;

async function download() {

    // Wait for the font to be loaded
    await loadFont();

    // fetching config and storing into variable
    config = await getJson("../config.json");

    // fetching chords and storing into variable
    chords = await getJson("../chords.json");

    // fetching rows and storing into variable
    rows = await getJson("../rows.json");

    // start of the program
    start();
}

download();

function start() {

    // sorting just active chords into activeChords
    configFlat(config.chords);

    // animating loading bar
    load.style.animationDuration = `${config.timer/1000}s`;

    // ctx settings
    chordCtx.textBaseline = "middle";
    chordCtx.textAlign = "center";

    // scale canvas
    /*
    if (window.innerWidth <= 875) {
        chordCanvas.width = window.innerWidth * 0.95;
        chordCanvas.height = 375 * (window.innerWidth * 0.95 / 850);
    }
    */

    // looping every X seconds that can be set in config.json (or rows.json)
    if (config.chordRow.enabled) loopChordRow();
    else {
        loopInterval = setInterval(() => loop(), config.timer);
        loop();
    }
}

function loop(rowChord) {

    // generating random chord
    const chord = rowChord === undefined ? randomItem(activeChords) : rowChord;
    const rootNote = chord.charAt(0);
    const type = chord.substring(1);

    // getting chord properties
    const chordMap = chords[type][rootNote];

    // storing canvas properties
    const width = chordCanvas.width;
    const height =  chordCanvas.height;

    // position adjustment
    const postionAdjustNum = positionAdjustment(chordMap);


    // chord name change (if type is major, eliminate it)
    chordElmnt.innerHTML = type === 'major' ? rootNote : chord;

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