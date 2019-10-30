
Vue.component('home', {
  template: `
  <div class="home">
    <div class="header">
      <div class="left">
        <p>The sky's awake</p>
        <p>So I'm <span>awake</span></p>
      </div>
      <img
        src="assets/images/head_shot_2019_final_small.jpg"
        alt="Voovs's profile picture"
        class="header-image">
    </div>

    <h1 class="project-title">Projects</h1>
    <div class="projects">
      <div class="project-card" v-for="project in projects">
        <div class="text-parent">
          <h1 class="project-name">{{ project.name }}</h1>
          <div class="description">{{ project.description }}</div>
        </div>
        <div class="edge-wave"></div>
      </div>
    </div>
    <!-- <div class="project-library">
      <span>Discover more</span>
      <div class="right-arrow"></div>
    </div> -->

    <div class="quotes">
    </div>
  </div>
  `,
  data () {
    return {
      projects: [
        { name: "Word Counter",
        description: "View words useage precentiles in graphs",
        image_url: "/images/mojave",
        },
        { name: "Color schemer",
        description: "Choose a color scheme for your site with helpful tips",
        image_url: "/images/h_sierra",
        },
        { name: "Sierra",
        description: "Big IMac classic",
        image_url: "/images/sierra",
        },
        { name: "Fashion organizer",
        description: "Create organized lists for your current and prospective outfits. Integrates colour schemer",
        image_url: "/images/mojave"
        },
        { name: "Yosemite",
        description: "Baseline OS for modern OSX operations",
        image_url: "/images/mojave",
        }
      ],
    }
  },
  computed: {

  }
});



var app = new Vue ({
  el: "#app",
  data: {
      color: "yellow",
      type: "wool",
  },
});
