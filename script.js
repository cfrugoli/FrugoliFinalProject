await WebMidi.enable();

let selectIn = document.getElementById("selectIn");
let selectOut = document.getElementById("selectOut");
let userInput = WebMidi.inputs[0];
let userOutput = WebMidi.outputs[0].channels[1];

// Input initialization
WebMidi.inputs.forEach(function (input, num) {
  selectIn.innerHTML += `<option value=${num}>${input.name}</option>`;
});

// Output initialization
WebMidi.outputs.forEach(function (output, num) {
  selectOut.innerHTML += `<option value=${num}>${output.name}</option>`;
});

// Connect HTML components to JS file
const transposeButton = document.getElementById("transposeOnOff");
const transposeLabel = document.getElementById("transposeLabel");
const transposeSlider = document.getElementById("transposeSlider");
const transposeSliderLabel = document.getElementById("transposeSliderLabel");
const chordButton = document.getElementById("chordOnOff");
const chordLabel = document.getElementById("chordLabel");
const delayButton = document.getElementById("delayOnOff");
const delayLabel = document.getElementById("delayLabel");
const delaySlider = document.getElementById("delaySlider");
const delaySliderLabel = document.getElementById("delaySliderLabel");
const arpButton = document.getElementById("arpOnOff");
const arpLabel = document.getElementById("arpLabel");
const arpSlider = document.getElementById("arpSlider");
const arpSliderLabel = document.getElementById("arpSliderLabel");

chordButton.addEventListener("change", function () {
  if (this.checked) {
    chordLabel.innerText = "Chord Creation On";
    chordButton.style.backgroundColor = "#00cc0a";
  } else {
    chordLabel.innerText = "Chord Creation Off";
    chordButton.style.backgroundColor = "#ff0000";
  }
});

transposeButton.addEventListener("change", function () {
  if (this.checked) {
    transposeLabel.innerText = "Transposition On";
    transposeButton.style.backgroundColor = "#00cc0a";
  } else {
    transposeLabel.innerText = "Transposition Off";
    transposeButton.style.backgroundColor = "#ff0000";
  }
});

delayButton.addEventListener("change", function () {
  if (this.checked) {
    delayLabel.innerText = "Delay On";
    delayButton.style.backgroundColor = "#00cc0a";
  } else {
    delayLabel.innerText = "Delay Off";
    delayButton.style.backgroundColor = "#ff0000";
  }
});

arpButton.addEventListener("change", function () {
  if (this.checked) {
    arpLabel.innerText = "Arpeggiator On";
    arpButton.style.backgroundColor = "#00cc0a";
  } else {
    arpLabel.innerText = "Arpeggiator Off";
    arpButton.style.backgroundColor = "#ff0000";
  }
});

transposeSlider.addEventListener("input", function () {
  transposeSliderLabel.innerText = `Transposition Amount: ${transposeSlider.value} Semitones`;
});

delaySlider.addEventListener("input", function () {
  delaySliderLabel.innerText = `Delayed by ${delaySlider.value} Milliseconds`;
});

arpSlider.addEventListener("input", function () {
  arpSliderLabel.innerText = `${arpSlider.value} Milliseconds Between Notes`;
});
