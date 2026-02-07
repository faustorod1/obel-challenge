import express from 'express';
import roleRoutes from './routes/roleRoutes.js';
import userRoutes from './routes/userRoutes.js';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger.js';

const app = express();
app.use(express.json());

app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
  res.send('<h1>Obel Challenge API Is Running!</h1><p>Ir a la <a href="/docs">Documentación (Swagger)</a></p>');
});

export default app;