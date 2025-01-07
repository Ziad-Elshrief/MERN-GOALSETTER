import { apiSlice } from "./apiSlice";
import { GOALS_URL } from "../utils/constants";

export const goalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGoals: builder.mutation({
      query: () => ({
        url: `${GOALS_URL}/`,
      }),
    }),
    createGoal: builder.mutation({
      query: (data) => ({
        url: `${GOALS_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    deleteGoal: builder.mutation({
      query: (goalId) => ({
        url: `${GOALS_URL}/${goalId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetGoalsMutation,
  useCreateGoalMutation,
  useDeleteGoalMutation,
} = goalsApiSlice;
