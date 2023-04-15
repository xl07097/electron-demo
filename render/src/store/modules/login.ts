import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post } from "@/http/http";
import { storage } from "@/utils/storage";

import type { ILogin, IResData } from "@/interface/login";

export const postLogIn = createAsyncThunk(
  "login/postLogIn",
  async (
    { name, password }: ILogin,
    { dispatch, rejectWithValue, fulfillWithValue }
  ) => {
    const { code, data, msg }: IResData = await post("/login", {
      name,
      password,
    });
    if (code === 200) {
      return fulfillWithValue(data);
    }
    return rejectWithValue(msg);
  }
);

const token = storage.getItem("token");
const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: storage.getItem("user") || {},
    token: token,
    accessToken: storage.getItem("accessToken"),
    loading: false,
    success: false,
    loginOut: !token,
  },
  reducers: {
    userInfo(state, { payload }) {
      state.user = payload;
    },
    modifyLoginState(state) {
      state.loginOut = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postLogIn.fulfilled, (state, { payload }) => {
      storage.setItem("user", payload.user);
      storage.setItem("token", payload.token);
      storage.setItem("accessToken", payload.accessToken);
      state.user = payload.user;
      state.token = payload.token;
      state.loginOut = false;
      state.accessToken = payload.accessToken;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(postLogIn.rejected, (state) => {
      state.loading = false;
    });
  },
  // extraReducers: {
  //   [postLogIn.pending.type]: (state) => {
  //     state.loading = true;
  //     state.error = false;
  //   },
  //   [postLogIn.fulfilled.type]: (state) => {
  //     state.loading = false;
  //     state.error = false;
  //   },
  //   [postLogIn.rejected.type]: (state) => {
  //     state.loading = false;
  //     state.error = true;
  //   }
  // }
});

export default loginSlice.reducer;

export const { userInfo, modifyLoginState } = loginSlice.actions;
