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

    // responsive behaviour
    responsivity();

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
    const rootNote = chord.charAt(0) + ((chord.charAt(1) === '#' || chord.charAt(1) === 'b') ? chord.charAt(1) : '');
    const type = chord.substring((chord.charAt(1) === '#' || chord.charAt(1) === 'b') ? 2 : 1);

    // edit chord for proper display
    let shownChord = chord;
    if (config.czechChords) {
        switch (true) {
            case shownChord.slice(0, 2) === 'Bb': shownChord = 'B' + shownChord.slice(2); break;
            case shownChord.charAt(0) === 'B': shownChord = 'H' + shownChord.slice(1); break;
            default: break;
        }
    }
    if (type === 'major') shownChord = shownChord.slice(0, -5);

    // getting chord properties
    const chordMap = chords[type][rootNote];

    // storing canvas properties
    const width = chordCanvas.width;
    const height =  chordCanvas.height;

    // position adjustment
    const positionAdjustNum = positionAdjustment(chordMap);


    // chord name change (if type is major, eliminate it)
    chordElmnt.innerHTML = shownChord;

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
    drawingNumbers(width, positionAdjustNum);

    // drawing fingers
    drawingPoints(chordMap, width, height, positionAdjustNum);
}

// responsive behaviour
window.addEventListener('resize', () => responsivity());
function responsivity() {
    
    const elmnt = elId('plane-container');
    const width = elId('plane-container').offsetWidth;
    const height = elId('plane-container').offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;


    if (windowWidth > 875) return;

    const scale = (window.innerWidth * 0.95) / elId('plane-container').offsetWidth;
    elmnt.style.transform = `scale(${scale})`;
}