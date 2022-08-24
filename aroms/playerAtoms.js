import { atom } from "recoil";
import { useState } from "react";

export const playState = atom({
  key: "playState",
  default: false,
});
const [play, setPlay] = useState(false);

export const playingTrackState = atom({
  key: "playingTrackState",
  default: "",
});
