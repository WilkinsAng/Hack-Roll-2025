import { Router, Request, Response } from 'express';
import { supabase } from '../supabase';

const router = Router();

// Add an expense to a trip
router.post('/expense-splits', async (req: Request, res: Response) => {
    const { expense_id, user_id, amount_owed, paid_status } = req.body;

    const { data, error } = await supabase.from('expense_splits').insert([
        { expense_id, user_id, amount_owed, paid_status }
    ]);

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

// Get expense splits for an expense on a trip
router.get('/expense-splits', async (req: Request, res: Response) => {
    const { expenseId } = req.body;

    const { data, error } = await supabase.from('expenses').select('*').eq('id', expenseId);

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

// Update a person has paid
router.patch('/expense-splits', async (req: Request, res: Response) => {
    const { expenseId, userId } = req.body;

    const { data, error } = await supabase.from('expenses').update({paid_status : true}).eq("id", expenseId)
    .eq("user_id", userId)

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

// Update the amount owed
router.patch('/expense-splits', async (req: Request, res: Response) => {
    const { expenseId, userId, amountOwed } = req.body;

    const { data, error } = await supabase.from('expenses').update({ amount_owed: amountOwed }).eq("id", expenseId)
    .eq("user_id", userId)

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

// Delete a specific expense split
router.delete('/expense-splits', async (req : Request, res : Response) => {
    const { id } = req.body;
    const {data, error} = await supabase.from('expense_splits').delete().eq('id', id);

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
})

export default router;
