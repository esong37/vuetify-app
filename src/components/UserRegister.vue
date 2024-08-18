<template>
    <v-container class="d-flex justify-center align-center fill-height">
      <v-card class="pa-5" max-width="400">
        <v-card-title>Register</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleRegister">
            <v-text-field
              v-model="uid"
              label="User ID"
              required
            ></v-text-field>
            <v-text-field
              v-model="name"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="secret"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-btn type="submit" color="primary" block>Register</v-btn>
          </v-form>
          <v-alert v-if="error" type="error" class="mt-3">{{ error }}</v-alert>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        uid: '',
        name: '',
        secret: '',
        error: null,
      };
    },
    methods: {
      async handleRegister() {
        try {
          const response = await axios.post('http://localhost:3000/auth/register', {
            uid: this.uid,
            name: this.name,
            secret: this.secret,
          });
  
          if (response.data.status === 0) {

            this.$router.push('/login');
          } else {
            this.error = response.data.msg;
          }
        } catch (err) {
          this.error = 'An error occurred while trying to register.';
        }
      },
    },
  };
  </script>
  