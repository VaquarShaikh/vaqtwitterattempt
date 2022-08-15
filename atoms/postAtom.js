import { atom } from "recoil";

export const handlePostState = atom({
  key: "handlePostState",
  default: false,
});

export const useSSRPostsState = atom({
  key: "useSSRPostsState",
  default: true,
});
