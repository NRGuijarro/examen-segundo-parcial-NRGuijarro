import express from 'express';
import tasksRoutes from './routes/tasksRoutes.js';

const app = express();
app.use(express.json());

app.use('/tasks', tasksRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;