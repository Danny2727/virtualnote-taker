const express = require('express');
const path = require('path')
const termData = require('./db/db.json');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('*', (req, res) => 
res.sendFile(path.join(__dirname, 'public/index.html' ))
);

app.get('/api/notes', (req, res) => res.json(termData));

app.post('/api/notes', (req, res) =>
console.log(req.body)
) 


app.listen(PORT, () =>
console.log(`app listening at http://localhost:${PORT}`)
);