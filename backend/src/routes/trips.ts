import { Router, Request, Response } from 'express';
import { supabase } from '../supabase';

const router = Router();

// Add a new trip
router.post('/trips', async (req: Request, res: Response) => {
    const { userId, name, startDate, endDate } = req.body;

    const { data, error } = await supabase.from('trips').insert([{  userId, name, startDate, endDate }]);

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

// Get a specific trip
router.get('/trips/:id', async (req: Request, res: Response) => {
    const { tripId } = req.params;

    const { data, error } = await supabase.from('trips').select('*').eq("id", tripId);

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

// Delete a specific trip
router.delete('/trips', async (req : Request, res : Response) => {
    const { id } = req.body;
    const {data, error} = await supabase.from('trips').delete().eq('id', id);

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
})

export default router;
