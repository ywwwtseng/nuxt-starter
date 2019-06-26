<template>
  <div class="container">
    <a class="button--green" @click="authenticateUser">Login</a>
  </div>
</template>

<script>
export default {
  methods: {
    async authenticateUser() {
      const result = await this.$store.dispatch('auth/authenticateUser');
      if (result.isAuthenticated) this.$router.push('/');
    },
  },
};
</script>
