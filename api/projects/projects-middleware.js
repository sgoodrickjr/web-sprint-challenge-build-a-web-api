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
  const { name, description } = req.body
  if (!name || !description) {
    res.status(400).json({ message: 'name and description required' })
  } else {
    next()
  }
}

module.exports = {
  validateProjectId,
  validateProject,
}