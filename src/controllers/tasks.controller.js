const { json } = require("express");
const pool = require("../db");

const getAllTareas = async (req, res, next) => {
  try {
    const AllTareas = await pool.query("SELECT * FROM tareas");
    res.json(AllTareas.rows);
  } catch (error) {
    next(error);
  }
};

const getTarea = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM tareas WHERE idTarea = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Tarea no encontrada",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createTarea = async (req, res, next) => {
  const { titulo, descripcion } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO tareas (titulo, descripcion) VALUES ($1, $2) RETURNING *",
      [titulo, descripcion]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteTarea = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM tareas WHERE idTarea = $1", [
      id,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Tarea no encontrada",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateTarea = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;

    const result = await pool.query(
      "UPDATE tareas SET titulo = $1, descripcion = $2 WHERE idTarea = $3 RETURNING *",
      [titulo, descripcion, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Tarea no encontrada",
      });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTareas,
  getTarea,
  createTarea,
  deleteTarea,
  updateTarea,
};
