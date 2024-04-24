import axios from "axios";
import { create } from "zustand";
import { IPhoto } from "../interfaces/Photo";
import { API_URL } from "../utils/env";
import { showError } from "../utils/message";

export interface PhotoStore {
  photos: IPhoto[];
  loading: boolean;
  getPhotos: (albumId: number) => void;
}

const useCommentStore = create<PhotoStore>()((set) => ({
  photos: [],
  loading: false,
  async getPhotos(albumId: number) {
    set({ loading: true });
    try {
      const response = await axios.get<IPhoto[]>(
        API_URL + "photos?albumId=" + albumId
      );
      if (response.status !== 200) throw new Error();
      set({ photos: response.data });
    } catch {
      await showError("Failed to get photos");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCommentStore;
