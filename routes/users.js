const router = require("express").Router();
const {
  verifyJWT,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../middleware/verifyJWT");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getStats,
} = require("../controllers/users");

router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/stats", verifyTokenAndAdmin, getStats);

router
  .route("/:id")
  .get(verifyTokenAndAdmin, getUser)
  .put(verifyTokenAndAuth, updateUser)
  .delete(verifyTokenAndAuth, deleteUser);

module.exports = router;
