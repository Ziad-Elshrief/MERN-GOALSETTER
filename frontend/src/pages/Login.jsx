import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <FormContainer>
            <section className="mx-auto text-center heading">
              <h1>
                <FaSignInAlt /> Login
              </h1>
              <p>Login and start!</p>
            </section>
            <Form onSubmit={submitHandler}>
              <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="my-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={onChange}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-3">
                Sign In
              </Button>
              <Row className="py-3">
                <Col>
                  Do not have an account? <Link to="/register">Create one</Link>
                </Col>
              </Row>
            </Form>
          </FormContainer>
        </>
      )}
    </>
  );
}
