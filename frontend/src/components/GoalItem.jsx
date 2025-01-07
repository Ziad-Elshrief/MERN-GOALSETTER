import { useDispatch } from "react-redux";
import { useDeleteGoalMutation } from "../slices/goalsApiSlice";
import { removeGoal } from "../slices/goalsSlice";
import { Card } from "react-bootstrap";

export default function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const [deleteGoal] = useDeleteGoalMutation();
  const deleteGoalHandler = async () => {
    await deleteGoal(goal._id);
    dispatch(removeGoal(goal._id));
  };
  return (
    <Card className="p-2 goal">
      <div className="">{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      <button className="close" onClick={deleteGoalHandler}>
        X
      </button>
    </Card>
  );
}
