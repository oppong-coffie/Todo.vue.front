<template>
  <div class="task-list">
    <h1>Task List</h1>
    <div>
      <div class="task" v-for="task in tasks" :key="task.id">
        <h2>{{ task.title }}</h2>
        <div>
          <button @click="markAsDone(task._id)">Done</button>
          <button @click="editTask(task._id)">Edit</button>
          <button @click="deleteTask(task._id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: []
    }
  },
  methods: {
    // Fetch tasks from the server
    async getTasks() {
      try {
        const response = await fetch('http://localhost:5000/tasks');
        const data = await response.json();
        this.tasks = data.tasks; // Assuming your API response structure is { tasks: [...] }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        alert('An error occurred while fetching tasks.');
      }
    },
    // Mark task as done
    async markAsDone(taskId) {
      try {
        await fetch(`http://localhost:5000/tasks/${taskId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'done' })
        });
        this.getTasks(); // Refresh the task list
      } catch (error) {
        console.error('Error marking task as done:', error);
      }
    },
    // Redirect to the task editing page
    editTask(taskId) {
      this.$router.push(`/tasks/edit/${taskId}`);
    },
    // Delete task from the server
    async deleteTask(taskId) {
      try {
        await fetch(`http://localhost:5000/delete/${taskId}`, {
          method: 'DELETE'
        });
        this.getTasks(); // Refresh the task list after deletion
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('An error occurred while deleting the task.');
      }
    }
  },
  // Fetch tasks when the component is mounted
  mounted() {
    this.getTasks();
  }
}
</script>

<style scoped>
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>
