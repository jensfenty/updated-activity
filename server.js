import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});
const uploads = multer({ storage: storage }).single('file');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});

app.get('/studentForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'student.html'));
});

app.get('/adminForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'admin.html'));
});

app.get('/uploadForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'admin.html'));
});

app.get('/getStudent', (req, res) => {
  const { studentID, firstName, lastName, section } = req.query;
  const student = { studentID, firstName, lastName, section };
  console.log("Student Info:", student);
  res.json(student);
});

app.get('/getAdmin', (req, res) => {
  const { adminID, firstName, lastName, department } = req.query;
  const admin = { adminID, firstName, lastName, department };
  console.log("Admin Info:", admin);
  res.json(admin);
});

app.get('/getUser', (req, res) => {
  const response = {
    firstName: req.query.firstName,
    lastName: req.query.lastName
  };
  console.log("User Info:", response);
  res.end(`Received Data: ${JSON.stringify(response)}`);
});

app.post('/postAdmin', (req, res) => {
  uploads(req, res, (err) => {
    if (err) return res.status(400).send('Error uploading file');

    const username = req.body.username;
    const uploadedFile = req.file;

    console.log(`Username: ${username}`);
    console.log(`File path: ${uploadedFile.path}`);

    res.end('File and form data uploaded successfully');
  });
});

let students = [];
let admins = [];

app.get('/api/students', (req, res) => {
  res.json(students);
});

app.post('/api/students', (req, res) => {
  const student = req.body;
  students.push(student);
  res.json(student);
});

app.delete('/api/students/:id', (req, res) => {
  const id = req.params.id;
  students = students.filter(s => s.studentID !== id);
  res.json({ message: 'Student deleted' });
});

app.get('/api/admins', (req, res) => {
  res.json(admins);
});

app.post('/api/admins', (req, res) => {
  const admin = req.body;
  admins.push(admin);
  res.json(admin);
});

app.delete('/api/admins/:id', (req, res) => {
  const id = req.params.id;
  admins = admins.filter(a => a.adminID !== id);
  res.json({ message: 'Admin deleted' });
});

const server = app.listen(5000, () => {
  const host = server.address().address === '::' ? 'localhost' : server.address().address;
  const port = server.address().port;
  console.log(`Server running at http://${host}:${port}`);
});
