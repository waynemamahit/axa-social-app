import axios from "axios";
import { create } from "zustand";
import { IPost } from "../interfaces/Post";
import { API_URL } from "../utils/env";
import { showError } from "../utils/message";
import { PostForm } from "../models/Post";

export interface PostState {
  posts: IPost[];
  loading: boolean;
  getPosts: (userId: number) => void;
}

const usePostStore = create<PostState>()((set) => ({
  posts: [],
  loading: false,
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
  async addPost(form: PostForm) {
    set({ loading: true });
    try {
      const response = await axios.post<IPost>(API_URL + "posts", form);
      if (response.status !== 200) throw new Error();
      set((state) => ({ posts: [...state.posts, response.data] }));
    } catch {
      await showError("Failed to add post");
    } finally {
      set({ loading: false });
    }
  },
  async updatePost(id: number, form: PostForm) {
    set({ loading: true });
    try {
      const response = await axios.patch<IPost>(API_URL + "posts/" + id, form);
      if (response.status !== 200) throw new Error();
      set((state) => {
        const posts = state.posts;
        const dataIndex = posts.findIndex((postItem) => postItem.id === id);
        if (dataIndex >= 0) {
          posts[dataIndex] = response.data;
        }
        return { posts };
      });
    } catch {
      await showError("Failed to update post");
    } finally {
      set({ loading: false });
    }
  },
}));

export default usePostStore;
