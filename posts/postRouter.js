const express = require("express");
const posts = require("../data/db");

const router = express.Router();

//Creating a new post

router.post("/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  posts
    .insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

// create endpoint for adding a new post for a specific comment
router.post("/posts/:id/comments", (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({
      errorMessage: "Please provide text for the comment.",
    });
  }

  posts
    .insertComment({
      post_id: req.params.id,
      text: req.body.text,
    })

    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      // log out the error so the developers can see it
      console.log(error);

      // but don't send it back to the client for security purposes
      res.status(500).json({
        error: "There was an error while saving the comment to the database",
      });
    });
});

//fetching all posts
router.get("/posts", (req, res) => {
  posts
    .find(req.query)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved.",
      });
    });
});

//fetching a specific post
router.get("/posts/:id", (req, res) => {
  posts
    .findById(req.params.id)

    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
});

// create endpoint that returns a post with specific comment
router.get("/posts/:id/comments", (req, res) => {
  posts
    .findPostComments(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      // log out the error so the developers can see it
      console.log(error);

      // but don't send it back to the client for security purposes
      res.status(500).json({
        error: "The comments information could not be retrieved.",
      });
    });
});

//deleting a specific post
router.delete("/posts/:id", (req, res) => {
  posts
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The post has been erased to never come back again!!!",
        });
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed",
      });
    });
});

//updating a specific post
router.put("/posts/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  posts
    .update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be modified.",
      });
    });
});

module.exports = router;
