export default {
  name: `WordCounter`,
  template:`
    <div class="word-counter">
      <router-link to="/" class="page-title">Word Counter</router-link>
      <textarea
        class="input-area"
        name="input-area"
        v-model="inputText"
        placeholder="Your writing here..."></textarea>
      <textarea
        class="search-area"
        name="search-area"
        ref="searchArea"
        v-model="searchWord"
        rows="1" cols="15"
        @keyup.delete="addToSearchList('delete')"
        @keyup.enter="addToSearchList('enter')"
        placeholder="Search word..."></textarea>
      <div class="user-settings">
        <span>
          <input type="checkbox" name="search-type" id="search-type" checked>
          <label for="search-type">Auto search</label>
        </span>
        <span>
          <input type="checkbox" name="punc" id="punc">
          <label for="punc">Punctuation</label>
        </span>
        <hr class="line">
      </div> <!-- Auto search, punctuation, percent accuracy -->
      <div class="search-list">
        <div class="word-card" v-for="wordObj in currSearchArray">
          <span class="word-column">
            <span :title="titleCase(wordObj.word)">{{ titleCase(wordObj.word) }}</span>
          </span>
          <span class="stats-column">
            <div class="labels">
              <span>Rank: </span>
              <span>Appeared: </span>
              <span>Percent of text: </span>
            </div>
            <div class="numbers">
              <span class="number">{{ sortedOccurObj[wordObj.occur] }}</span>
              <span class="number">{{ wordObj.occur }}</span>
              <span class="number">{{ wordObj.percent }}%</span>
            </div>
            <!-- <span>Rank: <span class="number">{{ sortedOccurObj[wordObj.occur] }}</span></span>
            <span>Appeared: <span class="number">{{ wordObj.occur }}</span></span>
            <span>Percent of text: <span class="number">{{ wordObj.percent }}%</span></span> -->
          </span>
          <a class="link" :href="'https://www.Thesaurus.com/browse/' + wordObj.word" target="_blank">Thesaurus ></a>
        </div>
        <div class="word-card past-search" v-for="wordObj in pastSearchArray">
          <span class="word-column">
            <span :title="titleCase(wordObj.word)">{{ titleCase(wordObj.word) }}</span>
          </span>
          <span class="stats-column">
            <div class="labels">
              <span>Rank: </span>
              <span>Appeared: </span>
              <span>Percent of text: </span>
            </div>
            <div class="numbers">
              <span class="number">{{ sortedOccurObj[wordObj.occur] }}</span>
              <span class="number">{{ wordObj.occur }}</span>
              <span class="number">{{ wordObj.percent }}%</span>
            </div>
          </span>
          <a class="link" :href="'https://www.Thesaurus.com/browse/' + wordObj.word" target="_blank">Thesaurus ></a>
        </div>
      </div>
      <div class="top-words-title">Top Words:</div>
      <div class="top-list-setting">
        <label for="toOccur">Number of appearances</label>
        <input v-model="userSetting.topWordsPercent" type="checkbox" name="toOccur" id="toOccur">
        <hr class="line">
      </div>
      <div class="top-words">
        <div class="top-list">
          <div v-for="(wordArray, index) in sortedWordsArray">
            <div class="pairs" >
              <span class="percent" v-if="userSetting.topWordsPercent === true">{{ wordArray[2] }}</span>
              <span class="percent" v-else>{{ wordArray[1] }}%</span>
              <span class="words">{{ titleCase(wordArray[0]) }}</span>
              <!-- wordArray[0].slice(0,1).toUpperCase() + wordArray[0].slice(1, wordArray[0].length) -->
            </div>
            <hr class="line" v-if="index < sortedWordsArray.length - 1"> <!-- Not shown at very bottom -->
          </div>
        </div>
      </div>
      <div class="total-words">Total words: {{ allWordsArray.length }}</div>
      <hr class="media-line">
    </div>
  `,
  data () { //  Anything in the document
    return {
      inputText: "It is my opinion that balance fosters success when considering the translation of works between languages. However, if I had to choose between the importance of preserving either precision or artistry in a text, I would lean towards precision. \n To create a poem, story or any other written work, an author must pour themselves into it. Words and phrases are picked and arranged meticulously in order to perfectly manufacture feelings and images in a reader’s mind. In the case of\nJabberwocky, Lewis Carroll even combined and invented new words to convey certain actions and emotions to his readers. An example of this is the word “chortled,” first coined by Carroll in his poem and is still in use today. This term conveys a sort of laugh in between a snort and a chuckle, and Carroll’s attention to detail when creating this new word allowed him to paint a more vivid picture in his reader’s mind. These new terms were able to describe the characters in such a way that\nhadn’t been done before. This kind of precision in writing needs to carry through into its translation.\nI also believe that in a sense, precision and artistry are the same thing. To be precise in one's use of artistry is what writers do. They pick the perfect words and phrases to convey an emotion or an image to the reader. A translator’s job is very similar-to be precise in their translation in order to convey the mood and images that the original author intended to be placed in the reader’s mind. There is always going to be a loss of both precision and artistry in any translation between languages. No work can be perfectly translated, and in a sense can never be appreciated in the same way once it has undergone such a loss of meaning, or even completely credited to the original author. An author's intentions are lost when another writer takes too much artistic license with their piece, and language differences can result in a lack of a precise translation. However, for a translation to be successful, the key is balance because either way, a key part of someone's text is going to be lost in translation. A translator's job is to minimize this damage and to try to stay true to what the author was trying to say.",
      allWordsArray: [],     // An array with words seperated on spaces
      wordOccur: {}, // Each property is a word with number for occurrence
      userSetting: {decim: 3, topWordsPercent: false},
      searchWord: '',
      prevSearchWord: '',
      currSearchArray: [],   // {word: x, occur: x, percent: x}
      searchList: [],       // ["Some", "Here", "Voovs"]
      darkMode: true,      // Refers to page style mode
    }
  },
  methods: {
    // Updates this.allWordsArray in lowercase
    identifyAllWords () {
      var text = this.inputText + ' ', s0 = 0, s1 = 1, currWordArray
      this.allWordsArray = []
      while (s1 <= text.length) {
        currWordArray = text.slice(s0, s1).match(/[\w-'’]+[\s.,!?<>())\[\]%":;]/g)
        if (s0 + 1 === s1 && !text.slice(s0, s1).match(/[\w-]/)) {     // Removes irregular starting characters
          s0++; s1++
        }
        else if (currWordArray === null) {      // Not a word, then continue loop
          s1++
        }
        else if (currWordArray.length === 1) {    // If it's a word
          var currWord = (currWordArray[0].slice(0, currWordArray[0].length - 1)).toLowerCase()
          this.allWordsArray.push(currWord)   // Adds lowercase word to array
          s0 = s1; s1++
        }
        else {
          console.warn("defineWordCounts hit else")
        }
      }
    },
    // Updates this.wordOccur
    findWordOccur () {
      var wordArray = this.allWordsArray
      this.wordOccur = {}
      for (let word of this.allWordsArray) {    // Sets occurrence values
        if (this.wordOccur[word]) {
          this.wordOccur[word] += 1
        }
        else {
          this.wordOccur[word] = 1
        }
      }
    },
    // Updates currSearchArray, based on search
    updateCurrSearch (input) {
        if (input.match(/[\/\(\)\[\]\{\}\*\^\$\!\@\?\.\|\+\\]/gi)) {
          this.currSearchArray = []
          return
        }
        var matchedWordsObj = [],
            input = input.toLowerCase(),
            inputRegex = new RegExp(input, "gi"),
            fullInputMatch = new RegExp('^' + input + '$', "gi"),   // `/^${input}$/gi`
            prevSearchWord = this.searchList[0];
        if (input === '') {                    // Search is blank, no temporary words displayed
          this.currSearchArray = []
        }
        else if (input === prevSearchWord) {  // Fully match to previously logged word, no temporary words displayed
          this.currSearchArray = []
        }
        else {
          for (let currWord in this.wordOccur) {
            if (currWord.match(fullInputMatch)) {   // Full match to regex, it's the only one returned
              matchedWordsObj = []
              this.prevSearchWord = currWord
              matchedWordsObj.push({word: currWord, percent: this.wordPercent[currWord], occur: this.wordOccur[currWord]})
              break
            }
            else if (currWord === prevSearchWord) {     // Skips previously logged word
              continue
            }
            else if (currWord.match(inputRegex)) {      // Will detect partial matches
              matchedWordsObj.push({word: currWord, percent: this.wordPercent[currWord], occur: this.wordOccur[currWord]})
            }
          }
          this.currSearchArray = matchedWordsObj
        }
    },
    // Searched word obj at the front of searchList array
    addToSearchList (key) {
      var prevWord = this.prevSearchWord,
          prevLoggedWord = true,
          pushWordObj = (prevWord) => {
            this.searchList.unshift(prevWord);
            this.prevSearchWord = false
          };
      if (key === 'enter') this.searchWord = ''       // Clears search area on enter key
      if (prevWord === '') return;
      else if (this.searchList.length === 0) {  // Prevents the error of reading searchList[0].word, when it's empty
        pushWordObj(prevWord)
      }
      else if (prevWord && this.searchList[0].word !== prevWord) {
        pushWordObj(prevWord)
      }
    },
    titleCase: word => word.slice(0,1).toUpperCase() + word.slice(1, word.length),
  },
  computed: {
    allCapsArray () {       // Array with title cased words
      var allCapsArray = []
      this.allWordsArray.forEach( word => {
        allCapsArray.push(this.titleCase(word))
      })
      return allCapsArray   // All words in array start with a capital letter
    },
    wordPercent () {      // Object with word property and percent value
      var wordPercent = {},
          decim = 10 * (this.userSetting.decim - 2),
          totalWords = this.allWordsArray.length;
      for (let word in this.wordOccur) {
        let currOccur = this.wordOccur[word]
        wordPercent[word] = Math.round(currOccur / totalWords * 100 * decim) / decim // Changes accuracy
      }
      return wordPercent
    },
    sortedWordsArray () { // Nested arrays in decending percent ex: [["some", 2.4, 15], ["here", 2.1, 14]]
      var sortedWordsArray = [],
          wordPercent = this.wordPercent;
      for (let word in wordPercent) {
        sortedWordsArray.push([word, wordPercent[word], this.wordOccur[word]])    // Ex: ["Some", 2.4, 15]
      }
      sortedWordsArray.sort((a, b) => b[1] - a[1])    // Sorts based on percent value. Higher percent towards front
      return sortedWordsArray
    },
    sortedOccurObj () {   // Array with unique ocurr nums from greatest to least
      var arrayOfOccur = [], sortedOccurArray = [], sortedOccurObj = {};
      for (let word in this.wordOccur) {
        arrayOfOccur.push(this.wordOccur[word])    // Logs all occur numbers
      }
      sortedOccurArray = [...new Set(arrayOfOccur)]
      sortedOccurArray.sort((a, b) => b - a)
      for (let index in sortedOccurArray) {
        sortedOccurObj[sortedOccurArray[index]] = parseInt(index, 10) + 1  // Flips array: {44: 1, 21: 2}...
      }
      return sortedOccurObj
    },
    pastSearchArray () {  // Array with nested word objects in chronological order
      var searchArray = []
      for (let index in this.searchList) {
        let currWord = this.searchList[index]
        if (this.wordOccur[currWord]) {
          searchArray.push({
            word: currWord,
            occur: this.wordOccur[currWord],
            percent: this.wordPercent[currWord]
          })
        }
        else {
          this.searchList.splice(index, 1)
        }
      }
      return searchArray
    },
  },
  watch: {
    inputText: function () {
      this.identifyAllWords()
      this.findWordOccur()
      this.updateCurrSearch(this.searchWord)
      // this.pastSearchArray
    },
    searchWord: function () {
      this.searchWord = this.titleCase(this.searchWord)   // Title-case Bug: backspace on first letter
      this.updateCurrSearch(this.searchWord)
    },
  },
  mounted () {
    this.identifyAllWords()
    this.findWordOccur()
  },
};





// DOM by class
// .main-div
// .left-div
//   .left-upper
//     .input-area
//   .left-lower
//     .left-lower-left
//     .left-lower-right
// .right-div
//   .search-area-div
//     .search-area
//   .search-list
//     .search-list-left
//       .word-column
//     .search-list-right
//       .stats-column
