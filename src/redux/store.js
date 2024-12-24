import { configureStore } from "@reduxjs/toolkit";
import userRole from "./userSlice";

export default configureStore({
  reducer: {
    userRole: userRole,
  },
});
