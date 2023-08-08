function positionAdjustment(chordMap) {

    let farthestPos = 0;
    let nearestPos = 69420;
    
    // find farthest and nearest position in achord
    chordMap.activePoints.forEach(finger => {
        finger.split(' #')[0].split(', ').forEach(coords => {

            const pos = coords.split(";")[1];
            if (pos > farthestPos) farthestPos = pos;
            if (pos < nearestPos) nearestPos = pos;
        });
    });

    return parseInt((farthestPos <= 4) ? 0 : nearestPos);
}

// drawing bars
function drawingBars(width, height) {

    for (let i = 0; i < 5; i++) {
        const startPoint = { x: 90 + (width-110) * i / 4, y: 60 };
        const endPoint = { x: 90 + (width-110) * i / 4, y: height - 35 };
        const lineWidth = 2;
        const color = '#b9b9b9';

        drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, lineWidth, color);
    }
}

// drawing strings
function drawingStrings(chordMap, width, height) {

    for (let i = 0; i < 6; i++) {
        const startPoint = { x: 40, y: 65 + (height-105) * i / 5 };
        const endPoint = { x: width, y: 65 + (height-105) * i / 5 };
        const lineWidth = i+2;
        const color = chordMap.inactiveStrings.includes(i+1) ? '#dddddd69' : '#dddddd';

        drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, lineWidth, color);
    }
}

// drawing crosses
function drawingCrosses(chordMap, height) {

    for (let i = 0; i < 6; i++) {
        if (!chordMap.inactiveStrings.includes(i+1)) continue;

        const points = { x: 64, y: 65 + (height-105) * i / 5 };
        const color = '#e23a3a';

        drawText('x', points.x, points.y, 50, color);
    }
}

// drawing letters
function drawingLetters(height) {

    const letters = ['E', 'H', 'G', 'D', 'A', 'E'];
    for (let i = 0; i < 6; i++) {

        const points = { x: 15, y: 65 + (height-105) * i / 5 };
        const color = '#b7baf5';

        drawText(letters[i], points.x, points.y, 37, color);
    }
}

// drawing numbers
function drawingNumbers(width, postionAdjustNum) {

    for (let i = 0; i < 4; i++) {

        const points = { x: 90 + (width-110) * i / 4 + (width-110)/8, y: 20 };
        const color = '#b7baf5';

        drawText(i+postionAdjustNum + (postionAdjustNum ? 0 : 1), points.x, points.y, 37, color);
    }
}

// drawing points
function drawingPoints(chordMap, width, height, postionAdjustNum) {

    const color = '#9fa3f3';
    
    chordMap.activePoints.forEach(finger => {

        const fingerNum = finger.split(' #')[1];
        finger.split(' #')[0].split(', ').forEach(coords => {
            
            const pos = {
                str: parseInt(coords.split(";")[0]) - 1,
                num: parseInt(coords.split(";")[1]) - 1 - postionAdjustNum + (postionAdjustNum ? 1 : 0)
            };
            const modifiedPos = {
                str: 65 + (height-105) * pos.str / 5,
                num: 90 + (width-110) * pos.num / 4 + (width-110)/8
            };

            drawCircle(modifiedPos.num, modifiedPos.str, 22, color);
            drawText(fingerNum, modifiedPos.num, modifiedPos.str + 3, 27, 'black');
        });
    });
}