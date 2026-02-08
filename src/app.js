import 'dotenv/config';
import express from 'express';
import roleRoutes from './routes/roleRoutes.js';
import userRoutes from './routes/userRoutes.js';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { authMiddleware } from './middlewares/auth.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: '10kb' }));

app.use(express.static(path.join(__dirname, '../public')));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      message: "El cuerpo de la petición no es un JSON válido. Revisá comas o palabras mal escritas." 
    });
  }
  next();
});

app.use('/api/roles', authMiddleware, roleRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
  res.send(`
    <div style="text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 50px; background-color: #f4f7f6; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div style="max-width: 500px; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-top: 10px solid #2e7d32;">
        <img src="/images/obel_logo.jpg" alt="Obel Logo" style="max-width: 180px; margin-bottom: 25px;">
        <h1 style="color: #1a1a1a; margin: 0 0 10px 0;">Obel Challenge API</h1>
        <p style="color: #555; font-size: 1.1em; line-height: 1.6;">
          Motor de gestión de roles y usuarios con integridad referencial.
        </p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
        <a href="/docs" style="
          display: inline-block;
          padding: 14px 30px;
          background-color: #000;
          color: #fff;
          text-decoration: none;
          border-radius: 10px;
          font-weight: bold;
          font-size: 1em;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        ">Ir a la Documentación (Swagger)</a>
        <p style="margin-top: 25px; font-size: 0.85em; color: #999;">Fausto Rodríguez</p>
      </div>
    </div>
  `);
});

export default app;