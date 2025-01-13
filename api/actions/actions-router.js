const router = require('express').Router()
const Action = require('./actions-model')
const { validateAction, validateActionId } = require('./actions-middleware')

router.get('/', async (req, res, next) => {
  try {
    const actions = await Action.get()
    res.json(actions)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', validateActionId, (req, res) => {
  res.json(req.action)
})

router.post('/', validateAction, async (req, res, next) => {
  try {
    const action = await Action.insert(req.body)
    res.status(201).json(action)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', validateActionId, validateAction, async (req, res, next) => {
  try {
    const action = await Action.update(req.params.id, req.body)
    res.json(action)
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