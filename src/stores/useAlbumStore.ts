import axios from "axios";
import { create } from "zustand";
import { IAlbum } from "../interfaces/Photo";
import { API_URL } from "../utils/env";
import { showError } from "../utils/message";

export interface AlbumState {
  albums: IAlbum[];
  loading: boolean;
  selectedAlbum: IAlbum | null;
  albumLoad: boolean;
  getAlbums: (userId: number) => Promise<void>;
  showAlbum: (id: number) => Promise<void>;
}

const useAlbumStore = create<AlbumState>()((set) => ({
  albums: [],
  loading: false,
  selectedAlbum: null,
  albumLoad: false,
  async getAlbums(userId: number) {
    set({ loading: true });
    try {
      const response = await axios.get<IAlbum[]>(
        API_URL + "albums?userId=" + userId
      );
      if (response.status !== 200) throw new Error();
      set({ albums: response.data });
    } catch (error) {
      await showError("Failed to get albums");
    } finally {
      set({ loading: false });
    }
  },
  async showAlbum(id: number) {
    set({ albumLoad: true });
    try {
      const response = await axios.get<IAlbum>(API_URL + "albums/" + id);
      if (response.status !== 200) throw new Error();
      set({ selectedAlbum: response.data });
    } catch {
      await showError("Failed to show album");
    } finally {
      set({ albumLoad: false });
    }
  },
}));

export default useAlbumStore;
