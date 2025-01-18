import { Router, Request, Response } from 'express';
import { supabase } from '../supabase';

const router = Router();

// Add a new trip
router.post('/trips', async (req: Request, res: Response) => {
    const { name } = req.body;

    const { data, error } = await supabase.from('trips').insert([{ name }]);

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

// Get all trips
router.get('/trips', async (_req: Request, res: Response) => {
    const { data, error } = await supabase.from('trips').select('*');

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

export default router;
