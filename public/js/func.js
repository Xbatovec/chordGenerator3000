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