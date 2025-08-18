import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static('public'));

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});
const uploads = multer({ storage: storage }).single('file');

// Serve static HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});

app.get('/studentForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'student.html'));
});

app.get('/adminForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'admin.html'));
});

// Serve the file upload form
app.get('/uploadForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'admin.html'));
});

// Handle form data submissions
app.get('/getStudent', (req, res) => {
    const { studentID, firstName, lastName, section } = req.query;
    const student = { studentID, firstName, lastName, section };
    console.log("Student Info: ", student);
    res.json(student);
});

app.get('/getAdmin', (req, res) => {
    const { adminID, firstName, lastName, department } = req.query;
    const admin = { adminID, firstName, lastName, department };
    console.log("Admin Info: ", admin);
    res.json(admin);
});

app.get('/getUser', (req, res) => {
    const response = {
        firstName: req.query.firstName,
        lastName: req.query.lastName
    };
    console.log("User Info: ", response);
    res.end(`Received Data: ${JSON.stringify(response)}`);
});

// Handle file upload
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

const server = app.listen(5000, () => {
    const host = server.address().address === '::' ? 'localhost' : server.address().address;
    const port = server.address().port;
    console.log(`Server running at http://${host}:${port}`);
});