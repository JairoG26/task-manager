const express = require('express');
const cors = require('cors');
const app = express();
const { swaggerUi, swaggerSpec } = require('./swagger');

// Lista de orígenes permitidos
const allowedOrigins = ['https://task-manager-j26.netlify.app'];

// Configurar CORS
app.use(cors({
  origin: function(origin, callback){
    // Permitir requests sin origin (Swagger UI, Postman, etc.)
    if(!origin) return callback(null, true);

    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'El CORS no está permitido para este origen.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS']
}));

// Responder OPTIONS para preflight
app.options('*', cors());

app.use(express.json());

const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de manejo centralizado de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Error interno del servidor'
        }
    });
});

module.exports = app;
