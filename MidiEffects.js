const MidiEffects = {
  // Chord tonality bank
  second: [0, 2],
  third: [0, 3, 4],
  fourth: [0, 5, 6],
  fifth: [0, 6, 7, 8],
  sixth: [0, 8, 9],
  seventh: [0, 9, 10, 11],

  // Chord note initiliazation
  chordSecond: function () {
    return this.second[0];
  },
  chordThird: function () {
    return this.third[0];
  },
  chordFourth: function () {
    return this.fourth[0];
  },
  chordFifth: function () {
    return this.fifth[0];
  },
  chordSixth: function () {
    return this.sixth[0];
  },
  chordSeventh: function () {
    return this.seventh[0];
  },

  // Chord function
  dynamicQuality: function (chordQuality) {
    if ((chordQuality = "Major")) {
      this.chordThird = this.third[2];
      this.chordFifth = this.fifth[2];
    } else if ((chordQuality = "Minor")) {
      this.chordThird = this.third[1];
      this.chordFifth = this.fifth[2];
    } else if ((chordQuality = "Augmented")) {
      this.chordThird = this.third[2];
      this.chordFifth = this.fifth[3];
    } else if ((chordQuality = "Diminished")) {
      this.chordThird = this.third[1];
      this.chordFifth = this.fifth[1];
    } else if ((chordQuality = "Major Seventh")) {
      this.chordThird = this.third[2];
      this.chordFifth = this.fifth[2];
      this.chordSeventh = this.seventh[2];
    } else if ((chordQuality = "Minor Seventh")) {
      this.chordThird = this.third[1];
      this.chordFifth = this.fifth[2];
      this.chordSeventh = this.seventh[1];
    } else if ((chordQuality = "Major Seven Flat Five")) {
      this.chordThird = this.third[2];
      this.chordFifth = this.fifth[1];
      this.chordSeventh = this.seventh[2];
    }
  },
  chordCreation: function (midiInput) {
    let root = midiInput.note.number;
    let chord = [
      root,
      root + this.chordSecond,
      root + this.chordThird,
      root + this.chordFourth,
      root + this.chordFifth,
      root + this.chordSixth,
      root + this.chordSeventh,
    ];
    return chord;
  },

  // Transposition function
  transpose: function (midiInput, transposition) {
    let pitch = (midiInput.note += transposition);
    let transposedNote = new Note(pitch).number;
    let transposedChord = this.chordCreation(transposedNote);
    return transposedChord;
  },
};

export default MidiEffects;
