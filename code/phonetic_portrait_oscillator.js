// =============================
// Letter → Musical Frequency on C Major Pentatonic Scale & Duration Table
// =============================
const letterTable = {
  a: { note: "G", dur: 0.25, type: "vowel" },
  e: { note: "A", dur: 0.25, type: "vowel" },
  i: { note: "G", dur: 0.25, type: "vowel" },
  o: { note: "E", dur: 0.25, type: "vowel" },
  u: { note: "E", dur: 0.25, type: "vowel" },
  b: { note: "D", dur: 0.05, type: "plosive" },
  c: { note: "D", dur: 0.05, type: "plosive" },
  d: { note: "D", dur: 0.05, type: "plosive" },
  f: { note: "A", dur: 0.12, type: "fricative" },
  g: { note: "C", dur: 0.05, type: "plosive" },
  h: { note: "A", dur: 0.08, type: "fricative" },
  j: { note: "G", dur: 0.06, type: "affricate" },
  k: { note: "D", dur: 0.05, type: "plosive" },
  l: { note: "E", dur: 0.1, type: "liquid" },
  m: { note: "D", dur: 0.12, type: "nasal" },
  n: { note: "D", dur: 0.12, type: "nasal" },
  p: { note: "C", dur: 0.05, type: "plosive" },
  q: { note: "D", dur: 0.05, type: "plosive" },
  r: { note: "E", dur: 0.1, type: "liquid" },
  s: { note: "C", dur: 0.15, type: "fricative" },
  t: { note: "D", dur: 0.05, type: "plosive" },
  v: { note: "A", dur: 0.12, type: "fricative" },
  w: { note: "E", dur: 0.08, type: "glide" },
  x: { note: "A", dur: 0.06, type: "fricative" },
  y: { note: "G", dur: 0.08, type: "glide" },
  z: { note: "C", dur: 0.15, type: "fricative" },
};

const noteFreqs = {
  C: 261.63,
  D: 293.66,
  E: 329.63,
  G: 392.0,
  A: 440.0,
};

let speechRec;
let osc1, osc2, osc3;
let lpFilter;
let env;
let reverb;

let playlist = [];
let nextTriggerTime = 0;
let noteIndex = 0;

// Ambient Pad Notes
let ambientOscs = [];
let ambientNotes = ["C", "D", "E", "G", "A"];
let ambientGain;

function setup() {
  createCanvas(400, 400);

  // ----------------------------
  // Speech recognition
  // ----------------------------
  speechRec = new p5.SpeechRec("en-US");
  speechRec.continuous = true;
  speechRec.onResult = parseResult;
  speechRec.start();

  // ----------------------------
  // Phonetic portrait oscillators
  // ----------------------------
  osc1 = new p5.Oscillator("triangle");
  osc2 = new p5.Oscillator("sine");
  osc3 = new p5.Oscillator("triangle");

  osc1.start();
  osc2.start();
  osc3.start();

  osc1.amp(0);
  osc2.amp(0);
  osc3.amp(0);

  // ----------------------------
  // Low-pass filter
  // ----------------------------
  lpFilter = new p5.LowPass();
  lpFilter.freq(800);
  lpFilter.res(1.2);

  osc1.disconnect();
  osc2.disconnect();
  osc3.disconnect();

  osc1.connect(lpFilter);
  osc2.connect(lpFilter);
  osc3.connect(lpFilter);

  env = new p5.Envelope();
  env.setADSR(0.2, 0.8, 0.6, 1.2);

  // ----------------------------
  // Reverb for blend
  // ----------------------------
  reverb = new p5.Reverb();
  reverb.process(lpFilter, 4, 3);
  reverb.amp(0.4);

  // ----------------------------
  // Setup ambient pad
  // ----------------------------
  setupAmbient();

  // ----------------------------
  // Instructions
  // ----------------------------
  textSize(10);
  textAlign(CENTER);
  text(
    "Say a word or sentence to get your Phonetic Portrait",
    width / 2,
    height / 2
  );
}

function draw() {
  if (playlist.length > 0 && millis() > nextTriggerTime) {
    playNextNote();
  }
}

// ----------------------------
// Play next note in phonetic portrait
// ----------------------------
function playNextNote() {
  if (!playlist[noteIndex]) return;
  let noteData = playlist[noteIndex];
  let freq = noteFreqs[noteData.note];

  osc1.freq(freq, 0.2);
  osc2.freq(freq * 1.01, 0.2);
  osc3.freq(freq * 0.995, 0.2);

  osc1.amp(0.15, 0.1);
  osc2.amp(0.12, 0.1);
  osc3.amp(0.1, 0.1);

  env.play(lpFilter, 0, noteData.dur);

  nextTriggerTime = millis() + noteData.dur * 900;

  noteIndex++;
  if (noteIndex >= playlist.length) {
    playlist = [];
    noteIndex = 0;
  }
}

// ----------------------------
// Parse speech recognition result
// ----------------------------
function parseResult() {
  if (speechRec.resultValue) {
    osc1.amp(0, 0.4);
    osc2.amp(0, 0.4);
    osc3.amp(0, 0.4);

    background(220);
    textSize(15);
    text(speechRec.resultString, width / 2, height / 2);
    console.log(speechRec.resultString);

    let words = splitTokens(speechRec.resultString);
    let sentence = {};
    words.forEach((word) => {
      sentence[word] = { totalDur: 0, weightedFreq: 0 };
    });
    getSentenceFrequency(sentence);
  }
}

// ----------------------------
// Compute weighted frequency for each word
// ----------------------------
function getSentenceFrequency(sentence) {
  let wordKeys = Object.keys(sentence);

  for (let i = 0; i < wordKeys.length; i++) {
    let currentWord = wordKeys[i];
    let letters = currentWord.toLowerCase().split("");
    let validLetters = letters.filter((l) => letterTable[l]);

    if (validLetters.length > 0) {
      let notes = validLetters.map((l) => letterTable[l].note);
      let durs = validLetters.map((l) => letterTable[l].dur);

      let totalDur = durs.reduce((a, b) => a + b, 0);

      let weighted = {};
      notes.forEach((n, i) => {
        weighted[n] = (weighted[n] || 0) + durs[i];
      });

      let bestNote = Object.keys(weighted).sort(
        (a, b) => weighted[b] - weighted[a]
      )[0];

      playlist.push({
        note: bestNote,
        dur: totalDur,
      });
    }
  }
}

// Ambient pad setup
function setupAmbient() {
  ambientGain = new p5.Gain();
  ambientGain.amp(0.02); // overall ambient volume, quieter than phonetic notes
  ambientGain.connect(lpFilter); // connect through your low-pass filter

  for (let i = 0; i < ambientNotes.length; i++) {
    let osc = new p5.Oscillator("sine");
    osc.freq(noteFreqs[ambientNotes[i]]);
    osc.amp(0, 0);
    osc.start();
    osc.connect(ambientGain); // connect through gain instead of directly to filter
    ambientOscs.push(osc);

    // Fade in/out loop for smooth, evolving pad
    let fadeLoop = () => {
      let fadeInTime = random(6, 12);  // fade in over 6–12 seconds
      let fadeOutTime = random(10, 20); // fade out over 10–20 seconds
      osc.amp(0.015, fadeInTime);      // fade in softly
      setTimeout(() => {
        osc.amp(0, fadeOutTime);       // fade out slowly
      }, fadeInTime * 1000);
    };

    setInterval(fadeLoop, random(15000, 25000)); // repeat fade loop
    fadeLoop(); // start immediately
  }
}

