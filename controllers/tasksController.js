import * as model from '../models/tasksModel.js';

export const listTasks = (req, res) => {
  res.json(model.getAllTasks());
};

export const createTask = (req, res) => {
  const { id, title, description, priority} = req.body;

  if (!id || !title || !description || typeof priority !== 'number') {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  const task = { id, title, description, priority, completed: false};
  const success = model.addTask(task);

  if (!success) {
    return res.status(400).json({ error: 'ID duplicado' });
  }

  res.status(201).json(task);
};

export const updateTask = (req, res) => {
  const id = Number(req.params.id);
  const { completed } = req.body;

  const updated = model.updateTask(id, { completed });

  if (!updated) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  res.json(updated);
};

export const deleteTask = (req, res) => {
  const id = Number(req.params.id);
  const deleted = model.deleteTask(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  res.status(200).json({ message: 'Tarea eliminada' });
};

export const getTasksByPriority = (req, res) => {
  const level = Number(req.params.level);

  if (level < 1 || level > 5) {
    return res.status(400).json({ error: 'Nivel de prioridad fuera de rango' });
  }

  const filteredTasks = model.getAllTasks().filter(task => task.priority === level);

  if (filteredTasks.length === 0) {
    return res.status(404).json({ message: `No hay tareas con prioridad ${level}` });
  }

  res.json(filteredTasks);
};