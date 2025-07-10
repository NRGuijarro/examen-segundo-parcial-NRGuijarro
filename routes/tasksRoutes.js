import express from 'express';
import * as controller from '../controllers/tasksController.js';

const router = express.Router();

router.get('/', controller.listTasks);
router.get('/priority/:level', controller.getTasksByPriority);
router.post('/', controller.createTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);


export default router;
