import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userRole",
  initialState: {
    currentRole: null,
  },
  reducers: {
    addRole: (state, action) => {
      state.currentRole = action.payload;
    },
    removeRole: (state) => {
      state.currentRole = null;
    },
  },
});

export const { addRole, removeRole } =
  userSlice.actions;
export default userSlice.reducer;
