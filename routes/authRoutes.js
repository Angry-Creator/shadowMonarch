const { Router } = require("express");
const authController = require("../controller/authController");

const router = Router();

router.get("/pricing", authController.pricing_get);
router.post("/pricing", authController.pricing_post);
router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

module.exports = router;