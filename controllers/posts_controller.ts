import {postModel, IPost } from "../models/posts_model";
import { Request, Response } from "express";
import BaseController from "./base_controller";

class PostsController extends BaseController<IPost> {
    constructor() {
        super(postModel);
    }

    async create(req: Request, res: Response) {
        const userId = req.params.userId;
        console.log(req.params.userId)
        const post = {
            ...req.body,
        }
        req.body = post;
        super.create(req, res);
    };

    async getById(req: Request, res: Response) {
        return super.getById(req, res);
    }
}


export default new PostsController();