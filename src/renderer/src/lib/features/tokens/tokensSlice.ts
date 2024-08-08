// create a token slice

import { createSlice } from "@reduxjs/toolkit";

export interface Tokens {
  tokens: {
    accessToken: string | null;
  };
}

const defaultTokens: Tokens = {
  tokens: {
    accessToken: null,
  },
};

export const tokensSlice = createSlice({
  name: "tokens",
  initialState: defaultTokens,
  reducers: {
    setAccessToken: (state, action) => {
      state.tokens.accessToken = action.payload;
    },
  },
  selectors: {
    getAccessToken: (state) => {
      return state.tokens.accessToken;
    },
  },
});

export const { setAccessToken } = tokensSlice.actions;
export const { getAccessToken } = tokensSlice.selectors;
export default tokensSlice.reducer;
