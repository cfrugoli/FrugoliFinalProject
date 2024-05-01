await WebMidi.enable();

import MidiEffects from "./MidiEffects.js";
import MusicTools from "./MusicTools.js";

// Initialize audio context
const myAudio = new AudioContext();

// Create and connect audio nodes
const delayNode = new DelayNode(myAudio, { delayTime: 0, maxDelayTime: 2 });
const gainNode = myAudio.createGain();
delayNode.connect(gainNode);
gainNode.connect(myAudio.destination);

// Initialize node values
delayNode.delayTime.value = 0;
gainNode.gain.value = 0.5;

// Connect HTML input/output elements to JS
let selectIn = document.getElementById("selectIn");
// let selectOut = document.getElementById("selectOut");
let userInput = WebMidi.inputs[0];
// let userOutput = WebMidi.outputs[0].channels[1];

// Input initialization
WebMidi.inputs.forEach(function (input, num) {
  selectIn.innerHTML += `<option value=${num}>${input.name}</option>`;
});

// Output initialization
// WebMidi.outputs.forEach(function (output, num) {
//   selectOut.innerHTML += `<option value=${num}>${output.name}</option>`;
// });

// Connect HTML button/slider elements to JS
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

// Gain slider functions
gainSlider.addEventListener("input", function () {
  gainSliderLabel.innerText = `Gain at ${gainSlider.value}%`;
  gainNode.gain.value = gainSlider.value / 100;
});

// Transposition functions
transposeButton.addEventListener("change", function () {
  if (this.checked) {
    transposeLabel.innerText = "Transposition On";
    transposeButton.style.backgroundColor = "#00cc0a";
  } else {
    transposeLabel.innerText = "Transposition Off";
    transposeButton.style.backgroundColor = "#ff0000";
  }
});

transposeSlider.addEventListener("input", function () {
  transposeSliderLabel.innerText = `Transposition Amount: ${transposeSlider.value} Semitones`;
});

// Chord creation functions
chordButton.addEventListener("change", function () {
  if (this.checked) {
    chordLabel.innerText = "Chord Creation On";
    chordButton.style.backgroundColor = "#00cc0a";
  } else {
    chordLabel.innerText = "Chord Creation Off";
    chordButton.style.backgroundColor = "#ff0000";
  }
});

chordSelection.addEventListener("change", function () {
  MidiEffects.dynamicQuality(chordSelection);
  console.log(MidiEffects.dynamicQuality);
});

// Delay functions
delayButton.addEventListener("change", function () {
  if (this.checked) {
    delayLabel.innerText = "Delay On";
    delayButton.style.backgroundColor = "#00cc0a";
  } else {
    delayLabel.innerText = "Delay Off";
    delayButton.style.backgroundColor = "#ff0000";
  }
});

function updateDelayTime(newDelayTime) {
  let delayTimeIs = newDelayTime;
  delayNode.delayTime.value = delayTimeIs;
}

delaySlider.addEventListener("input", function () {
  delaySliderLabel.innerText = `Delayed by ${delaySlider.value} Milliseconds`;
  updateDelayTime(parseFloat(delaySlider.value) / 1000);
  console.log(delayNode.delayTime.value);
});

// MIDI output
selectIn.addEventListener("change", function () {
  userInput.removeListener("noteon");
  userInput.removeListener("noteoff");
  userInput = WebMidi.inputs[selectIn.value];
  // userOutput = WebMidi.outputs[selectOut.value].channels[1];
  userInput.addListener("noteon", function (someMIDI) {
    myAudio.destination.sendNoteOn(
      MidiEffects.transpose(someMIDI.note, parseInt(transposeSlider.value))
    );
  });
  userInput.addListener("noteoff", function (someMIDI) {
    myAudio.destination.sendNoteOff(
      MidiEffects.transpose(someMIDI.note, parseInt(transposeSlider.value))
    );
  });
});
