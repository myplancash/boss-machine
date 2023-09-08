const ideasRouter = require('express').Router()
const checkMillionDollarIdea = require('./checkMillionDollarIdea')

module.exports = ideasRouter

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabaseById,
} = require('./db.js')

ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'))
})

ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea)
})

ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id)
  if(idea) {
    req.idea = idea
    next()
  } else {
    res.status(404).send()
  }
})

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body)
  res.status(201).send(newIdea)
})
/* 
POST or PUT requests will send their new/updated resources 
in the request body. POST request bodies will not have an id property, 
you will have to set it based on the next id in sequence.
 */

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
   const updatedIdeaInstance = updateInstanceInDatabase('ideas', req.body)
    res.send(updatedIdeaInstance)
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
  const deleted = deleteFromDatabaseById('ideas', req.params.ideaId)
  if (deleted) {
    res.status(204)
  } else {
    res.status(500)
  }
  res.send()
})