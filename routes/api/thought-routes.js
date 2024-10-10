const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
  createReaction,
  deleteReaction,
} = require("../../controllers/thought-controllers");


// GET and POST new thought
router.route("/").get(getAllThoughts).post(createThought);

//GET, UPDATE and DELETE single thought by ID
router.route("/:thoughtId").get(getSingleThoughtById).put(updateThoughtById).delete(deleteThoughtById);

// POST reaction to thought by thought ID
router.route("/:thoughtId/reactions").post(createReaction);

// DELETE reaction to thought by thought ID
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;