const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const app = express();
const { connectDB } = require('./config/db');

// Load Swagger
const swaggerDocument = YAML.load('./swagger.yaml');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const customerRoutes = require('./routes/customerRoutes');
app.use('/api', customerRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// DB Connection
connectDB();

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});