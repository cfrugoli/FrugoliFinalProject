// Transposition function
const transpose = function (midiInput, transposition) {
  let pitch = (midiInput.note.number += transposition);
  let newNote = new Note(pitch);
  return newNote;
};

// Chord note initiliazation
let chordSecond = second[0];
let chordThird = third[1];
let chordFourth = fourth[0];
let chordFifth = fifth[1];
let chordSixth = sixth[0];
let chordSeventh = seventh[0];

// Chord tonality bank
let second = [0, 2];
let third = [0, 3, 4];
let fourth = [0, 5, 6];
let fifth = [0, 6, 7, 8];
let sixth = [0, 8, 9];
let seventh = [0, 9, 10, 11];

// Chord function
const dynamicQuality = function (chordQuality) {
  if ((chordQuality = "Major")) {
    chordThird = third[2];
    chordFifth = fifth[2];
  } else if ((chordQuality = "Minor")) {
    chordThird = third[1];
    chordFifth = fifth[2];
  } else if ((chordQuality = "Augmented")) {
    chordThird = third[2];
    chordFifth = fifth[3];
  } else if ((chordQuality = "Diminished")) {
    chordThird = third[1];
    chordFifth = fifth[1];
  } else if ((chordQuality = "Major Seventh")) {
    chordThird = third[2];
    chordFifth = fifth[2];
    chordSeventh = seventh[2];
  } else if ((chordQuality = "Minor Seventh")) {
    chordThird = third[1];
    chordFifth = fifth[2];
    chordSeventh = seventh[1];
  } else if ((chordQuality = "Major Seven Flat Five")) {
    chordThird = third[2];
    chordFifth = fifth[1];
    chordSeventh = seventh[2];
  }
  return chord;
};
const chordCreation = function (midiInput) {
  let root = midiInput.note.number;
  let chord = [
    root,
    chordSecond,
    chordThird,
    chordFourth,
    chordFifth,
    chordSixth,
    chordSeventh,
  ];
  return chord;
};
