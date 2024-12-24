import { commentModel, IComment, postModel } from "../models/posts_model";
import { Request, Response } from "express";
import { Model } from "mongoose";
import BaseController from "./base_controller";

class CommentsController extends BaseController<IComment> {
    constructor() {
        super(postModel);
    }

    async addComment(req: Request, res: Response) {
        try {
            const postId = req.params.postId;
            const username = req.body.username;
            const content = req.body.content;
            
            const post = await postModel.findById(postId);
            
            if (!post) {
                return res.status(404).send({ message: "Post not found" });
            };
            
            const comment = await commentModel.create({
                postId: post._id,
                user: username,
                content: content
            });
            
            let postWithComment = await postModel.findByIdAndUpdate(
                postId,
                {
                    $push: { comments: comment._id},
                },
                {
                    new: true
                }
            );

            res.status(200).send(postWithComment);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async getCommentById(req: Request, res: Response) {
        try {
            const commentId = req.params.commentId;

            const comment = await commentModel.findById(commentId);
            
            if (!comment) {
                return res.status(404).send({ message: "Comment not found" });
            };

            res.status(200).send(comment);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async updateComment(req: Request, res: Response) {
        try {
            const commentId = req.params.commentId;

            const username = req.body.username;
            const content = req.body.content;

            const updatedComment = await commentModel.findByIdAndUpdate(
                commentId,
                {
                    user: username,
                    content: content
                }
            )

            if (!updatedComment) {
                return res.status(404).send({ message: "Comment not found" });
            }

            res.status(200).send(updatedComment);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async deleteComment(req: Request, res: Response) {
        try {
            const commentId = req.params.commentId;

            const deletedComment = await commentModel.findByIdAndDelete(commentId);

            if (!deletedComment) {
                return res.status(404).send({ message: "Comment not found" });
            }

            res.status(200).send(deletedComment);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async getAllCommentsByPostId(req: Request, res: Response) {
        try {
            const postId = req.params.postId;

            const post = await postModel.findById(postId).populate("comments");
            const postsComments = post?.comments;
            
            res.status(200).send(postsComments);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default new CommentsController();