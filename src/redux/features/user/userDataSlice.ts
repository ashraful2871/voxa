import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 
// Your user data interface
export interface UserData {
  id: string;
  name: string;
  email: string;
  role?: "ADMIN" | string;
  image?: string;
  isVerified?: boolean;
  status?: "ACTIVE" | "INACTIVE" | "PENDING" | string;
 
}
 
interface InitialState {
  userData: UserData | object;
}
 
const initialState: InitialState = {
  userData: {},
};
 
const userDataCatach = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
  },
});
 
export const { setUserData } = userDataCatach.actions;
 
export default userDataCatach.reducer;