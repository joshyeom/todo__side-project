const express = require("express");
const { Todo } = require("../models");
const router = express.Router();

// 기본주소: localhost:PORT/

// GET localhost:PORT/todos - show all todos (READ)
router.get("/todos", async (req, res) => {
  // Todo.findAll().then((data) => {
  //   res.send(data);
  // });

  try {
    let data = await Todo.findAll();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// POST localhost:PORT/todo - create a new todo (CREATE)
router.post("/todo", async (req, res) => {
  try {
    let newTodo = await Todo.create({
      title: req.body.title,
    });
    res.send(newTodo);
  } catch (err) {
    res.send(err);
  }
});

// PATCH localhost:PORT/todo/:todoId - edit a specific todo (UPDATE)
router.patch("/todo/:todoId", async (req, res) => {
  try {
    let [editTodo] = await Todo.update(
      {
        title: req.body.title,
        done: req.body.done,
      },
      {
        where: {
          id: req.params.todoId,
        },
      }
    );
    if (!editTodo) {
      return res.send(false);
    }
    res.send(true);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/todo/:todoId", async (req, res) => {
  try {
    let deleteTodo = await Todo.destroy({
      where: { id: req.params.todoId },
    });
    console.log(deleteTodo);
    if (!deleteTodo) {
      return res.send(false);
    }
    return res.send(true);
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
