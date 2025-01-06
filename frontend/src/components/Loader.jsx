import { Spinner } from "react-bootstrap";

export default function Loader() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        margin: "40px auto 0",
        display: "block",
        width: "300px",
        height: "300px",
      }}
    ></Spinner>
  );
}
