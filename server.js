const express = require('express');
const fs = require('fs');
const path = require('path')
const notesData = require('./db/db.json');
const {v4: uuidnotes} = require('uuid')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, 'public/notes.html'))
);


app.get('/api/notes', (req, res) => {
    res.json(notesData)
});


app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if( title && text){
        const noteAdded ={
            title,
            text,
            id: uuidnotes(),
        };

        notesData.push(noteAdded);
    }

    fs.writeFile('./db/db.json', JSON.stringify(notesData), err =>{
        console.log(err)
    }
    )

    res.json(notesData);
}); 

// app.delete('api/notes/:id', (req, res) =>{
//     res.json(notesData)

// })

app.get('*', (req, res) => 
res.sendFile(path.join(__dirname, 'public/index.html' ))
);


app.listen(PORT, () =>
console.log(`app listening at http://localhost:${PORT}`)
);