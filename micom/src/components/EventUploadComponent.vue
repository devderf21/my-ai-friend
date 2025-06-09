<template>
  <div class="form-container">
    <h1>Upload New Event</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="eventName">Event Name:</label>
        <input type="text" id="eventName" v-model="event.name" required />
      </div>
      <div>
        <label for="eventDate">Date:</label>
        <input type="date" id="eventDate" v-model="event.date" required />
      </div>
      <div>
        <label for="eventTime">Time:</label>
        <input type="time" id="eventTime" v-model="event.time" required />
      </div>
      <div>
        <label for="eventLocation">Location:</label>
        <input type="text" id="eventLocation" v-model="event.location" required />
      </div>
      <div>
        <label for="eventDescription">Description:</label>
        <textarea id="eventDescription" v-model="event.description" required></textarea>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="submit">Upload Event</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EventUploadComponent',
  data() {
    return {
      event: {
        id: '',
        name: '',
        date: '',
        time: '',
        location: '',
        description: '',
        uploadedBy: '',
      },
      errorMessage: '',
    };
  },
  methods: {
    handleSubmit() {
      this.errorMessage = '';
      if (
        !this.event.name ||
        !this.event.date ||
        !this.event.time ||
        !this.event.location ||
        !this.event.description
      ) {
        this.errorMessage = 'All fields are required.';
        return;
      }

      const loggedInUser = localStorage.getItem('loggedInUser');
      if (!loggedInUser) {
        this.errorMessage = 'You must be logged in to upload an event. Redirecting to login...';
        setTimeout(() => this.$router.push('/login'), 2000);
        return;
      }

      this.event.uploadedBy = loggedInUser;
      this.event.id = Date.now().toString() + Math.random().toString(36).substring(2, 15);

      let events = JSON.parse(localStorage.getItem('micom-events')) || [];
      events.push(this.event);
      localStorage.setItem('micom-events', JSON.stringify(events));

      alert('Event uploaded successfully!');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers the form */
  padding-top: 20px;
}

h1 {
  margin-bottom: 20px;
}

/* The <form> element itself will pick up global styles from main.css */
/* Specific styles for this component's form elements can go here if needed */
</style>
