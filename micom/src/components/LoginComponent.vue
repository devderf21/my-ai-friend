<template>
  <div class="form-container">
    <h1>Login Page</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    handleSubmit() {
      this.errorMessage = '';
      if (!this.username || !this.password) {
        this.errorMessage = 'Both username and password are required.';
        return;
      }

      const storedPasswordHash = localStorage.getItem(this.username);
      if (!storedPasswordHash) {
        this.errorMessage = 'Invalid username or password.';
        return;
      }

      const secret = 'mysecretstring';
      const hashedPassword = btoa(this.password + secret);

      if (hashedPassword !== storedPasswordHash) {
        this.errorMessage = 'Invalid username or password.';
        return;
      }

      localStorage.setItem('sessionToken', Date.now().toString());
      localStorage.setItem('loggedInUser', this.username);
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
/* Scoped styles can remain if they are specific and not covered by global styles */
.form-container {
  /* Using global form styling, so this container might just be for alignment or specific page layout */
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers the form if its max-width is less than container width */
  padding-top: 20px;
}
/* Specific styles for this component's h1 if needed, otherwise global style applies */
h1 {
  margin-bottom: 20px;
}
</style>
