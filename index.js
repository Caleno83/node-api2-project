const express = require("express")
const welcomeRouter = require("./welcome/welcome-router")
const postRouter = require("./posts/postRouter")

require('dotenv').config();

const server = express()
const port = process.env.PORT || 3000

server.use(express.json())
server.use(welcomeRouter)
server.use('/api', postRouter)

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})