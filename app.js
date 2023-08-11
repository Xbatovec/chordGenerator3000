const express = require('express');
const app = express();

app.use(express.static(__dirname + "/public"));

// index
app.get('/', (_, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// chord code
app.get('/chordCode', (_, res) => {
    res.sendFile(__dirname + "/public/html/chordCode.html");
});

// port
app.listen(1212, () => {
    console.log('App listening on port 1212!');
});