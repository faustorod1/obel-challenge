import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Obel Challenge API corriendo en http://localhost:${PORT}`);
  console.log(`Documentación en http://localhost:${PORT}/docs`);
});