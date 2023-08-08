// elements
const load = elId("load-loading-visualiser");
const chordElmnt = elId("chord");
const chordCanvas = elId("chord-map");
const chordCtx = chordCanvas.getContext('2d');

// variables
let config;
let chords;

const font = new FontFace('Poppins', 'url(https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap)');
const activeChords = [];

let loopInterval;

async function download() {

    // fetching config and storing into variable
    config = await getJson("../config.json");

    // fetching chords and storing into variable
    chords = await getJson("../chords.json");

    // start of the program
    start();
}

download();

function start() {

    // sorting just active chords into activeChords
    configFlat(config);

    // animating loading bar
    load.style.animation = `load-animation ${config.timer/1000}s linear infinite`;

    // ctx settings
    chordCtx.textBaseline = "middle";
    chordCtx.textAlign = "center";

    // looping every X seconds that can be set in config.json
    loopInterval = setInterval(() => loop(), config.timer);
    loop();
}

function loop() {

    // generating random chord
    const chord = randomItem(activeChords);
    const rootNote = chord.charAt(0);
    const type = chord.substring(1);

    // getting chord properties
    const chordMap = chords[type][rootNote];

    // storing canvas properties
    const width = chordCanvas.width;
    const height =  chordCanvas.height;

    // position adjustment
    const postionAdjustNum = positionAdjustment(chordMap);


    // chord name change
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