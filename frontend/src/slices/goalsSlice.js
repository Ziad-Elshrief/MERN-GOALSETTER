import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goals: [],
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    setGoals: (state, action) => {
      state.goals = [...action.payload.data];
    },
    addGoal: (state, action) => {
      state.goals.push(action.payload.data);
    },
    removeGoal: (state, action) => {
      state.goals = state.goals.filter((goal) => goal._id !== action.payload);
    },
  },
});

export const { setGoals, addGoal, removeGoal } = goalsSlice.actions;

export default goalsSlice.reducer;
