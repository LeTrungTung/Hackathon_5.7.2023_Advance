import React, { useEffect, useState } from "react";
import "./index.css";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import axiosClient from "../api/axiosCreate";
const FormInput = () => {
  const [data, setData] = useState({});
  const [tasks, setTasks] = useState([]);

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const fetchData = async () => {
    try {
      const response = await axiosClient.get("api/v1/task");
      console.log(2222, response);
      setTasks(response.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(3333, data);
    try {
      const response = await axiosClient.post("api/v1/task", data);
      setData("");
      fetchData();
      // console.log(2222, response);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };

  return (
    <Container>
      <Form
        id="form-input"
        onSubmit={handleSubmit}
        method="post"
        action="api/v1/task"
      >
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            placeholder="Enter a new task"
            aria-label="task"
            aria-describedby="basic-addon1"
            id="id-task"
            name="content"
            value={data.content}
            onChange={handleOnChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">@</InputGroup.Text>
          <Form.Control
            type="date"
            placeholder="Enter a date"
            aria-label="date"
            name="due_date"
            value={data.due_date}
            aria-describedby="basic-addon2"
            onChange={handleOnChange}
          />
        </InputGroup>

        <Form.Group controlId="formChoose">
          {/* <Form.Label id="lb-select">Choose:</Form.Label> */}
          <Form.Select
            name="status_col"
            value={data.status_col}
            onChange={handleOnChange}
          >
            <option>--Choose--</option>
            <option value="Pending">Pending</option>
            <option value="Fulfill">Fulfill</option>
            <option value="Reject">Reject</option>
          </Form.Select>
        </Form.Group>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">@</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Enter username"
            aria-label="username"
            aria-describedby="basic-addon3"
            name="assigned_to"
            value={data.assigned_to}
            onChange={handleOnChange}
          />
        </InputGroup>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default FormInput;
