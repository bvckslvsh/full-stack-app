<template>
  <div>
    <h1>User profile (no styles temporary cause of low budget)</h1>
    <div v-if="user">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Phone number:</strong> {{ user.phone_number }}</p>
      <p><strong>Address:</strong> {{ user.address }}</p>
      <p><strong>Additional info:</strong> {{ user.additional_about }}</p>

      <h2>Edit profile</h2>
      <form @submit.prevent="updateProfile">
        <label>
          Name:
          <input type="text" v-model="name" required />
        </label>
        <label>
          Phone number:
          <input type="text" v-model="phoneNumber" />
        </label>
        <label>
          Address:
          <input type="text" v-model="address" />
        </label>
        <label>
          Additional info:
          <textarea v-model="additionalAbout"></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>

      <button @click="logout">Log out</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
});

export default {
  name: 'UserProfile',
  data() {
    return {
      user: null,
      name: '',
      phoneNumber: '',
      address: '',
      additionalAbout: '',
    };
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
    fetchUserProfile() {
      api
        .get('/user')
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateProfile() {
      const userData = {
        name: this.name,
        phone_number: this.phoneNumber,
        address: this.address,
        additional_about: this.additionalAbout,
      };

      api
        .post('/update-profile', userData)
        .then((response) => {
          console.log(response.data.message);
          this.fetchUserProfile();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    logout() {
      api
        .post('/logout')
        .then((response) => {
          console.log(response.data.message);
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
          this.$router.push('/signin');
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
