import { Router, Request, Response } from 'express';
import { supabase } from '../supabase';

const router = Router();

// Add an expense to a trip
router.post('/trips/expenses', async (req: Request, res: Response) => {
    const { trip_id, description, amount, paid_by } = req.body;

    const { data, error } = await supabase.from('expenses').insert([
        { trip_id, description, amount, paid_by }
    ]);

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

// Get a specific expense for a trip
router.get('/expenses/:id', async (req: Request, res: Response) => {
    const { expenseId } = req.params;

    const { data, error } = await supabase.from('expenses').select('*').eq('id', expenseId);

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

// Get expenses for a trip
router.get('/expenses', async (req: Request, res: Response) => {
    const { tripId } = req.body;

    const { data, error } = await supabase.from('expenses').select('*').eq('trip_id', tripId);

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

export default router;
