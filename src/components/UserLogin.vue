<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="pa-5" max-width="400">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field v-model="uid" label="User ID" required></v-text-field>
          <v-text-field v-model="secret" label="Password" type="password" required></v-text-field>
          <v-btn type="submit" color="primary" block>Login</v-btn>
        </v-form>
        <v-alert v-if="error" type="error" class="mt-3">{{ error }}</v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
//import axios from 'axios';
import axios from '../axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      uid: '',
      secret: '',
      error: null,
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          uid: this.uid,
          secret: this.secret,
        });

        if (response.data.status === 0) {
          // login successfully, store jwt to localStorage
          this.login(response.data.token);
          // redirect to home page
          this.$router.push({ path: '/' });
        } else {
          this.error = response.data.msg;
        }
      } catch (err) {
        this.error = 'An error occurred while trying to log in.';
      }
    },
  },
};
</script>