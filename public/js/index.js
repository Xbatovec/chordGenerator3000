const chord = elId("chord");
const chordMap = elId("chord-map");
const ctx = chordMap.getContext('2d');

let config;
let chords;

let loopInterval;

getJson("../config.json").then(configData => {

    config = configData;

    getJson("../chords.json").then(chordsData => {

        chords = chordsData;
        start();
    });
});

function start() {

    console.log("hehe");
    loopInterval = setInterval(() => loop(), config.timer);
    loop();
}

function loop() {
    
}