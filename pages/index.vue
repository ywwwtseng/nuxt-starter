<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        nuxt-starter
      </h1>
      <h2 class="subtitle">
        My super-excellent Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
        <a class="button--grey" @click="userLogout">Logout</a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';

export default {
  middleware: 'authenticated',

  components: {
    Logo
  },

  async fetch({ $axios }) {
    await $axios.get('/api/options');
  },

  methods: {
    userLogout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
