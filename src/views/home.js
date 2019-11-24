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
    </div>
    <!-- <div class="project-library">
      <span>Discover more</span>
      <div class="right-arrow"></div>
    </div> -->

    <div class="quotes">
    </div>
    <MyFooter></MyFooter>
  </div>
  `,
  data () {
    return {
      projects_top: [
        { name: "Word Counter",
        description: "View words useage precentiles in graphs",
        image_url: "/images/mojave",
        path: "/"
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
    }
  },
  components: {
    MyFooter
  }
};
