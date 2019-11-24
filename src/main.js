import App from './app.js';
import ErrorPage from './views/error-page.js';
import Home from './views/home.js';
import ColorSchemer from './views/color-schemer.js';

<<<<<<< Updated upstream
function rotate_theme () {
  console.log("fired")
  let prev_theme_index = curr_theme_index
  if (curr_theme_index === 2) curr_theme_index = 0
  else curr_theme_index += 1

  document.querySelector("#body").classList.replace(themes[prev_theme_index], themes[curr_theme_index])
}
=======
const routes = [
  { path: '/', component: Home },
  { path: '/color-schemer', component: ColorSchemer },
  { path: '*', component: ErrorPage },
];


const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: routes
});


const app = new Vue ({
  router
}).$mount(`#app`);
// new Vue ({
//   render: h => h(App),
// }).$mount(`#app`);
>>>>>>> Stashed changes
