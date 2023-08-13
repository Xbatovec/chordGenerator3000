# ChordGenerator3000
Program that visualize chords, loop rows of chords or randomly choose chords.

## How to start and use
Program runs on `node.js v19.0.0` but should also work on older versions.

To install all required node modules run `npm install`.

To start the program run `npm run app` or `node app.js` in a console in a app.js location.

Once it starts it will run on [localhost:1212](http://localhost:1212/). (You can change port in `app.js` if you want)

## What you need to know
#### General
```
The time unit is in miliseconds (1s = 1000ms)

rootNote stands for a root note of chords ("C", "C#", "Db", "D", ...)
chordType can be practically anything ("major", "mi", "maj7", ...)
rootNote & chordType must be same in every json file.

config.json set things lol
chords.json stores chords and you can add or edit there
rows.json stores rows of chords and you can add or edit there
```

#### chords
```
Pressed points are stored in an array list as strings.
There is one string for each finger used.
Every string is split into coordinates (2;4, 3;2) and number of finger (#2, #4 ...) ("coordinates numberOfFinger")

Each string have its number:
E = 1, B = 2, G = 3, D = 4, A = 5, E = 6

before '#' and after ',' must be a space
before and after ';' must be no space
```
###### Example:
```js
"major": {
  "B": {
    "activePoints": [
      "1;2, 5;2 #1", // 2 pressed point, finger 1
      "4;4 #2", // 1 pressed point, finger 2
      "3;4 #3", // 1 pressed point, finger 3
      "2;4 #4" // 1 pressed point, finger 4
    ],
    "inactiveStrings": [6] // inactive bottom E string
  }
},
```
Tip: `You can use localhost:1212/chordCode to create chords more easily.` ( [localhost:1212/chordCode](http://localhost:1212/chordCode) )

#### rows
```
Chords are stored in an array list as strings.
Every string is split into chord (Emi, Cmaj7, ...) and time how long the chord stays (1000, 4500, ...) ("chord, time")
Chord is made of root note & chord type added together without any space (rootNote + chordType)

after ';' must be a space
```
###### Example:
```js
"default1": ["Emi; 3000", "Gmajor; 7000"], // Emi stays for 3s & Gmajor stays for 7s
"default2": ["Dmajor; 1000", "Amajor"], // Dmajor stays for 1s & Amajor stays as long as it's set in config.json
```

## Json files
Each line of json files described.

### config.json
```js
czechChords: "For people from Czechia = true",
シ
```

```js
config.timer = "General time how long chords will last."
シ
```

```js
config.chordRow = {
  enabled: "Enable or disable looping through chord rows.",
  customTimer: "Enable or disable custom times for each chords.",
  row: "Name of a row that you wanna use."
}
```

```js
config.chords = {
  chordType: {
    rootNote: "Enable or disable chord.",
      ...
  },
    ...  
}
```

### chord.json
```js
chordType: {
  rootNote: {
    activePoints: "Points where the strings are pressed.",
    inactiveStrings: "Strings that are not played."
  },
    ...
},
  ...
```

### rows.json
```js
rowName: ["chordName; time", ...]
```
