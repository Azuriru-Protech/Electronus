// create a token slice

import { createSlice } from "@reduxjs/toolkit";

export interface User {
  user: {
    username: string;
  } | null;
}

const defaultUser: User = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: defaultUser,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  selectors: {
    getUser: (state) => {
      return state.user;
    },
  },
});

export const { setUser } = userSlice.actions;
export const { getUser } = userSlice.selectors;
export default userSlice.reducer;
