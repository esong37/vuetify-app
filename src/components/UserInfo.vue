<template>
    <v-container>
      <v-card class="pa-5">
        <v-card-title>User Information</v-card-title>
        <v-card-text>
          <p><strong>User ID:</strong> {{ userInfo.uid }}</p>
          <p><strong>Name:</strong> {{ userInfo.name }}</p>
          <p><strong>Subscription:</strong> {{ userInfo.subscribe }}</p>
          <p><strong>Subscription Expiry:</strong> {{ userInfo.subscribe_expired }}</p>
          <p><strong>Last Login:</strong> {{ userInfo.last_login }}</p>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from '../axios';
  
  export default {
    data() {
      return {
        userInfo: {},
      };
    },
    mounted() {
      this.fetchUserInfo();
    },
    methods: {
      async fetchUserInfo() {
        try {
          const response = await axios.get('http://localhost:3000/api/user/info');
          this.userInfo = response.data;
        } catch (error) {
          console.error('Error fetching user info:', error);
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            this.$router.push('/login'); 
          }
        }
      },
    },
  };
  </script>
  