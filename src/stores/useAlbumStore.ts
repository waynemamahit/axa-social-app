import axios from "axios";
import { create } from "zustand";
import { IAlbum } from "../interfaces/Photo";
import { API_URL } from "../utils/env";
import { showError } from "../utils/message";

export interface AlbumState {
  albums: IAlbum[];
  loading: boolean;
  getAlbums: (userId: number) => void;
}

const usePostStore = create<AlbumState>()((set) => ({
  albums: [],
  loading: false,
  async getAlbums(userId: number) {
    set({ loading: true });
    try {
      const response = await axios.get<IAlbum[]>(
        API_URL + "albums?userId=" + userId
      );
      if (response.status !== 200) throw new Error();
      set({ albums: response.data });
    } catch (error) {
      await showError("Failed to get albums")
    } finally {
      set({ loading: false });
    }
  },
}));

export default usePostStore;
