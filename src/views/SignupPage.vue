<template>
  <div class="about">
    <h1>This is Signup page</h1>
    <form @submit.prevent="signup">
      <input v-model="username" type="text" placeholder="Username" /> <br /> <br />
      <input v-model="email" type="email" placeholder="Email" /> <br /> <br />
      <input v-model="password" type="password" placeholder="Password" /> <br /> <br />
      <button type="submit">Signup</button>
    </form>
    <p>Already have an account? <router-link to="/">Login</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'SignupPage',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async signup() {
      try {
        const response = await fetch('http://localhost:5000/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.username,
            email: this.email,
            password: this.password
          })
        });

        if (!response.ok) {
          throw new Error('Signup failed');
        }

        const data = await response.json();
        console.log(data);

        // Redirect to login page after successful signup
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
