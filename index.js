const express = require("express")
const welcomeRouter = require("./welcome/welcome-router")
const postRouter = require("./posts/postRouter")

const server = express()
const port = 3000

server.use(express.json())
server.use(welcomeRouter)
server.use(postRouter)

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})