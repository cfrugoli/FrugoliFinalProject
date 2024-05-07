await WebMidi.enable();



// Initialize audio context
const myAudio = new AudioContext();
let transposition = 0;
let delayToggle = false;
let delayTime = 500;
let velGain = 0.5;

const chords = {
  Major: [0, 4, 7],
  Minor: [0, 3, 7],
  Augmented: [0,4,8],
  Diminished: [0,3,6],
  "Major Seventh": [0,4,7,11],
  "Minor Seventh": [0,3,7,10],
  "Major Seven Flat Five": [0,4,6,11]

}

const possibleChords = Object.keys(chords); //store all of the keys from Chords in an array



//make the chord variable just an array with all of the intervals, this will make it simpler when making all of the pitches.
let chord = [0]
// const dynamicQuality = function(chordQuality) {
//   if (chordQuality === "Major") {
//     chord = [0, intervals.third[2], intervals.fifth[2]]; //[root, third, fifth]
//   } else if (chordQuality === "Minor") {
//     chord = [0, intervals.third[1], intervals.fifth[2]];
//   } else if (chordQuality === "Augmented") {
//     chord = [0, intervals.third[2], intervals.fifth[3]];
//   } else if (chordQuality === "Diminished") {
//     chord = [0, intervals.third[1], intervals.fifth[1]];
//   } else if (chordQuality === "Major Seventh") {
//     chord = [0, intervals.third[2], intervals.fifth[2], intervals.seventh[2]];
//   } else if (chordQuality === "Minor Seventh") {
//     chord = [0, intervals.third[1], intervals.fifth[2], intervals.seventh[1]]
//   } else if (chordQuality === "Major Seven Flat Five") {
//     chord = [0, intervals.third[2], intervals.fifth[1], intervals.seventh[2]]
//
//   }
// }
const chordCreation = function(midiInput) {
    let root = midiInput.number + transposition; //moving transposition in here
    let chordNotes = [];
    chord.forEach(function(localInterval){
      chordNotes.push(new Note(root + localInterval, {rawAttack: midiInput.rawAttack * velGain}))
    })
    return chordNotes;

}


  // Transposition function
// const transpose = function(midiInput, transposition) {
//   let pitch = (midiInput.note.number += transposition);
//   let transposedNote = pitch;
//   return chordCreation(transposedNote);
// }


// Create and connect audio nodes
// const delayNode = new DelayNode(myAudio, { delayTime: 0, maxDelayTime: 2 });
// const gainNode = myAudio.createGain();
// delayNode.connect(gainNode);
// gainNode.connect(myAudio.destination);

// // Initialize node values
// delayNode.delayTime.value = 0;
// gainNode.gain.value = 0.5;

// Connect HTML input/output elements to JS
const selectIn = document.getElementById("selectIn");
const selectOut = document.getElementById("selectOut");
const gainSlider = document.getElementById("gainSlider");
const gainSliderLabel = document.getElementById("gainSliderLabel");
const transposeButton = document.getElementById("transposeOnOff");
const transposeLabel = document.getElementById("transposeLabel");
const transposeSlider = document.getElementById("transposeSlider");
const transposeSliderLabel = document.getElementById("transposeSliderLabel");
const chordButton = document.getElementById("chordOnOff");
const chordLabel = document.getElementById("chordLabel");
const chordSelection = document.getElementById("chordSelection");
const delayButton = document.getElementById("delayOnOff");
const delayLabel = document.getElementById("delayLabel");
const delaySlider = document.getElementById("delaySlider");
const delaySliderLabel = document.getElementById("delaySliderLabel");
let userInput = WebMidi.inputs[0];
let userOutput = WebMidi.outputs[0].channels[1];

// Input initialization
WebMidi.inputs.forEach(function (input, num) {
  selectIn.innerHTML += `<option value=${num}>${input.name}</option>`;
});

WebMidi.outputs.forEach(function (input, num) {

  selectOut.innerHTML += `<option value=${num}>${input.name}</option>`;
});


possibleChords.forEach(function (chord, num) {

  chordSelection.innerHTML += `<option value=${num}>${chord}</option>`;
});
// Output initialization
// WebMidi.outputs.forEach(function (output, num) {
//   selectOut.innerHTML += `<option value=${num}>${output.name}</option>`;
// });

// Connect HTML button/slider elements to JS


// Gain slider functions
gainSlider.addEventListener("input", function () {
  gainSliderLabel.innerText = `Gain at ${gainSlider.value}%`;
  velGain =  parseFloat(gainSlider.value) / 100;
});

// Transposition functions
transposeButton.addEventListener("change", function () {
  if (this.checked) {
    transposeLabel.innerText = "Transposition On";
    transposeButton.style.backgroundColor = "#00cc0a";
    transposition = parseInt(transposeSlider.value);
  } else {
    transposeLabel.innerText = "Transposition Off";
    transposeButton.style.backgroundColor = "#ff0000";
    transposition = 0;
  }
});

transposeSlider.addEventListener("input", function () {
  if (transposeButton.checked){
    transposition = parseInt(transposeSlider.value);
  }

  transposeSliderLabel.innerText = `Transposition Amount: ${transposeSlider.value} Semitones`;
});

// Chord creation functions
chordButton.addEventListener("change", function () {
  if (this.checked) {
    chordLabel.innerText = "Chord Creation On";
    chordButton.style.backgroundColor = "#00cc0a";
    chord = chords[possibleChords[chordSelection.value]];
  } else {
    chordLabel.innerText = "Chord Creation Off";
    chordButton.style.backgroundColor = "#ff0000";
    chord = [0]// reset to no harmony
  }
});

chordSelection.addEventListener("change", function () {
  if (chordButton.checked){
    chord = chords[possibleChords[this.value]];
  }
});

// Delay functions
delayButton.addEventListener("change", function () {
  if (this.checked) {
    delayLabel.innerText = "Delay On";
    delayButton.style.backgroundColor = "#00cc0a";;
  } else {
    delayLabel.innerText = "Delay Off";
    delayButton.style.backgroundColor = "#ff0000";
  }
});

// function updateDelayTime(newDelayTime) {
//   let delayTimeIs = newDelayTime;
//   delayNode.delayTime.value = delayTimeIs;
// }

delaySlider.addEventListener("input", function () {
  delaySliderLabel.innerText = `Delayed by ${delaySlider.value} Milliseconds`;
  delayTime = parseFloat((delaySlider.value));

});

// MIDI output
selectIn.addEventListener("change", function () {
  userInput.removeListener("noteon");
  userInput.removeListener("noteoff");
  userInput = WebMidi.inputs[selectIn.value];
  // userOutput = WebMidi.outputs[selectOut.value].channels[1];
  userInput.addListener("noteon", function (someMIDI) {
    let midiNotes = chordCreation(someMIDI.note)
    console.log(midiNotes)
    userOutput.sendNoteOn(midiNotes)
    if (delayButton.checked){
      setTimeout(()=>{
        userOutput.sendNoteOn(midiNotes)
      }, delayTime)
    }
  });
  userInput.addListener("noteoff", function (someMIDI) {
    let midiNotes = chordCreation(someMIDI.note)
    userOutput.sendNoteOff(midiNotes)
    console.log(delayButton.checked)
    if (delayButton.checked){
      setTimeout(()=>{
        userOutput.sendNoteOff(midiNotes)
      }, delayTime)
    }
  });
});


selectOut.addEventListener("change", function () {

  userOutput = WebMidi.outputs[selectOut.value].channels[1];

});