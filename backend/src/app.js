const express = require('express');
const cors = require('cors');
const app = express();
const { swaggerUi, swaggerSpec } = require('./swagger');

// Configurar CORS
const allowedOrigins = ['https://task-manager-j26.netlify.app'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // permite Swagger UI, Postman
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'El CORS no está permitido para este origen.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS']
}));

// Preflight requests
app.options('*', cors());

app.use(express.json());

// Prefijo /api para tus rutas
const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);

// Swagger UI en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Error interno del servidor'
        }
    });
});

module.exports = app;
