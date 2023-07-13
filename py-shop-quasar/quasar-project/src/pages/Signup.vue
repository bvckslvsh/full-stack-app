<template>
  <div>
    <h1>Sign-up</h1>
    <form @submit.prevent="signup">
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Sign up</button>
    </form>
    <router-link to="/signin">To the sign in page</router-link>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Sign-up',
  data() {
    return {
      email: '',
      password: '',
      message: '',
    };
  },
  methods: {
    signup() {
      const userData = {
        email: this.email,
        password: this.password,
      };

      axios
        .post('http://localhost:3001/api/signup', userData)
        .then((response) => {
          this.message = response.data.message;
          this.$router.push('/signin');
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
  },
};
</script>
