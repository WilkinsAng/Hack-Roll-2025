import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import tripsRoutes from './routes/trips';
import expensesRoutes from './routes/expenses';
import expenseSplitsRoutes from './routes/expenseSplits';
import userRoutes from './routes/users';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', tripsRoutes);
app.use('/api', expensesRoutes);
app.use('/api', userRoutes);
app.use('/api', expenseSplitsRoutes)

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
