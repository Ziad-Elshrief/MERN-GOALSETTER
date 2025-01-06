import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { setCredentials } from "../slices/authSlice";
import { useRegisterMutation } from "../slices/usersApiSlice";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

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
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <FormContainer>
          <section className="mx-auto text-center heading">
            <h1>
              <FaUser /> Register
            </h1>
            <p>Please create an account</p>
          </section>
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                placeholder="Enter your name"
                onChange={onChange}
              />
            </Form.Group>
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
            <Form.Group className="my-2" controlId="confrimPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm your password"
                onChange={onChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Sign Up
            </Button>
            <Row className="py-3">
              <Col>
                Already have an account? <Link to="/login">Sign in</Link>
              </Col>
            </Row>
          </Form>
        </FormContainer>
      )}
    </>
  );
}
