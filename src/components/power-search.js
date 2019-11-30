export default {
  name: 'powerSearch',
  template: `
  <div class="power-search">
    <div class="search-bar-parent">
      <span class="search-bar"><input type="text" v-model="user_search"></span>
    </div>
    <div class="results-parent">
      <div class="card" v-for="word_data in words_data"  :key="word_data.word">
        <div class="icon">{{ word_data.type }}</div>
        <div class="text-content">
          <h1 class="word-title">{{ word_data.word }}</h1>
          <p class="word-description">{{ word_data.description }}</p>
        </div>
        <!-- <div class="rating">

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
      display_words_index = [], //Index of words to be displayed from words_data
      user_search: ""
    }
  },
  watch: {
    user_search: () => {

    }
  },
  methods: {
    search_all_words () {
      let user_search = this.user_search

      if (user_search === '' || input.match(/[\/\(\)\[\]\{\}\*\^\$\!\@\?\.\|\+\\]/gi)) {
        this.display_words_index = []
      } else {

      }
    }
  }
  // props: {
  //   word_data: Object
  // }
}
