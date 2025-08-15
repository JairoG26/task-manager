const express = require('express');
const cors = require('cors')
const app = express();
const { swaggerUi, swaggerSpec } = require('./swagger');

app.use(cors());
app.use(express.json());

const taskRoutes = require('./routes/taskRoutes');

app.use('/api', taskRoutes);

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