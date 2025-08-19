const express = require('express');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./swagger');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api', taskRoutes);

module.exports = app;