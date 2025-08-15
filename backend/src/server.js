const app = require('./app');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

// Configurar CORS
app.use(cors({
  origin: 'https://task-manager-j26.netlify.app', // tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // si usas cookies o sesiones
}));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});