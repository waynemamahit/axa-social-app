import axios from "axios";
import { create } from "zustand";
import { IComment } from "../interfaces/Comment";
import { CommentForm } from "../models/Comment";
import { API_URL } from "../utils/env";
import { showError } from "../utils/message";

export interface CommentState {
  comments: IComment[];
  loading: boolean;
  getComments: (postId: number) => void;
}

const useCommentStore = create<CommentState>()((set) => ({
  comments: [],
  loading: false,
  async getComments(postId: number) {
    set({ loading: true });
    try {
      const response = await axios.get<IComment[]>(
        API_URL + "comments?postId=" + postId
      );
      if (response.status !== 200) throw new Error();
      set({ comments: response.data });
    } catch {
      await showError("Failed to get comments");
    } finally {
      set({ loading: false });
    }
  },
  async addComment(postId: number, form: CommentForm) {
    set({ loading: true });
    try {
      const response = await axios.post<IComment>(
        API_URL + "comments=postId=" + postId,
        form
      );
      if (response.status !== 200) throw new Error();
      set((state) => ({ comments: [...state.comments, response.data] }));
    } catch {
      await showError("Failed to comment post");
    } finally {
      set({ loading: false });
    }
  },
  async updatePost(id: number, form: CommentForm) {
    set({ loading: true });
    try {
      const response = await axios.patch<IComment>(
        API_URL + "comments/1",
        form
      );
      if (response.status !== 200) throw new Error();
      set((state) => {
        const comments = state.comments;
        const dataIndex = comments.findIndex((comments) => comments.id === id);
        if (dataIndex >= 0) {
          comments[dataIndex] = response.data;
        }
        return { comments };
      });
    } catch {
      await showError("Failed to update post");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCommentStore;
