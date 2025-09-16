<template>
  <div class="app">
    <h1>Student & Admin Manager</h1>

    <section>
      <h2>Student Manager</h2>
      <form @submit.prevent="addStudent" class="form">
        <input v-model="newStudent.studentID" placeholder="Student ID" required />
        <input v-model="newStudent.firstName" placeholder="First Name" required />
        <input v-model="newStudent.lastName" placeholder="Last Name" required />
        <input v-model="newStudent.section" placeholder="Section" required />
        <button type="submit" class="btn">Add Student</button>
      </form>

      <div class="card-list">
        <div v-for="student in students" :key="student.studentID" class="card">
          <p><strong>{{ student.studentID }}</strong></p>
          <p>{{ student.firstName }} {{ student.lastName }}</p>
          <p class="small">Section: {{ student.section }}</p>
          <button @click="deleteStudent(student.studentID)" class="delete-btn">Delete</button>
        </div>
      </div>
    </section>

    <section>
      <h2>Admin Manager</h2>
      <form @submit.prevent="addAdmin" class="form">
        <input v-model="newAdmin.adminID" placeholder="Admin ID" required />
        <input v-model="newAdmin.firstName" placeholder="First Name" required />
        <input v-model="newAdmin.lastName" placeholder="Last Name" required />
        <input v-model="newAdmin.department" placeholder="Department" required />
        <button type="submit" class="btn">Add Admin</button>
      </form>

      <div class="card-list">
        <div v-for="admin in admins" :key="admin.adminID" class="card">
          <p><strong>{{ admin.adminID }}</strong></p>
          <p>{{ admin.firstName }} {{ admin.lastName }}</p>
          <p class="small">Department: {{ admin.department }}</p>
          <button @click="deleteAdmin(admin.adminID)" class="delete-btn">Delete</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      students: [],
      newStudent: { studentID: "", firstName: "", lastName: "", section: "" },
      admins: [],
      newAdmin: { adminID: "", firstName: "", lastName: "", department: "" }
    };
  },
  methods: {
    async fetchStudents() {
      const res = await axios.get("http://localhost:5000/api/students");
      this.students = res.data;
    },
    async addStudent() {
      await axios.post("http://localhost:5000/api/students", this.newStudent);
      this.newStudent = { studentID: "", firstName: "", lastName: "", section: "" };
      this.fetchStudents();
    },
    async deleteStudent(id) {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      this.fetchStudents();
    },
    async fetchAdmins() {
      const res = await axios.get("http://localhost:5000/api/admins");
      this.admins = res.data;
    },
    async addAdmin() {
      await axios.post("http://localhost:5000/api/admins", this.newAdmin);
      this.newAdmin = { adminID: "", firstName: "", lastName: "", department: "" };
      this.fetchAdmins();
    },
    async deleteAdmin(id) {
      await axios.delete(`http://localhost:5000/api/admins/${id}`);
      this.fetchAdmins();
    }
  },
  mounted() {
    this.fetchStudents();
    this.fetchAdmins();
  }
};
</script>

<style>
.app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 30px;
  max-width: 900px;
  margin: auto;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  color: #0277bd;
}

h2 {
  margin-bottom: 15px;
  color: #01579b;
}

.form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  min-width: 180px;
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 6px;
  font-size: 14px;
}

.btn {
  background: #0277bd;
  color: white;
  border: none;
  padding: 10px 16px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.3s;
}
.btn:hover {
  background: #01579b;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 15px;
}

.card {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  text-align: center;
}

.card p {
  margin: 5px 0;
}

.card .small {
  font-size: 13px;
  color: #555;
}

.delete-btn {
  background: #d32f2f;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 13px;
  transition: background 0.3s;
}
.delete-btn:hover {
  background: #b71c1c;
}
</style>
