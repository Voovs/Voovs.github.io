export default {
  name: 'powerSearch',
  template: `
  <div class="power-search">
    <div class="search-bar-parent">
      <span class="search-bar"><input type="text" v-model="user_search"></span>
    </div>
    <div class="results-parent">
      <div class="card" v-for="index in display_words_index" :key="words_data[index].trope">
        <div class="icon">{{ words_data[index].type }}</div>
        <div class="text-content">
          <h1 class="word-title">{{ words_data[index].trope }}</h1>
          <p class="word-description">{{ words_data[index].description }}</p>
        </div>
        <!-- <div class="tags">

        </div> -->
      </div>
    </div>
    <span style="font-size: 40px; width: 300px">Contemptuously</span>
  </div>
  `,
  data () {
    return {
      words_data: [
        { word: "Meticulous", type: "Formal", description: "Careful and deliberate" },
        { word: "Bravado", type: "Juciy", description: "Boldness intended to please" },
        { word: "Callback", type: "Theatrical", description: "Referencing a past event for its emotion" },
      ],
      display_words_index: [], //Index of words to be displayed from words_data
      user_search: ""
    }
  },
  computed: {
    // Map with key: index, value: string of word+type+description
    sum_string_map () {
      let sum_string_map = new Map()
      let index = 0

      for (let item of this.words_data) {
        let sum_string =`${item.word.toLowerCase()} ${item.type.toLowerCase()} ${item.description.toLowerCase()}`

        sum_string_map.set(index, sum_string)

        index += 1
      }

      return sum_string_map
    },
    search_is_blank () {
      let search_char_arr = this.user_search.split('')

      for (let char of search_char_arr) {
        if (char.match(/[a-z]/gi)) return false
      }
      return true
    },
    valid_search_arr () {
      let search_word_arr = this.user_search.toLowerCase().split(' ') // Lowercase array
      let search_char_arr = [] // 2D array of [word][char]

      for (let word of search_word_arr) {
        search_char_arr.push(word.split (''))
      }

      search_word_arr = []

      for (let char_arr of search_char_arr) {
        search_word_arr.push(
          char_arr
          .filter(char => char.match(/[a-z]/gi))
          .toString()
          .replace(/\,/gi, '')
        )
      }

      search_word_arr = search_word_arr.filter(word => word !== '')

      return search_word_arr // array of strings
    }
  },
  watch: {
    user_search: function () {
      this.search_all_words()
    }
  },
  methods: {
    search_all_words () {
      if (this.search_is_blank) {
        this.display_words_index = [...Array(this.words_data.length).keys()]

      } else {
        this.display_words_index = []

        console.log(this.valid_search_arr)

        for (let [key, value] of this.sum_string_map) {

          for (let search of this.valid_search_arr) {

            if (value.match(search))  this.display_words_index.push(key)
          }
        }
      }

      let remove_duplicates = new Set(this.display_words_index)

      this.display_words_index = Array.from(remove_duplicates)
    },
  },
  created () {
    this.words_data = window.theater_tropes
  },
  mounted () {
    this.display_words_index = [...Array(this.words_data.length).keys()]
    console.log(this.display_words_index)
    console.log(window.theater_tropes)
    console.log(this.words_data[0])
  },
}
  // props: {
  //   word_data: Object
  // }
