const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/usersController");

router.get("/users", usersController.read);

router.post("/users", usersController.create);

router.delete("/users/:id", usersController.delete);

module.exports = router;
