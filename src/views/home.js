import MyFooter from '../components/my-footer.js';

export default {
  name: `Home`,
  template: `
  <div class="home">
    <div class="header">
      <div class="left">
        <p>The sky's awake</p>
        <p>So I'm <span>awake</span></p>
      </div>
      <img
        src="./src/assets/images/head_shot_2019_final_small.jpg"
        alt="Voovs's profile picture"
        class="header-image">
    </div>
    <div class="header" style="visibility: hidden; position: static">
      <div class="left">
        <p>The sky's awake</p>
        <p>So I'm <span>awake</span></p>
      </div>
      <img
        src="./src/assets/images/head_shot_2019_final_small.jpg"
        alt="Voovs's profile picture"
        class="header-image">
    </div>
    <div class="non-header-content">
      <div class="project-title-wrapper">
        <h1 class="project-title">Projects</h1>
      </div>
      <div class="projects">
        <div class="card-row">
          <router-link class="project-card" v-for="project in projects_top" :to="project.path" :key="project.name">
            <div class="text-parent">
              <h1 class="project-name">{{ project.name }}</h1>
              <div class="description">{{ project.description }}</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="14.2" viewBox="151 0 1499 70">
              <!-- Bezier end point at 1800 100. +/- v inverts -->
              <path
              d="M 0 35
              q 150 70, 300 0
              t 300 0, t 300 0, t 300 0, t 300 0, t 300 0
              v 37
              H 0
              Z
              "
              fill-rule= "nonzero"
              />
            </svg>
            <!-- <div class="edge-wave"></div> -->
          </router-link>
        </div>
        <div class="card-row bottom-row">
          <router-link class="project-card" v-for="project in projects_bottom" :to="project.path" :key="project.name">
            <div class="text-parent">
              <h1 class="project-name">{{ project.name }}</h1>
              <div class="description">{{ project.description }}</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="15.3" viewBox="151 0 1499 70">
              <!-- Bezier end point at 1800 100. +/- v inverts -->
              <path
              d="M 0 35
              q 150 70, 300 0
              t 300 0, t 300 0, t 300 0, t 300 0, t 300 0
              v 36
              H 0
              Z
              "
              fill-rule= "nonzero"
              fill="#2C2F33" />
            </svg>
          </router-link>
        </div>
      </div>
      <div class="quotes">
        <span v-for="quote in quotes">{{ quote }}</span>
      </div>
      <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@jeremyperkins?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Jeremy Perkins">
        <span style="display:inline-block;padding:2px 3px">
          <svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32">
            <title>unsplash-logo</title>
            <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
          </svg>
        </span>
        <span style="display:inline-block;padding:2px 3px">Jeremy Perkins</span>
      </a>
    </div>
    <!-- <div class="project-library">
      <span>Discover more</span>
      <div class="right-arrow"></div>
    </div> -->

    <MyFooter></MyFooter>
  </div>
  `,
  data () {
    return {
      projects_top: [
        { name: "Word Counter",
        description: "View words useage precentiles in graphs",
        image_url: "/images/mojave",
        path: "/word-counter"
        },
        { name: "Sierra",
        description: "Big IMac classic",
        image_url: "/images/sierra",
        path: "/"
        },
        { name: "Generative art",
        description: "Planned page with examples of generative art",
        image_url: "/images/mojave",
        path: "/"
      },
      ],
      projects_bottom: [
        { name: "Color schemer",
        description: "A no-nonsense color scheme composition tool. Several presets pulled from fashion color schemes",
        image_url: "/images/h_sierra",
        path: "/color-schemer"
        },
        { name: "Fashion organizer",
        description: "Create organized lists for your current and prospective outfits. Integrates colour schemer",
        image_url: "/images/mojave",
        path: "/"
        },
      ],
      quotes: [
        "That sounds fake",
        "I am not what I am",
        "People care about design that cares about people",
        "Picard HappyCloud",
        "A failed audition is never a failed auditon",
        "SPEAK TO ME!!!",
        "The whole thing! You've got it",
        "Another quote",
        "Another quote",
        "Another quote",
      ],
      password_data: {
        password: 'brenna',
        user_char_pos: 0,
        curr_user_entry: '',
      }
    }
  },
  mounted () {
    window.addEventListener('keyup', k => {
      let user_char_pos = this.password_data.user_char_pos
      let password = this.password_data.password
      if (k.key === password[user_char_pos]) {
        this.password_data.curr_user_entry += k.key
        this.password_data.user_char_pos += 1
        console.log(this.password_data.curr_user_entry)
        if (this.password_data.curr_user_entry === this.password_data.password) {
          alert("brenna! 🎭")
        }
      } else if (k.key.match(/[a-z]/g)) {
        this.password_data.curr_user_entry = ''
        this.password_data.curr_char_pos = 0
      } else {
        console.error(`@home.js @mounted() broke with k.key | ${k.key}`)
        window.removeEventListener('keyup')
      }
    })
  },
  methods: {
    key_pressed () {
      alert("A key was hit")
    }
  },
  components: {
    MyFooter
  }
};

//=============================================================
// Javascript for home page
//=============================================================

function scroll_boxShadow () {
  if (document.querySelector('.project-title-wrapper')) {
    let theme_colors = ['#fff', '#2C2F33', '#95D2F7']

    let doc = document.documentElement
    var scrollY = (window.scrollY || doc.scrollTop) - (doc.clientTop || 0)
    var height = doc.clientHeight

    // Offset of box shadow based on scroll height, up to 60%
    var boxShadow_offset = Math.min(Math.floor((scrollY / height) * 100) / 2, 30)

    if (boxShadow_offset > 0) {
      let boxShadow_style = theme_colors[window.curr_theme_index] + ' 0 -' + boxShadow_offset + 'px 20px -3px'
      document.querySelector('.project-title-wrapper').style.boxShadow = boxShadow_style
    } else {
      document.querySelector('.project-title-wrapper').style.boxShadow = ''
    }
  }
}

window.addEventListener('scroll', scroll_boxShadow)
window.addEventListener('theme_change', scroll_boxShadow)
