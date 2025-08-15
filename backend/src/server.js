const express = require('express');
const cors = require('cors');

const app = express();

// Configurar CORS para permitir tu dominio de Netlify
app.use(cors({
  origin: 'https://task-manager-j26.netlify.app', // tu frontend en producción
  credentials: true
}));

// O si quieres permitir todos los orígenes (menos seguro):
// app.use(cors());

app.use(express.json());

// Resto de tu configuración...
