const { Router } = require('express');
const { getAllTareas, getTarea, createTarea, deleteTarea, updateTarea } = require('../controllers/tasks.controller')

const router = Router();

router.get("/tasks", getAllTareas);

router.get("/tasks/:id", getTarea);

router.post("/tasks", createTarea);

router.delete("/tasks/:id", deleteTarea);

router.put("/tasks/:id", updateTarea);

module.exports = router;