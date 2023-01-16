import express from 'express'
import { join } from 'node:path'

import todoRouter from './routes/todos'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/todos', todoRouter)

export default server
