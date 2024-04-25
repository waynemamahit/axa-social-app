import axios from "axios";
import { create } from "zustand";
import { IComment } from "../interfaces/Comment";
import { CommentForm } from "../models/Comment";
import { API_URL } from "../utils/env";
import { showError, showMessage } from "../utils/message";
import { IFormState } from "../interfaces/Base";
import { FormState } from "../models/Base";

export interface CommentState extends IFormState {
  comments: IComment[];
  loading: boolean;
  getComments: (postId: number) => Promise<void>;
  addComment: (postId: number, form: CommentForm) => Promise<void>;
  updateComment: (id: number, form: CommentForm) => Promise<void>;
}

const useCommentStore = create<CommentState>()((set) => ({
  ...new FormState(set),
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
    set({ formLoad: true });
    try {
      const response = await axios.post<IComment>(
        API_URL + "comments?postId=" + postId,
        form
      );
      if (response.status !== 201) throw new Error();
      set((state) => ({ comments: [...state.comments, response.data] }));
      await showMessage("New comment has been added!");
    } catch {
      await showError("Failed to add comment");
    } finally {
      set({ formLoad: false });
    }
  },
  async updateComment(id: number, form: CommentForm) {
    set({ formLoad: true });
    try {
      const response = await axios.patch<IComment>(
        API_URL + "comments/" + id,
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
      await showMessage("Comment has been updated!");
    } catch {
      await showError("Failed to update comment");
    } finally {
      set({ formLoad: false });
    }
  },
}));

export default useCommentStore;
