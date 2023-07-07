const router = require("express").Router();
const {
  verifyJWT,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../middleware/verifyJWT");
const {
  newProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../controllers/products");

router.route("/").post(verifyTokenAndAdmin, newProduct).get(getAllProducts);
router
  .route("/:id")
  .put(verifyTokenAndAdmin, updateProduct)
  .delete(verifyTokenAndAdmin, deleteProduct)
  .get(getProduct);
module.exports = router;
