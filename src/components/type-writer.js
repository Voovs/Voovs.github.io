// Properties to pass on call
// text {string} -Text to be animated
// textColor {string/Number} -Colour of text and cursor
// msPerLetter {number} -Milliseconds between characters placed
// pauseTime  {number} -How many iterations will the text pause for upon completeing the string
// stopRetype {Boolean} -Place as attribute to not retype text
// ex: <textAnimation pbi="200" msbi="30" text="Start my string on this line{1}Now there's a single indent" />
// Numbers in sets will be converted to indents {3}

export default {
  name: 'TypeWriter',
  template: `
  <div class="type-writer">
    <div :id="id" :ref="id" class="typeWriter">
      <div v-for="line in numOfIndents" :style="{color: textColor, overflow: 'visible'}">
        <span>&nbsp;</span><span class="cursor" :style="{border: '2px solid ' + textColor, visibility: 'hidden'}"></span><span style="visibility: hidden">m</span>
      </div>
     </div>
  </div>
  `,
  data () {
    return {
      id: null,
      textLength: 0,
      numOfIndents: 1,
      regLine: /\{\d+\}/g,
      currLine: 0,
      slicePlace: [0,1],
      runAnim: 0,
    }
  },
  methods: {
      animation () {
        var s0 = this.slicePlace[0], s1 = this.slicePlace[1], id = this.id, currLine = this.currLine, text = this.text
        if (s0 >= this.textLength) {                             // Once all text is typed
          clearInterval(this.runAnim)                                 // Stops animation
          this.textCursorAnim(true)
          setTimeout(this.resetAnim.bind(this), this.pauseTime)       // Resets after delay, if this.stopRetype == false
        }
        else if (text.slice(s0, s1 + 2).match(this.regLine)) {   // If new line is detected
          this.newLineAnim(s0, s1)
        }
        else {                                                   // Normal circumstances
          this.$refs[id].children[currLine].children[0].textContent += text.slice(s0, s1)
          this.slicePlace = [s0 + 1, s1 + 1]
        }
      },
      // Animates the cursor flash. If atEnd == true { will make cursor flash
      textCursorAnim (atEnd) {
        var currLine = this.currLine, id = this.id;
        !currLine || (this.$refs[id].children[currLine - 1].children[1].style.visibility = "hidden");  // Previous line's cursor invisible
        this.$refs[id].children[currLine].children[1].style.visibility = "visible";                    // Current line's cursor visible
        !atEnd || (this.$refs[id].children[currLine].children[1].classList.add("blinkingCursor"));     // Adds blink, if animation has ended
      },
      /** Skips line and indents new line
       * @param  {Number} s1s0       Start and end, respectively, of text.slice(s0, s1). s1 not inclusive
       * @param  {Number} pxPerMag   Pixels left padding, per indent
       */
      newLineAnim (s0, s1) {
        var magOfIndent = this.text.slice(s0 + 1, s1 + 1)                   // Finds magnitude of indent (Number in {set})
        this.currLine = this.currLine + 1; this.slicePlace = [s0 + 3, s1 + 3];
        this.$refs[this.id].children[this.currLine].children[0].style.paddingLeft = (magOfIndent * this.pxPerIndent) + 'px'
        this.textCursorAnim()
        this.animation()
      },
      // Resets currentLine, slicePlace array, and clears child divs
      resetAnim () {
        var lastLine = this.currLine; this.currLine = 0; this.slicePlace = [0, 1];  // Resets to inital values
        if (this.$refs[this.id] && !(this.stopRetype)) {                                               // If reset is allowed
          for (var line = 0; line < this.numOfIndents; line++) {
            this.$refs[this.id].children[line].children[0].innerHTML = "\&nbsp"                        // Fill children with spaces
          }
          this.$refs[this.id].children[this.numOfIndents - 1].children[1].classList.remove("blinkingCursor") // Remove blinking on last line
          this.$refs[this.id].children[lastLine].children[1].style.visibility = "hidden"                     // Hides last cursor
          this.textCursorAnim()                                                                              // Places cursor on first line
          this.runAnim = setInterval(this.animation.bind(this), this.msPerLetter)                     // Runs animation again
        }
      },
  },
  props: {
    text: {
      String,
      default: "Error{1}Error{2}Error"
    },
    msPerLetter: { // Miliseconds between letters
      Number,
      default: 100
    },
    pauseTime: {   // Pause between iterations- how may iterations is the pause for
      Number,
      default: 200
    },
    pxPerIndent: {
      Number,
      default: 20
    },
    stopRetype: Boolean,
  },
  created () {
    this.id = "tw" + this._uid                            // Defines unique Id
    this.numOfIndents = this.text.match(/\{\d+\}/g).length + 1    // Finds number of required lines
    this.textLength = this.text.length
  },
  updated () {
    this.$nextTick(function() {
      console.error("Updated actually ran")
      this.id = "tw" + this._uid                            // Defines unique Id
      this.numOfIndents = this.text.match(/\{\d+\}/g).length + 1    // Finds number of required lines
      this.textLength = this.text.length
      this.resetAnim()
    })
  },
  mounted () {
      this.$refs[this.id].children[0].children[1].style.visibility = "visible"
      this.runAnim = setInterval(this.animation.bind(this), this.msPerLetter)
        },
  beforeDestroy () {
    clearInterval(this.runAnim)
    this.currLine = 0
    this.slicePlace = [0, 1]
  },
};
