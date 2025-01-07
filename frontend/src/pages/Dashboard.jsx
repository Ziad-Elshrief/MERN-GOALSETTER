import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import Loader from "../components/Loader";
import GoalItem from "../components/GoalItem";
import { useGetGoalsMutation } from "../slices/goalsApiSlice";
import { Button } from "react-bootstrap";
import { setGoals } from "../slices/goalsSlice";
import { useState } from "react";

export default function Dashboard() {
  const dispatch = useDispatch();
  let { goals } = useSelector((state) => state.goals);
  const { userInfo } = useSelector((state) => state.auth);
  const [getGoals, { isLoading }] = useGetGoalsMutation();
  const [requstedGoals, setRequestedGoals] = useState(false);

  const getGoalsHandler = async () => {
    const res = await getGoals();
    dispatch(setGoals(res));
    setRequestedGoals(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className="text-center heading">
            <h1>Welcome {userInfo && userInfo.name}</h1>
            <p>Goals Dashboard</p>
            <Button variant="dark" onClick={getGoalsHandler}>
              Get Goals
            </Button>
          </section>
          <GoalForm />
          {requstedGoals && (
            <section className="my-3 content">
              {goals.length > 0 ? (
                <div className="goals">
                  {goals.map((goal) => (
                    <GoalItem key={goal._id} goal={goal} />
                  ))}
                </div>
              ) : (
                <h3 className="text-center">You have not set any goals</h3>
              )}
            </section>
          )}
        </>
      )}
    </>
  );
}
