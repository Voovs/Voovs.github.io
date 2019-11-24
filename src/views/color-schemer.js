export default {
  name: 'ColorSchemer',
  template: `
  <div class="color-schemer">
    <div
      :id="'stripe-' + i"
      class="color-stripe vertical-column"
      v-for="i in 6"
      v-bind:style="{
        'background-color': colors[i],
        'transform': 'translateX(calc((100vw / 6) *' + (i - 1) + '))',
        'z-index': (100 - i)}">
      <div class="control-row">
        <span
          @click="move_color_stripe(false, i, true)">&lt;</span>
        <input v-model="colors[i]" type="text">
        <span
          @click="move_color_stripe(true, i, true)">&gt;</span>
      </div>
    </div>
    <!-- <div class="add-color vertical-column">
      <span>+</span>
    </div> -->

  </div>
  `,
  data () {
    return {
      colors: {
        1: '#000000',
        2: '#f18b47',
        3: '#7289DA',
        4: '#95D2F7',
        5: '#F84A96',
        6: '#c5cfd5',
      },
      stripe_order: [1, 2, 3, 4, 5, 6],
    }
  },
  methods: {
    move_color_stripe (is_right, color_num, is_first_call) {
      var stripe_order_index = 0
      for (let i of this.stripe_order) {
        if (i !== color_num) {
          stripe_order_index += 1
          continue
        } else break
      }

      if (is_right === true && stripe_order_index != 5) {
        let transform_str = document.querySelector('#stripe-' + color_num).style.transform
        let transform_num = parseFloat(transform_str.slice(11, transform_str.length - 3), 10) / 100
        let new_transform_num = (transform_num * window.innerWidth + window.innerWidth / 6) / window.innerWidth * 100

        document.querySelector('#stripe-' + color_num).style.transform = `translateX(${new_transform_num}vw)`

        // Moves the other tile for a position swap
        if (is_first_call === true) {
          this.move_color_stripe(false, this.stripe_order[stripe_order_index + 1], false)

          this.stripe_order[stripe_order_index] = this.stripe_order[stripe_order_index + 1]
          this.stripe_order[stripe_order_index + 1] = color_num

          this.hide_end_arrows()
        }

      } else if (is_right === false && stripe_order_index != 0) {
        let transform_str = document.querySelector('#stripe-' + color_num).style.transform
        let transform_num = parseFloat(transform_str.slice(11, transform_str.length - 3), 10) / 100
        let new_transform_num = (transform_num * window.innerWidth - window.innerWidth / 6) / window.innerWidth * 100

        document.querySelector('#stripe-' + color_num).style.transform = `translateX(${new_transform_num}vw)`

        // Moves the other tile for a position swap
        if (is_first_call === true) {
          this.move_color_stripe(true, this.stripe_order[stripe_order_index - 1], false)

          this.stripe_order[stripe_order_index] = this.stripe_order[stripe_order_index - 1]
          this.stripe_order[stripe_order_index - 1] = color_num

          this.hide_end_arrows()
        }

      } else if (stripe_order_index === 5 || stripe_order_index === 0) {
        return
      } else {
        console.error(`Movement broke @color-schemer.js with 'is_right' evaluated to | ${is_right} | and 'stripe_order_index' evaluated to | ${stripe_order_index}`)
      }
    },
    hide_end_arrows () {
      for (let i of this.stripe_order) {
        document.querySelector(`#stripe-${i}`).children[0].children[0].style.visibility = 'visible'
        document.querySelector(`#stripe-${i}`).children[0].children[2].style.visibility = 'visible'
      }

      document.querySelector(`#stripe-${this.stripe_order[0]}`).children[0].children[0].style.visibility = 'hidden'
      document.querySelector(`#stripe-${this.stripe_order[5]}`).children[0].children[2].style.visibility = 'hidden'
    },
  },
  mounted: function () {
    this.hide_end_arrows() // Hides left and right most arrows

    // translateX(calc(20vw)) becomes translateX(20vw)
    // Vue keeps the calc() even after compile
    for (let i of Array(6).keys()) {
      i = i + 1
      let transform_str = document.querySelector('#stripe-' + i).style.transform
      let transform_distance = document.querySelector('#stripe-' + i).style.transform.slice(16, transform_str.length - 2)
      document.querySelector('#stripe-' + i).style.transform = `translateX(${transform_distance})`
    }
  }
};
