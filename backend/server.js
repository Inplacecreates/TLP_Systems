import express from 'express';
import routes from './routes/index.js';
import config, { setupApp } from './config/index.js';
import { setupSwagger } from './swagger/index.js';

const app = express();

// Setup app with middleware
setupApp(app);

// Setup Swagger documentation
setupSwagger(app);

// Routes
app.use('/api', routes);

app.listen(config.app.port, () => {
    console.log(`Server is running on port ${config.app.port} in ${config.app.env} mode`);
    console.log(`
API Documentation is available at:
- Interactive UI: http://localhost:${config.app.port}/api-docs
- Raw JSON: http://localhost:${config.app.port}/api-docs.json
- YAML Format: http://localhost:${config.app.port}/api-docs.yaml
    `);
});