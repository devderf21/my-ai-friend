<template>
  <div class="event-list-container container"> <!-- Added .container for consistent padding/width -->
    <h1>Upcoming Events</h1>
    <div v-if="events.length === 0" class="no-events">
      <p>No events found. Be the first to add one!</p>
      <router-link to="/upload" class="add-event-button">Add Event</router-link>
    </div>
    <ul v-else class="event-list">
      <li v-for="event in events" :key="event.id" class="event-item">
        <h2>{{ event.name }}</h2>
        <div class="event-details">
          <p><strong>Date:</strong> {{ formatDate(event.date) }}</p>
          <p><strong>Time:</strong> {{ formatTime(event.time) }}</p>
          <p><strong>Location:</strong> {{ event.location }}</p>
          <p><strong>Description:</strong> {{ event.description }}</p>
        </div>
        <p class="uploaded-by"><em>Uploaded by: {{ event.uploadedBy }}</em></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'EventListComponent',
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    this.loadEvents();
  },
  methods: {
    loadEvents() {
      const storedEvents = localStorage.getItem('micom-events');
      if (storedEvents) {
        this.events = JSON.parse(storedEvents).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
      }
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    formatTime(timeString) {
      if (!timeString) return 'N/A';
      let [hours, minutes] = timeString.split(':');
      hours = parseInt(hours);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes.padStart(2, '0');
      return `${hours}:${minutes} ${ampm}`;
    }
  },
};
</script>

<style scoped>
.event-list-container {
  /* .container class from main.css handles width and centering */
  padding-top: 20px;
  padding-bottom: 20px;
}

.no-events {
  text-align: center;
  padding: 30px 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
}

.add-event-button {
  display: inline-block;
  margin-top: 15px;
  padding: 12px 25px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.add-event-button:hover {
  background-color: #36a476;
}

.event-list {
  list-style-type: none;
  padding: 0;
}

.event-item {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  display: flex; /* Use flex for better internal layout */
  flex-direction: column; /* Stack content vertically */
}

.event-item h2 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  font-size: 1.6rem; /* Adjusted from global */
}

.event-details p {
  margin: 5px 0;
  color: #555;
  line-height: 1.5;
}

.event-details p strong {
  color: #333;
}

.uploaded-by {
  font-size: 0.85em;
  color: #6c757d;
  text-align: right;
  margin-top: 15px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* Responsive adjustments for event items */
@media (max-width: 767px) {
  .event-item h2 {
    font-size: 1.4rem;
  }
  .event-item {
    padding: 15px;
  }
  .event-details p {
    font-size: 0.95rem;
  }
  .uploaded-by {
    font-size: 0.8em;
  }
}

@media (min-width: 768px) {
  /* On larger screens, maybe a more complex layout if desired */
  .event-item {
     /* Could use flex-direction: row and justify-content: space-between if content allows */
  }
}
</style>
