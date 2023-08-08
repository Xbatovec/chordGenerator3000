// element by
function elId(id) {return document.getElementById(id);}
function elClass(id) {return document.getElementsByClassName(id);}
function elTag(id) {return document.getElementsByTagName(id)[0];}

// fetching json file
async function getJson(path) {
    const file = await fetch(path);
    const json = await file.json();
    return json;
}

// random item from array
function randomItem(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

// looping through object
function configFlat(obj, parent) {

    Object.keys(obj).forEach((key) => {

        if (typeof obj[key] === "object" && obj[key] !== null) configFlat(obj[key], key);
        else if (parent !== undefined && config.chords[parent][key]) activeChords.push(`${key}${parent}`);
    });
}

// draw a line onto canvas
function drawLine(startX, startY, endX, endY, lineWidth=1, color='black') {

    chordCtx.lineWidth = lineWidth;
    chordCtx.strokeStyle = color;

    chordCtx.beginPath();
    chordCtx.moveTo(startX, startY);
    chordCtx.lineTo(endX, endY);
    chordCtx.stroke();
}

// draw a text onto canvas
function drawText(text, x, y, size, color) {

    chordCtx.fillStyle = color;

    chordCtx.font = `${size}px Poppins`;
    chordCtx.fillText(text, x, y);
}

// draw a circle onto canvas
function drawCircle(x, y, radius, color='black') {

    chordCtx.fillStyle = color;

    chordCtx.beginPath();
    chordCtx.arc(x, y, radius, 0, 2 * Math.PI);
    chordCtx.fill();
}