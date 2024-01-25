import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateType = {
  value: (string | number)[];
};
const initialState: StateType = {
  value: [],
};

export const chooseSlice = createSlice({
  name: "choose",
  initialState,
  reducers: {
    setChoose: (state, action: PayloadAction<(string | number)[]>) => {
      console.log(action.payload);
      state.value = [...action.payload];
    },
  },
});

export const { setChoose } = chooseSlice.actions;
export const chooseSelector = (state: { choose: StateType }) => state.choose;
const chooseReducer = chooseSlice.reducer;
export default chooseReducer;
