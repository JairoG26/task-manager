const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API para gestionar tareas',
    },
    servers: [
      { url: '/' }
    ],
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Buy milk' },
            description: { type: 'string', example: 'Go to the supermarket' },
            status: { type: 'string', enum: ['pendiente', 'en_progreso', 'completada'] },
            priority: { type: 'integer', example: 2 },
            due_date: { type: 'string', format: 'date-time', example: '2025-08-20T12:00:00Z' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        },
        TaskCreate: {
          type: 'object',
          required: ['title'],
          properties: {
            title: { type: 'string', example: 'Buy milk' },
            description: { type: 'string', example: 'Go to the supermarket' },
            status: { type: 'string', enum: ['pendiente', 'en_progreso', 'completada'], default: 'pendiente' },
            priority: { type: 'integer', example: 2, default: 2 },
            due_date: { type: 'string', format: 'date-time', example: '2025-08-20T12:00:00Z' }
      }
    }
      }
    },



  },
  apis: [path.join(__dirname, 'routes/*.js')], // Puedes documentar tus rutas con comentarios JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };