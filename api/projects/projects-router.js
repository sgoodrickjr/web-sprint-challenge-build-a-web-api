const router = require('express').Router()
const Project = require('./projects-model')
const { validateProject, validateProjectId } = require('./projects-middleware')

router.get('/', async (req, res, next) => {
    try {
      let projects = await Project.get()
      if (!projects) projects = []
      if (!Array.isArray(projects)) projects = [projects]
      res.json(projects)
    } catch (err) {
      next(err)
    }
  })
  
  router.get('/:id', validateProjectId, (req, res) => {
    const project = req.project
    res.json({
      name: project.name,
      description: project.description,
      completed: project.completed || false,
      ...project
    })
  })
  
  router.post('/', validateProject, async (req, res, next) => {
    try {
      const { name, description, completed } = req.body
      const project = await Project.insert({
        name,
        description,
        completed: completed || false
      })
      res.status(201).json(project)
    } catch (err) {
      next(err)
    }
  })
  
  router.put('/:id', validateProjectId, validateProject, async (req, res, next) => {
    try {
      const { name, description, completed } = req.body
      const project = await Project.update(req.params.id, {
        name,
        description,
        completed
      })
      res.json(project)
    } catch (err) {
      next(err)
    }
  })
  
  router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
      const actions = await Project.getProjectActions(req.params.id)
      res.json(actions || [])  // Ensure empty array
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

module.exports = router