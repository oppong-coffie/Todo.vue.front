<template>
  <div class="home">
    <h1>TO DO LIST</h1>
    <form @submit.prevent="addTask">
      <input v-model="title" type="text" placeholder="Add a new task" required />
      <button type="submit">Add</button>
    </form>
    <TaskList />
  </div>
</template>

<script>
import TaskList from '@/views/TaskList.vue';

export default {
  name: 'HomeView',
  components: {
    TaskList,
  },
  data() {
    return {
      title: '',
    };
  },
  methods: {
    async addTask() {
      // Ensure the newTask is not empty
      if (!this.title) {
        alert('Please enter a task');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: this.title }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Task added:', data);
          this.title = ''; // Clear the input field after submission
          // Optionally, you can refresh the task list here
        } else {
          alert('Failed to add task, please try again.');
        }
      } catch (error) {
        console.error('Error adding task:', error);
        alert('An error occurred while adding the task.');
      }
    },
  },
};
</script>

<style scoped>
/* Add any relevant styles here */
</style>
