const MusicTools = {
  standardPitch: 440,
  middleC: "C4",
  /**
   * Converts MIDI Pitch number to corresponding frequency in Hz
   * @param {number} midiPitch - MIDI Note Number
   * @returns {number} Frequency in Hertz
   */
  midiPitchToFrequency: function (midiPitch) {
    return this.standardPitch * Math.pow(2, (midiPitch - 69) / 12);
  },

  /**
   * Converts a frequency in Hz to the corresponding MIDI pitch number.
   * @param {number} frequency - Frequency in Hertz
   * @returns {number} MIDI Note Number
   */
  frequencyToMidiPitch: function (frequency) {
    return 69 + 12 * Math.log2(frequency / this.standardPitch);
  },

  /**
   * Converts Linear Amplitude to dBFS
   * @param {number} linAmp - Linear Amplitude Value
   * @returns {number} dBFS Value
   */
  linAmpTodB: function (linAmp) {
    return 20 * Math.log10(linAmp);
  },

  /**
   * Converts dBFS to Linear Amplitude
   * @param {number} dBFS - dBFS Value
   * @returns {number} Linear Amplitude Value
   */
  dBToLinAmp: function (dBFS, int16) {
    let linAmp = Math.pow(10, dBFS / 20);
    return linAmp;
  },
};

export default MusicTools;
