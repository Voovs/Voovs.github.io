export default {
  name: 'ErrorPage',
  template: `
  <div class="error-page">
    <div class="container">
      <p class="error-message">
        Oh no. It's a disaster! The page you tried to go on doesn't exist!!!
      </p>
    </div>
    <div class="container">
      <router-link to="/" class="home-button">Go back to home</router-link>
    </div>
  </div>
  `,
  data () {
    return {

    }
  }
}
