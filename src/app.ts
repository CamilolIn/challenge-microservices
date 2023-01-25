import express from 'express';
import { errorMiddleware } from './middlewares/errors.middleware';
import apiRoutes from './routers/app.routers';

const app = express();

// App middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', apiRoutes);

// Error Middleware
app.use(errorMiddleware);

export default app;
