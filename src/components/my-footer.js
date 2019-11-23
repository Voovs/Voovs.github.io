Vue.component('my-footer', {
  template: `
  <div class="my-footer">
    <div class="left-column column">
      <div class="crop-container">
        <img src="src/assets/images/head_shot_2019_profile.jpg" alt="Voovs profile picture">
      </div>
    </div>
    <div class="mid-column column">
      <div class="column-title">macOS updates</div>
      <ul>
        <a v-for="content in footer_content[0]"> {{ content }} </a>
      </ul>
    </div>
    <div class="right-column column">
      <div class="column-title">macOS updates</div>
      <ul>
        <a v-for="content in footer_content[1]"> {{ content }} </a>
      </ul>
    </div>
  </div>
  `,
  data () {
    return {
      footer_content: [
        [
          "Catalina",
          "Mojave",
          "High Sierra"
        ],
        [
          "Sierra",
          "El Capitan",
          "Yosemite",
        ]
      ]
    }
  },
  methods: {
    add_shimmer (column, row, is_selected) {
      if ((column === 2 && row <= this.column_2_content.length || column === 3 && row <= this.column_3_content.length) && (row > 0)) {
        if (is_selected === true) {
          let curr_html = document.querySelector('.my-footer').children[column - 1].children[1].children[row - 1].innerText
          let new_html = `<strong class="shimmer shimmer-right">&gt;&gt;</strong> ${curr_html} <strong class="shimmer shimmer-left">&lt;&lt;</strong>`
          document.querySelector('my-footer').children[column - 1].children[row - 1].innerHTML = new_html
        } else if (is_selected === false) {
          let curr_html = String(document.querySelector('.my-footer').children[column - 1].children[1].children[row - 1].innerHTML)
          let new_html = curr_html.slice(55, curr_html.length - 55)
          document.querySelector('my-footer').children[column - 1].children[row - 1].innerHTML = new_html
        } else {
          console.warn(`Column number is invalid @my-footer.js (methods) | ${column}`)
        }
      }
    }
  }
});



//=============================================================
// Javascript for home page
//=============================================================



// var
//
// document.addEventListener('DOMContentLoaded', () => {
//
// })
//
// function add_shimmer (column, row, is_selected) {
//   if ((column === 2 || column === 3) && (row > 0 && row <= document.querySelector('.my-footer').children[column].children[1].childElementCount)) {
//
//     if (is_selected === true) {
//
//     } else if (is_selected === false) {
//
//     }
//     document.querySelector('.my-footer').children[1].children[1].children
//   } else {
//     console.warn(`Column number is invalid @my-footer.js (js) | ${column}`)
//   }
// }
