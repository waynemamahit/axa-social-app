import axios from "axios";
import { create } from "zustand";
import { IUser } from "../interfaces/User";
import { API_URL } from "../utils/env";
import { showError } from "../utils/message";

export interface UserState {
  users: IUser[];
  loading: boolean;
  selectedUser: IUser | null;
  userLoad: boolean;
  showUser: (id: number) => void;
  getUsers: () => void;
}

const useUserStore = create<UserState>()((set) => ({
  users: [],
  loading: false,
  selectedUser: null,
  userLoad: false,
  async getUsers() {
    set({ loading: true });
    try {
      const response = await axios.get<IUser[]>(API_URL + "users");
      if (response.status !== 200) throw new Error();
      set({
        users: response.data,
      });
    } catch {
      await showError("Failed to get users");
    } finally {
      set({ loading: false });
    }
  },
  async showUser(id: number) {
    set({ userLoad: true });
    try {
      const response = await axios.get<IUser>(API_URL + "users/" + id);
      if (response.status !== 200) throw new Error();
      set({ selectedUser: response.data });
    } catch {
      await showError("Failed to show user");
    } finally {
      set({ userLoad: false });
    }
  },
}));

export default useUserStore;
