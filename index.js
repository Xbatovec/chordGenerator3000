// element by
function elId(id) {return document.getElementById(id);}
function elClass(id) {return document.getElementsByClassName(id);}
function elTag(id) {return document.getElementsByTagName(id)[0];}

const chord = elId("cord");
const chordMap = elId("cord-map");
const ctx = chordMap.getContext('2d');