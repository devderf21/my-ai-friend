<template>
  <div class="form-container">
    <h1>Signup Page</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
        />
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="submit">Signup</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignupComponent',
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
    };
  },
  methods: {
    handleSubmit() {
      this.errorMessage = '';
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }
      if (!this.username || !this.password) {
        this.errorMessage = 'All fields are required.';
        return;
      }

      if (localStorage.getItem(this.username)) {
        this.errorMessage = 'Username already exists.';
        return;
      }

      const secret = 'mysecretstring';
      const hashedPassword = btoa(this.password + secret);

      localStorage.setItem(this.username, hashedPassword);
      alert('Signup successful! Redirecting to login.');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}
h1 {
  margin-bottom: 20px;
}
</style>
