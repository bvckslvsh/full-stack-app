<template>
  <div>
    <h1>Signin</h1>
    <form @submit.prevent="signin">
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
});

export default {
  name: 'Sign-in',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signin() {
      const userData = {
        email: this.email,
        password: this.password,
      };

      api
        .post('/signin', userData)
        .then((response) => {
          console.log(response.data);
          this.$router.push('/userprofile');
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    },
  },
};
</script>
