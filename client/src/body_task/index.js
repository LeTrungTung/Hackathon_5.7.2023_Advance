import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import "./index.css";
import axiosClient from "../api/axiosCreate";

const BodyTask = () => {
  const [tasks, setTasks] = useState([]);
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

  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`api/v1/task/${id}`);
      // Xoá thành công, tiến hành tải lại danh sách blog
      fetchData();
    } catch (error) {
      console.error("Error deleting blog: ", error);
    }
  };

  return (
    <Container id="body-area">
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Content</th>
            <th>Due date</th>
            <th>Status</th>
            <th>Asigned to</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 &&
            tasks.map((task, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task.content}</td>
                <td>{task.due_date}</td>
                <td>{task.status_col}</td>
                <td>{task.assigned_to}</td>
                <td>
                  <Button variant="success">Update</Button> {""}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BodyTask;
