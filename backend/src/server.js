const app = require('./app');
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Run server
app.listen(PORT, () => {
  if (NODE_ENV === 'production') {
    console.log(`🚀 Server running in production on port ${PORT}`);
    console.log(`📖 Swagger Docs available at /api-docs`);
  } else {
    console.log(`🚀 Server running in development: http://localhost:${PORT}`);
    console.log(`📖 Swagger Docs: http://localhost:${PORT}/api-docs`);
  }
});