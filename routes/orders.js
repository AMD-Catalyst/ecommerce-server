const router = require("express").Router();
const {
  verifyJWT,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../middleware/verifyJWT");
const {
  newOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getMonthlyIncome,
} = require("../controllers/orders");

router
  .route("/")
  .post(verifyJWT, newOrder)
  .get(verifyTokenAndAdmin, getAllOrders);

router.route("/income").get(verifyTokenAndAdmin, getMonthlyIncome);

router
  .route("/:id")
  .put(verifyTokenAndAdmin, updateOrder)
  .delete(verifyTokenAndAdmin, deleteOrder)
  .get(verifyTokenAndAuth, getOrder);

module.exports = router;
