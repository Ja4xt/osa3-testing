const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express(); 

app.use(express.json());
app.use(cors())

morgan.token('body', function (req, res) { return req.method === 'POST' ? JSON.stringify(req.body) : '' })

const customFormat = ':method :url :status :res[content-length] - :response-time ms :body'

app.use (morgan(customFormat))

let persons =
    [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ]

    app.get('/', (req, res) => {
      response.send('<h1>Hello World!</h1>')
    })

    app.get('api/notes', (req, res) => {
      response.jsonh(notes)
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

    app.get('/api/persons', (req, res) => {
        res.json(persons)
    })

    app.get('/info', (req, res) => {
        const currentDate = new Date()
        res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${currentDate}</p>`)
    })

    app.get('/api/persons/:id', (req, res) => {
        const id = Number(req.params.id)
        const person = persons.find(person => person.id === id)
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })

    app.delete('/api/persons/:id', (req, res) => {
        const id = Number(req.params.id)
        persons = persons.filter(person => person.id !== id)
        res.status(204).end()
    })

    const generateId = () => {
      const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
      return maxId + 1
    }

    app.post('/api/persons', (req, res) => {
        const body = req.body

        if (!body.name) {
            return res.status(400).json({
                error: 'name missing'
            })
          }
        if (!body.number) {
            return res.status(400).json({
                error: 'number missing'
            })
          }
        if (persons.some(person => person.name === body.name)) {
            return res.status(409).json({
                error: 'name must be unique'
            })
          }

        let person = { id: generateId(),
        name: body.name,
        number: body.number
        }

        persons = persons.concat(person)
        res.json(person)
    })


    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })