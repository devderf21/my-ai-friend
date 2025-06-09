<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/upload" v-if="isLoggedIn">Upload Event</router-link>
    <span v-if="isLoggedIn"> | <button @click="logout">Logout</button></span>
    <span v-else>
      | <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Signup</router-link>
    </span>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      loggedIn: !!localStorage.getItem('sessionToken'),
    };
  },
  computed: {
    isLoggedIn() {
      return this.loggedIn;
    }
  },
  methods: {
    updateLoginStatus() {
      this.loggedIn = !!localStorage.getItem('sessionToken');
    },
    logout() {
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('loggedInUser');
      this.loggedIn = false; // Update local reactive state
      this.$router.push('/login');
    }
  },
  watch: {
    '$route'() {
      // Update login status on route change, especially for initial load or browser back/forward
      this.updateLoginStatus();
    }
  },
  created() {
    // Ensure status is up-to-date when app is created
    this.updateLoginStatus();

    // Listen for login/logout events if we were to implement an event bus
    // For now, router push from Login/Signup will trigger route watch
  },
  mounted() {
    // Another check or listener setup can go here if needed
    // e.g., window.addEventListener('storage', this.handleStorageChange);
    // This would react to localStorage changes from other tabs, though more complex.
  },
  // beforeUnmount() {
    // window.removeEventListener('storage', this.handleStorageChange);
  // }
}
</script>

<style>
/* Styles from main.css will apply for #app global layout */

#nav {
  padding: 15px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e7e7e7;
  display: flex;
  justify-content: center; /* Center nav items by default */
  align-items: center;
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */
}

#nav a, #nav button {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 8px 12px;
  margin: 5px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

#nav a.router-link-exact-active {
  color: #ffffff;
  background-color: #42b983;
}

#nav a:hover, #nav button:hover {
  background-color: #e9ecef;
  color: #0056b3;
}

#nav button {
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: transparent;
}

#nav button:hover {
  border-color: #42b983;
}

/* Responsive Navigation */
@media (max-width: 767px) {
  #nav {
    flex-direction: column; /* Stack items vertically */
    align-items: stretch; /* Stretch items to full width */
  }

  #nav a, #nav button, #nav span {
    display: block; /* Make links and buttons block elements */
    width: calc(100% - 10px); /* Full width with some margin */
    text-align: center;
    margin: 5px 0; /* Adjust margin for vertical layout */
  }

  #nav span { /* Container for login/signup or logout */
    display: contents; /* Make span not affect flex layout of its children if it's just a wrapper */
  }
}
</style>
