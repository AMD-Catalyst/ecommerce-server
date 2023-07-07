const router = require("express").Router();
const {
  verifyJWT,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../middleware/verifyJWT");
const {
  newCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
} = require("../controllers/carts");

router
  .route("/")
  .post(verifyJWT, newCart)
  .get(verifyTokenAndAdmin, getAllCarts);

router
  .route("/:id")
  .put(verifyTokenAndAuth, updateCart)
  .delete(verifyTokenAndAuth, deleteCart)
  .get(verifyTokenAndAuth, getCart);

module.exports = router;
