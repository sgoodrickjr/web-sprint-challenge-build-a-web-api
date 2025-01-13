require('dotenv').config()
const express = require('express')
const helmet = require('helmet')

const projectsRouter = require('./api/projects/projects-router')
const actionsRouter = require('./api/actions/actions-router')

const server = express()
const port = process.env.PORT || 9000 

server.use(helmet())
server.use(express.json())

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = server