const express = require('express');
const app = express();

app.use(express.static(__dirname + "/public"));

/* index */
app.get('/', (_, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

/* port */
app.listen(1212, () => {
    console.log('Example app listening on port 1212!');
});