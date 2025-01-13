const Action = require('./actions-model')
const Project = require('../projects/projects-model')

async function validateActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id)
    if (!action) {
      res.status(404).json({ message: 'action not found' })
    } else {
      req.action = action
      next()
    }
  } catch (err) {
    next(err)
  }
}

async function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body
  
  if (!project_id || !description || !notes) {
    res.status(400).json({ 
      message: 'project_id, description and notes required' 
    })
  } else {
    try {
      const project = await Project.get(project_id)
      if (!project) {
        res.status(404).json({ 
          message: 'project_id does not reference an existing project' 
        })
      } else {
        next()
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {
  validateActionId,
  validateAction,
}