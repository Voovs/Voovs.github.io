import App from './app.js';
import ErrorPage from './views/error-page.js';
import Home from './views/home.js';
import ColorSchemer from './views/color-schemer.js';
import WordCounter from './views/word-counter.js';

const routes = [
  { path: '/', component: Home },
  { path: '/color-schemer', component: ColorSchemer },
  { path: '/word-counter', component: WordCounter },
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
