import axios from "axios";
import { create } from "zustand";
import { IFormState, ModalType } from "../interfaces/Base";
import { IPost } from "../interfaces/Post";
import { FormState } from "../models/Base";
import { PostForm } from "../models/Post";
import { API_URL } from "../utils/env";
import { showError, showMessage } from "../utils/message";

export interface PostState extends IFormState {
  posts: IPost[];
  loading: boolean;
  selectedPost: IPost | null;
  postLoad: boolean;
  getPosts: (userId: number) => Promise<void>;
  showPost: (id: number) => Promise<void>;
  addPost: (userId: number, form: PostForm) => Promise<void>;
  updatePost: (id: number, form: PostForm) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

const usePostStore = create<PostState>()((set) => ({
  ...new FormState(set),
  posts: [],
  loading: false,
  selectedPost: null,
  postLoad: false,
  async getPosts(userId: number) {
    set({ loading: true });
    try {
      const response = await axios.get<IPost[]>(
        API_URL + "posts?userId=" + userId
      );
      if (response.status !== 200) throw new Error();
      set({ posts: response.data });
    } catch {
      await showError("Failed to get posts");
    } finally {
      set({ loading: false });
    }
  },
  async showPost(id: number) {
    set({ postLoad: true });
    try {
      const response = await axios.get<IPost>(API_URL + "posts/" + id);
      if (response.status !== 200) throw new Error();
      set({ selectedPost: response.data });
    } catch {
      await showError("Failed to show user");
    } finally {
      set({ postLoad: false });
    }
  },
  async addPost(userId: number, form: PostForm) {
    set({ formLoad: true });
    try {
      const response = await axios.post<IPost>(
        API_URL + "posts?userId=" + userId,
        form
      );
      if (response.status !== 201) throw new Error();
      (document.getElementById("postForm") as ModalType)?.close();
      set((state) => ({ posts: [response.data, ...state.posts] }));
      await showMessage("New post has been added!");
    } catch {
      await showError("Failed to add post");
    } finally {
      set({ formLoad: false });
    }
  },
  async updatePost(id: number, form: PostForm) {
    set({ formLoad: true });
    try {
      const response = await axios.patch<IPost>(API_URL + "posts/" + id, form);
      if (response.status !== 200) throw new Error();
      (document.getElementById("postForm") as ModalType)?.close();
      set((state) => {
        const posts = state.posts;
        const dataIndex = posts.findIndex((postItem) => postItem.id === id);
        if (dataIndex >= 0) {
          posts[dataIndex] = response.data;
        }
        return { posts };
      });
      await showMessage("Post has been updated!");
    } catch {
      await showError("Failed to update post");
    } finally {
      set({ formLoad: false });
    }
  },
  async deletePost(id: number) {
    set({ loading: true });
    try {
      const response = await axios.delete<IPost>(API_URL + "posts/" + id);
      if (response.status !== 200) throw new Error();
      set((state) => {
        const posts = state.posts;
        const dataIndex = posts.findIndex((postItem) => postItem.id === id);
        if (dataIndex >= 0) {
          posts.splice(dataIndex, 1);
        }
        return { posts };
      });
      await showMessage("Post has been deleted!");
    } catch {
      await showError("Failed to delete post");
    } finally {
      set({ loading: false });
    }
  },
}));

export default usePostStore;
