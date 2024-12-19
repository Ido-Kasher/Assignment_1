import express from "express";
const router = express.Router();
import postsController from "../controllers/posts_controller";


router.post("/add", postsController.create.bind(postsController))

router.get("/all", postsController.getAll.bind(postsController))

router.get("/:id", postsController.getById.bind(postsController))

router.put("/update/:id", postsController.updatePost.bind(postsController))

export default router;