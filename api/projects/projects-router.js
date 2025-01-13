const router = require('express').Router()
const Project = require('./projects-model')
const { validateProject, validateProjectId } = require('./projects-middleware')

router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.get()
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', validateProjectId, (req, res) => {
  res.json(req.project)
})

router.post('/', validateProject, async (req, res, next) => {
  try {
    const project = await Project.insert(req.body)
    res.status(201).json(project)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', validateProjectId, validateProject, async (req, res, next) => {
  try {
    const project = await Project.update(req.params.id, req.body)
    res.json(project)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
  try {
    await Project.remove(req.params.id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
  try {
    const actions = await Project.getProjectActions(req.params.id)
    res.json(actions)
  } catch (err) {
    next(err)
  }
})

module.exports = router