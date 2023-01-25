import express from 'express';
import apiRoutes from './routers/app.routers';

const app = express();

// App middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', apiRoutes);

export default app;
