import express from 'express';
import routes from './routes/index.js';
import config, { setupApp } from './config/index.js';

const app = express();

// Setup app with middleware
setupApp(app);

// Routes
app.use('/api', routes);

app.listen(config.app.port, () => {
    console.log(`Server is running on port ${config.app.port} in ${config.app.env} mode`);
});