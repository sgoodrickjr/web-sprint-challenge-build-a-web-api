const Action = require('./actions-model')

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

function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body
    if (!project_id || !description || !notes) {
      res.status(400).json({ 
        message: 'project_id, description and notes required' 
      })
    } else {
      next()
    }
  }

module.exports = {
  validateActionId,
  validateAction,
}