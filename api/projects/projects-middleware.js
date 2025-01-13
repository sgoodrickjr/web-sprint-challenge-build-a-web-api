const Project = require('./projects-model')

async function validateProjectId(req, res, next) {
  try {
    const project = await Project.get(req.params.id)
    if (!project) {
      res.status(404).json({ message: 'project not found' })
    } else {
      req.project = project
      next()
    }
  } catch (err) {
    next(err)
  }
}

function validateProject(req, res, next) {
  const { name, description, completed } = req.body
  if (!name || !description || completed === undefined) {
    res.status(400).json({ 
      message: 'name, description and completed status required' 
    })
  } else {
    next()
  }
}

module.exports = {
  validateProjectId,
  validateProject,
}