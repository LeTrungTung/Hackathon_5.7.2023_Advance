const sql = require("../db/db.connect");
const modelGetAllTask = (res) => {
  let query = `SELECT * FROM tasks`;
  sql.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err });
      return;
    }
    res.status(200).json(result);
  });
};
const modelGetTaskById = (id, res) => {
  let query = `SELECT * FROM tasks WHERE id=${id}`;

  sql.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err });
      return;
    }
    res.status(200).json(result);
  });
};

const modelPostTask = (newTask, res) => {
  // Kiểm tra task đã tồn tại trong CSDL chưa
  const checkTaskQuery = `SELECT * FROM tasks WHERE content = ?`;
  sql.query(checkTaskQuery, [newTask.content], (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ msg: "Server error" });
      return;
    }
    if (result.length > 0) {
      res.status(400).json({ message: "Task already exists" });
      return;
    }
    // nếu chưa có task thì cho thêm mới
    const insertData = `INSERT INTO tasks SET ?`;
    sql.query(insertData, newTask, (err, result) => {
      if (err) {
        console.log("loi roi");
        res.status(500).json({ msg: "Loi server" });
        return;
      }
      res.status(200).json({ msg: "Thêm mới Task thành công" });
    });
  });
};

const modelDeleteTask = (id, res) => {
  // Kiểm tra id đã tồn tại trong CSDL chưa
  const checkIdTask = `SELECT * FROM tasks WHERE id= ?`;
  sql.query(checkIdTask, [id], (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ msg: "Server error" });
      return;
    }
    if (result.length === 0) {
      res.status(400).json({ message: "Task not found" });
      return;
    }
    // nếu tìm thấy id thì tiến hành xoá dữ liệu trong tasks
    const deleteTask = `DELETE FROM tasks WHERE id = ?;`;
    sql.query(deleteTask, [id], (err, result) => {
      if (err) {
        console.log("loi roi");
        res.status(500).json({ msg: "Loi server" });
        return;
      }
      res.status(200).json({ message: "Task deleted successfully" });
    });
  });
};

const modelEditTask = (id, taskUpdate, res) => {
  let query = `UPDATE tasks SET content=?, due_date=?,status_col=?,assigned_to=? WHERE id=?`;
  const task = [
    taskUpdate.content,
    taskUpdate.due_date,
    taskUpdate.status_col,
    taskUpdate.assigned_to,
    id,
  ];
  console.log(55555, task);
  sql.query(query, task, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err });
      return;
    }
    res.status(200).json({ msg: "Sửa dữ liệu thành công" });
  });
};

module.exports = {
  modelGetAllTask,
  modelGetTaskById,
  modelPostTask,
  modelDeleteTask,
  modelEditTask,
};
