// element by
function elId(id) {return document.getElementById(id);}
function elClass(id) {return document.getElementsByClassName(id);}
function elTag(id) {return document.getElementsByTagName(id)[0];}

const cord = elId("cord");
const cordMap = elId("cord-map");
const ctx = cordMap.getContext('2d');