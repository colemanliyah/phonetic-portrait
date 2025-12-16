// Summary:
// 1. The code waits for user to say a word or sentence
// 2. Once it regonizes words, they are parsed parseResult()
// 3. Then each word in the sentence has numerical value representing it's phonetic characterisitc of vowels and and constonants
// TODO: Take the individual phonetic, numerical value of each word or of the total sentence and make some music composition using frameCount, amplitude, etc.

let speechRec;
let totalVowels = 0; // Total vowels in the sentence
let totalConstants = 0; // Total constonants in the sentence
let tracks = [];
let trackRate = -1; //ADD
let vCountGlobal = 0; //ADD

function preload() {
  tracks = [
    loadSound("sound/track1.mp3"), // 0 : consonant 1~2
    loadSound("sound/track2.mp3"), // 1 : consonant 3~4
    loadSound("sound/track3.mp3"), // 2 : consonant 5~6
    loadSound("sound/track4.mp3"), // 3 : consonant 7~8
    loadSound("sound/track5.mp3"), // 4 : consonant 9~10
    loadSound("sound/track6.mp3"), // 5 : consonant 11
  ];
}

function setup() {
  createCanvas(400, 400);

  speechRec = new p5.SpeechRec();
  speechRec.continuous = true;

  speechRec.onResult = parseResult;
  speechRec.start();

  // instructions:
  textSize(10);
  textAlign(CENTER);
  text(
    "Say a word or sentece to get Phonetic Audio Characterisitcs",
    width / 2,
    height / 2
  );
}

function draw() {
  if (trackRate >= 0) {
    let t = tracks[trackRate];//ADD

    console.log("Global V is ", vCountGlobal);
    let interval = 20 + vCountGlobal * 3;
      if (frameCount % interval === 0) { 
        t.stop(); //ADD
        t.play(); //ADD
      }
  }
}

function parseResult() {
  let sentence = [];

  if (speechRec.resultValue == true) {
    // Printing the word or word(s) to the screen
    background(220);
    textSize(15);
    text(speechRec.resultString, width / 2, height / 2);
    console.log(speechRec.resultString);

    // The algo can catch single words or sentences!
    let parsed = splitTokens(speechRec.resultString);

    if (parsed.length < 2) {
      // If the speech only picked up a word
      let parsedWord = speechRec.resultString.split("");
      sentence.push(parsedWord);
      console.log(parsedWord);
    } else {
      //If the speech picked up a string of words
      parsed.forEach((word) => {
        let parsedWord = word.split("");
        sentence.push(parsedWord);
        console.log(parsedWord);
      });
    }

    // FOR DEBUGGING:
    // console.log(sentence);

    getPhonetics(sentence);
  }
}

function getPhonetics(sen) {
  // Assigning a numberical value to vowels and consonants
  // NOTE: We don't have to do vowels and constants, we could separate letters by soft vs harsh, nasal vs plosive
  let phoneticValue = 0;
  let localV = 0;
  let localC = 0;

  sen.forEach((word) => {
    word.forEach((l) => {
      if ("aeiou".includes(l)) {
        localV += 5; // airy vowels
        totalVowels += 5;
      } else {
        localC += 2; // consonants
        totalConstants += 2;
      }
    });
  });

  // FOR DEBUGGING:
  // console.log(sentencePhoneticValues);
  // console.log(totalVowels);
  // console.log(totalConstants);

  vCountGlobal += localV; //ADD //Liyah: Changed from "=" to "+="
  
  
  let totalLetters = localC + localV;
  let cPercent = (localC / totalLetters) * 100;  // 0–100%
  playTrack(cPercent, localV);
}

function getSound(cCount) {
  let percent = Math.floor(cCount);
  
  console.log("c count is ", percent);
  
  if (percent < 10) return 0; // A 
  if (percent < 20) return 1; // I am a ai
  if (percent < 30) return 2; // A unique idea is in a quiet area.
  if (percent < 40) return 3; // A quirky otter is on a log
  if (percent < 50) return 4; // The area is above you all
  return 5; //Strong crabs sprint past cliffs
}

function getPitch(vCount) {
  if (vCount >= 0 && vCount <= 2) return 1.0; // normal
  if (vCount >= 3 && vCount <= 4) return 0.8;
  if (vCount >= 5 && vCount <= 6) return 0.6;
  if (vCount >= 7) return 0.5; // Liyah: changed > to >= 7
}

function playTrack(cCount, vCount) {
  let s = getSound(cCount);
  if (s === -1) return;
 
  
  // Debuging
  // console.log("Rate is ", rate);
  // console.log("ts is ", typeof(ts));
  // console.log("s is ", s);
  
  //rate = constrain(rate, 0.4, 0.2);

  trackRate = s;

  // Debugging
  // console.log("playing", s);
  // console.log(rate);
}
