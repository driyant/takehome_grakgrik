import { create } from "zustand";

const useIndexStore = create((set) => ({
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin }),
  profile: {},
  setProfile: (profile) => set({ profile }),
  posts: [],
  setPosts: (posts) => set({ posts }),
}));

export default useIndexStore;
