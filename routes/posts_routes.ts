import express from "express";
const router = express.Router();
import postsController from "../controllers/posts_controller";
import commentsController from "../controllers/comments_controller";


router.post("/add", postsController.create.bind(postsController))

router.get("/all", postsController.getAll.bind(postsController))

router.get("/:id", postsController.getById.bind(postsController))

router.put("/update/:id", postsController.updatePost.bind(postsController))

router.put("/addComment/:postId", commentsController.addComment.bind(commentsController));

router.get("/comment/:commentId", commentsController.getCommentById.bind(commentsController));

router.put("/comment/update/:commentId", commentsController.updateComment.bind(commentsController));

router.delete("/comment/delete/:commentId", commentsController.deleteComment.bind(commentsController));

router.get("/getComments/:postId", commentsController.getAllCommentsByPostId.bind(commentsController));

export default router;