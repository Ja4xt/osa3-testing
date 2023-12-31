const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const notes =
    [
      {
        "id": 1,
        "content": "HTML is easy",
        "date": "2022-1-17T17:30:31.098Z",
        "important": true
      },
      {
        "id": 2,
        "content": "Browser can execute only JavaScript",
        "date": "2022-1-17T18:39:34.091Z",
        "important": false
      },
      {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "date": "2022-1-17T19:20:14.298Z",
        "important": true
      },
      {
        "content": "POST is used to add data to a REST api",
        "date": "2022-07-17T12:09:13.540Z",
        "important": true,
        "id": 4
      },
      {
        "content": "PUT is used to update data to a REST api",
        "date": "2022-07-17T12:17:45.171Z",
        "important": true,
        "id": 5
      }
    ]
    
    app.get('api/notes', (req, res) => {
        res.json(notes)
      })
  
      app.get('/api/notes/:id', (req, res) => {
        const id = Number(req.params.id)
        const note = notes.find(note => note.id === id)
        if (note) {
          res.json(note)
        } else {
          res.status(404).end()
        }
      })

      app.delete('/api/notes/:id', (req, res) => {
        const id = Number(req.params.id)
        notes = notes.filter(note => notes.id !== id)
        res.status(204).end()
      })
  
      const generateId = () => {
        const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
        return maxId + 1
      }

      app.post('/api/notes', (req, res) => {
        const body = req.body
        if (!body.content) {
          return res.status(400).json({
            error: 'content missing'
          })
        }
        const note = {
          content: body.content,
          important: body.important || false,
          date: new Date(),
          id: generateId(),
        }
        notes = notes.concat(note)
        res.json(note)
      })

    app.get('/api/notes', (req, res) => {
      res.json(notes)
    })

    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })