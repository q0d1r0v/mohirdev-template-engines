const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");

const router = Router();

let tasks = [
  {
    id: 1,
    title: "Code",
    description: "Code yozish kerak",
    status: "bajarilmoqda",
  },
  {
    id: 2,
    title: "Code 2",
    description: "Code yozish kerak 2",
    status: "kutulmoqda",
  },
  {
    id: 3,
    title: "Code 3",
    description: "Code yozish kerak 3",
    status: "yakunlandi",
  },
];

router.get("/", (req, res) => {
  res.render("index", { tasks });
});

router.get("/new", (req, res) => {
  res.render("add-new-task");
});

router.get("/:id/edit", (req, res) => {
  let task;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == req.params.id) {
      task = tasks[i];
    }
  }
  res.render("update-task", { task });
});

router.post("/", (req, res) => {
  const { form } = req.body;
  form.id = uuidv4();
  tasks.push(form);
  res.send(form);
});

router.post("/:id/update", (req, res) => {
  const { form } = req.body;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == form.id) {
      tasks[i] = form;
    }
  }
  res.send(form);
});

router.delete("/:id/delete", (req, res) => {
  const n_tasks = [];
  const id = req.params.id;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id != id) {
      n_tasks.push(tasks[i]);
    }
  }
  tasks = n_tasks;

  res.send({
    message: "Task muvaffaqiyatli o'chirildi!",
  });
});

module.exports = router;
