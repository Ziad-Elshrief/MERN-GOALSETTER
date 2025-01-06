import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";
import { Form, Button } from "react-bootstrap";
import FormContainer from "./FormContainer";

export default function GoalForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createGoal({ text }));
    setText("");
  };
  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="text">
          <Form.Label>Goal</Form.Label>
          <Form.Control
            type="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Add Goal
        </Button>
      </Form>
    </FormContainer>
  );
}
