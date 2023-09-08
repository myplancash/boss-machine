const minionsRouter = require('express').Router()

module.exports = minionsRouter

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabaseById,
} = require('./db.js')

minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id)
  if(minion) {
    req.minion = minion
    next()
  } else {
    res.status(404).send()
  }
})

minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'))
})

minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body)
  res.status(201).send(newMinion)
})

minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion)
})

minionsRouter.put('/:minionId', (req, res, next) => {
   const updatedMinionInstance = updateInstanceInDatabase('minions', req.body)
    res.send(updatedMinionInstance)
})

minionsRouter.delete('/:minionId', (req, res, next) => {
  const deleted = deleteFromDatabaseById('minions', req.params.minionId)
  if (deleted) {
    res.status(204)
  } else {
    res.status(404)
  }
  res.send()
})

// work
/* 
GET /api/minions/:minionId/work to get an array of all work for the specified minon.
POST /api/minions/:minionId/work to create a new work object and save it to the database.
PUT /api/minions/:minionId/work/:workId to update a single work by id.
DELETE /api/minions/:minionId/work/:workId to delete a single work by id. 
*/

minionsRouter.get('/:minionId/work',(req, res, next) => {
  const work = getAllFromDatabase('work').filter(singleWork => 
    singleWork.minionId === req.params.minionId)
  res.send(work)
})

minionsRouter.post('/:minionId/work',(req, res, next) => {
  const workToAdd = req.body
  workToAdd.minionId = req.params.minionId
  const createWork = addToDatabase('work', workToAdd)
  res.status(201).send(createWork)
})

minionsRouter.param('workId', (req, res, next, workId) => {
  const work = getFromDatabaseById('work', workId)
  if(work) {
    req.work = work
    next()
  } else {
    res.status(404).send()
  }
})

minionsRouter.put('/:minionId/work/:workId',(req, res, next) => {
  if(req.params.minionId !== req.body.minionId) {
    res.status(400).send()
  } else {
    const updatedWork = updateInstanceInDatabase('work', req.body)
    res.send(updatedWork)
  }
})


minionsRouter.delete('/:minionId/work/:workId',(req, res, next) => {
  const deleted = deleteFromDatabaseById('work', req.params.workId)
  if (deleted) {
    res.status(204)
  } else {
    res.status(500)
  }
  res.send()
})