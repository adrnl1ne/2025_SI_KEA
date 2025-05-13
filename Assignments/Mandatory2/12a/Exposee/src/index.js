const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Import your swagger configuration
const webhookRoutes = require('./routes/webhook');
const webhookService = require('./services/webhook-service');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Swagger documentation - keep original path for backward compatibility
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Redirect root to Swagger UI
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Routes
app.use('/webhooks', webhookRoutes);

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Send a test ping to all registered webhooks
 *     tags: [Webhooks]
 *     responses:
 *       200:
 *         description: Ping sent successfully
 */
app.get('/ping', async (req, res) => {
  try {
    const results = await webhookService.pingWebhooks();
    res.status(200).json({
      message: 'Ping sent to all registered webhooks',
      results
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Webhook service running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
  console.log(`Root path redirects to Swagger UI`);
});