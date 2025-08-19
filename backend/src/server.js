const app = require('./app');
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Arrancar servidor
app.listen(PORT, () => {
  if (NODE_ENV === 'production') {
    console.log(`🚀 Servidor corriendo en producción en el puerto ${PORT}`);
    console.log(`📖 Swagger Docs disponibles en /api-docs`);
  } else {
    console.log(`🚀 Servidor corriendo en desarrollo: http://localhost:${PORT}`);
    console.log(`📖 Swagger Docs: http://localhost:${PORT}/api-docs`);
  }
});