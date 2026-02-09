import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3000;

const APP_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`Obel Challenge API corriendo en ${APP_URL}`);
  console.log(`Documentación en ${APP_URL}/docs`);
});