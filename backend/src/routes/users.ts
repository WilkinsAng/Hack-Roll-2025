import { Router, Request, Response } from 'express';
import { supabase } from '../supabase';

const router = Router();

// Add a new user
router.post('/users', async (req: Request, res: Response) => {
    const { id, name, email } = req.body;

    const { data, error } = await supabase.from('users').insert([{ id, name, email }]);

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

// Get a specific user
router.post('/users/', async (req: Request, res: Response) => {
    const { email } = req.body;

    const { data, error } = await supabase.from('users').select('*').eq("email", email);

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

// Get all users
router.get('/users', async (_req: Request, res: Response) => {
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

export default router;
