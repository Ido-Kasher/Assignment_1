import mongoose from "mongoose";

export interface IComment {
  postId: mongoose.Schema.Types.ObjectId;
  user: string;
  content: string;
}
export interface IPost {
  title: string;
  content: string;
  owner: string;
  comments: mongoose.Schema.Types.ObjectId[];
}

const commentSchema = new mongoose.Schema<IComment>({
  postId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Posts"
  },
  user: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
});

const postSchema = new mongoose.Schema<IPost>({
  title: {
    type: String,
    required: true,
  },
  content: String,
  owner: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Comments"
    }
  ]
});

export const postModel = mongoose.model<IPost>("Posts", postSchema);
export const commentModel = mongoose.model<IComment>("Comments", commentSchema);

// export default postModel;