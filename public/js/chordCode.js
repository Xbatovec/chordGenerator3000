// elements
const chordElmnt = elId("chord");
const chordCanvas = elId("chord-map");
const chordCtx = chordCanvas.getContext('2d');

// variables
let chordMap = {
    activePoints: ["2;1 #1","4;2 #2","5;3 #3"],
    inactiveStrings: [6]
};
let positionAdjustNum = 0;

let config;

// ctx settings
chordCtx.textBaseline = "middle";
chordCtx.textAlign = "center";

async function download() {

    // Wait for the font to be loaded
    await loadFont();

    // fetching config and storing into variable
    config = await getJson("../config.json");

    // start of the program
    draw();
}

download();

function draw() {

    const chord = chordElmnt.innerHTML;
    const rootNote = chord.charAt(0) + ((chord.charAt(1) === '#' || chord.charAt(1) === 'b') ? chord.charAt(1) : '');
    const type = chord.substring((chord.charAt(1) === '#' || chord.charAt(1) === 'b') ? 2 : 1);

    // storing canvas properties
    const width = chordCanvas.width;
    const height = chordCanvas.height;

    if (!chordMap.activePoints.length) chordMap.activePoints = ["-1;-1 #0"];

    // change chord code copy element value
    elId("copy-text").value = `"${type}": {\n\t"${rootNote}": {\n\t\t"activePoints": ${JSON.stringify(chordMap.activePoints.filter(item => !item.includes('#0')))},\n\t\t"inactiveStrings": ${JSON.stringify(chordMap.inactiveStrings)}\n\t}\n}`;

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

function canvasClicked(event) {

    const x = event.offsetX;
    const y = event.offsetY;

    // storing canvas properties
    const width = chordCanvas.width;
    const height = chordCanvas.height;

    if (isPointInRectangle(x, y, 0, 0, width, 35)) changePositionAdjustment();
    else if (isPointInRectangle(x, y, 40, 36, 90, height)) changeInactiveString(y, height);
    else if (isPointInRectangle(x, y, 91, 36, 830, height)) changeActivePoints(x, y, height);
}

function changePositionAdjustment(x, y) {
    
    const savedpositionAdjustNum = positionAdjustNum;

    positionAdjustNum = positionAdjustNum + 1 > 16 ? 0 : positionAdjustNum + 1;
    if (positionAdjustNum > 0 && positionAdjustNum < 3) positionAdjustNum = 3;

    const incrementedActivePoints = [];
    const move = positionAdjustNum - savedpositionAdjustNum;

    chordMap.activePoints.forEach(item => {
        const result = item.split(' #')[0].split(', ').map(section => {
            // Split each section by semicolon
            const [str, num] = section.split(';');
            
            // Increment the number after semicolon by one
            const incrementedNumber = parseInt(num) + move - ((move == 3) ? 1 : 0) + ((move == -16) ? 1 : 0);
            
            // Join the parts back together with the incremented number
            return `${str};${incrementedNumber}`;
        }).join(', ');

        incrementedActivePoints.push(`${result} #${item.split(' #')[1]}`);
    });

    chordMap.activePoints = incrementedActivePoints;

    draw();
}

function changeInactiveString(y, height) {
    
    let cell = 0;

    // get clicked string
    for (let i = 0; i < 6; i++) if (y < height - (height-36) * (i / 6)) cell = 6-i;

    // remove or add inactive string to chordMap.inactiveStrings array
    if (chordMap.inactiveStrings.includes(cell)) chordMap.inactiveStrings = chordMap.inactiveStrings.filter(item => item !== cell);
    else chordMap.inactiveStrings.push(cell);

    // sort inactive strings
    chordMap.inactiveStrings.sort();
    
    draw();
}

function changeActivePoints(x, y, height) {

    let cell = { num: 0, str: 0 };
    let fingerNum = 1;
    let fingerAdded = false;
    const chordMapActivePoints = [];

    // get str and num values
    for (let i = 0; i < 6; i++) {
        if (x < 830 - (830-91) * (i / 4) && i < 4) cell.num = 4-i + positionAdjustNum - (positionAdjustNum ? 1 : 0);
        if (y < height - (height-36) * (i / 6)) cell.str = 6-i;
    }

    // loop through active points, remove clicked point and get its finger num
    for (let i = 0; i < chordMap.activePoints.length; i++) {

        const splittedItem = chordMap.activePoints[i].split('#');
        
        switch (true) {

            // any finger before last finger in a string
            case splittedItem[0].includes(`${cell.str};${cell.num}, `):
                chordMap.activePoints[i] = chordMap.activePoints[i].replace(`${cell.str};${cell.num}, `, '');
                fingerNum = parseInt(splittedItem[1]) + 1;
                break;

            // last finger in a string
            case splittedItem[0].includes(`, ${cell.str};${cell.num} `):
                chordMap.activePoints[i] = chordMap.activePoints[i].replace(`, ${cell.str};${cell.num}`, '');
                fingerNum = parseInt(splittedItem[1]) + 1;
                break;

            // only finger in a string
            case splittedItem[0].includes(`${cell.str};${cell.num} `):
                chordMap.activePoints.splice(i, 1);
                fingerNum = parseInt(splittedItem[1]) + 1;
                break;

            // none finger in a string
            default: break;
        }

    }
    
    // save active chords in a chordMapActivePoints array with the finger number being the first
    chordMap.activePoints.forEach(item => {
        
        const splittedItem = item.split(' #');

        // add active point to existing finger num
        if (splittedItem[1] == fingerNum) {
            splittedItem[0] += `, ${cell.str};${cell.num}`;
            fingerAdded = true;
        }

        // add switched string in a chordMapActivePoints array
        chordMapActivePoints.push(`${splittedItem[1]}|${splittedItem[0]}`);
    });

    // add string if finger num is not listed in active points
    if (!fingerAdded && fingerNum < 6 ) chordMapActivePoints.push(`${fingerNum}|${cell.str};${cell.num}`);

    // sort chordMapActivePoints array by finger nums
    chordMapActivePoints.sort();

    // add active points back with edited clicked point
    chordMap.activePoints = [];
    chordMapActivePoints.forEach(item => {
        const splittedItem = item.split('|');

        chordMap.activePoints.push(`${splittedItem[1]} #${splittedItem[0]}`);
    });

    draw();
}

function copyCode() {
    elId('copy-text').select();
    document.execCommand('copy');
}

// clear canvas from active points and crosses
function clear() {
    chordMap.activePoints = [];
    chordMap.inactiveStrings = [];
    positionAdjustNum = 0;
    draw();
}