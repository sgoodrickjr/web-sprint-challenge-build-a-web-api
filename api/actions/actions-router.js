const router = require('express').Router()
const Action = require('./actions-model')
const { validateAction, validateActionId } = require('./actions-middleware')

router.get('/', async (req, res, next) => {
  try {
    const actions = await Action.get()
    res.json(actions || [])  // Ensure empty array
  } catch (err) {
    next(err)
  }
})

router.get('/:id', validateActionId, (req, res) => {
  res.json(req.action)
})

router.post('/', validateAction, async (req, res, next) => {
  try {
    const { project_id, description, notes, completed } = req.body
    const action = await Action.insert({
      project_id,
      description,
      notes,
      completed: completed || false
    })
    if (action) {
      res.status(201).json(action)
    } else {
      res.status(400).json({ message: 'invalid action data' })
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:id', validateActionId, validateAction, async (req, res, next) => {
  try {
    const { project_id, description, notes, completed } = req.body
    const action = await Action.update(req.params.id, {
      project_id,
      description,
      notes,
      completed
    })
    if (action) {
      res.json(action)
    } else {
      res.status(404).json({ message: 'action not found' })
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', validateActionId, async (req, res, next) => {
  try {
    await Action.remove(req.params.id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router