const router = require("express").Router();
const {
  getAllUsers,
  getSingleUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controllers");


// GET and POST all new user
router.route("/").get(getAllUsers).post(createUser);

// GET, UPDATE and DELETE by ID
router.route("/:userId").get(getSingleUserById).put(updateUserById).delete(deleteUserById);

// ADD and DELETE friend by ID
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;