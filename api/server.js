require('dotenv').config()
const express = require('express')
const helmet = require('helmet')

const projectsRouter = require('./projects/projects-router')  // Remove 'api/' from path
const actionsRouter = require('./actions/actions-router')     // Remove 'api/' from path

const server = express()
// const port = process.env.PORT || 9000

server.use(helmet())
server.use(express.json())

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message
  })
})

module.exports = server