const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
	res.json({
		message: "Welcome to Our Posts API",
	})
})

module.exports = router