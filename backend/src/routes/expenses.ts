import { Router, Request, Response } from 'express';
import { supabase } from '../supabase';

const router = Router();

// Add an expense to a trip
router.post('/expenses', async (req: Request, res: Response) => {
    const { trip_id, description, amount, payer, participants } = req.body;

    const { data, error } = await supabase.from('expenses').insert([
        { trip_id, description, amount, payer, participants },
    ]);

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

// Get expenses for a trip
router.get('/trips/:id/expenses', async (req: Request, res: Response) => {
    const { id } = req.params;

    const { data, error } = await supabase.from('expenses').select('*').eq('trip_id', id);

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

export default router;
