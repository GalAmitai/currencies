import express, { Application, NextFunction, Request, Response } from 'express';
import config from './config/default';
import logger from './services/loggerService';
import cron from 'node-cron';
// Routes
import healthCheckRoute from './routes/health-check';
import requestsRoutes from './routes/requests';
import CoinService from './services/coinService';

const cors = require('cors');
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Getting first data.
CoinService.getLatest();

// Routes
app.use('/health', healthCheckRoute);
app.use('/api', requestsRoutes);

// cron job to update data every X minutes
cron.schedule('* * * * *', () => {
    CoinService.getLatest();
});

app.listen(config.app_settings.port, () => {
    logger.info(`Server running port: ${config.app_settings.port}`)
})