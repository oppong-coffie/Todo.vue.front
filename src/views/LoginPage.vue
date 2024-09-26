<template>
  <div class="about">
    <h1>This is login page</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required /> <br /> <br />
      <input v-model="password" type="password" placeholder="Password" required /> <br /> <br />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
    <p>Don't have an account? <router-link to="/signup">Signup</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    };
  },
  methods: {
    async login() {
      this.loading = true;

      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (response.ok) {
          this.$router.push('/home');
        } else {
          alert('Invalid email or password');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred, please try again later');
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
