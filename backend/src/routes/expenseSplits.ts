import { Router, Request, Response } from 'express';
import { supabase } from '../supabase';

const router = Router();

// Add an expense to a trip
router.post('trips/expense/expense-splits', async (req: Request, res: Response) => {
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
router.get('/trips/expense-splits/:id', async (req: Request, res: Response) => {
    const { expenseId } = req.params;

    const { data, error } = await supabase.from('expenses').select('*').eq('expense_id', expenseId);

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

// Update a person has paid
router.get('/trips/expense-splits/:expenseId/paid/:userId', async (req: Request, res: Response) => {
    const { expenseId, userId } = req.params;

    const { data, error } = await supabase.from('expenses').update({paid_status : true}).eq("expense_id", expenseId)
    .eq("user_id", userId)

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

// Update the amount owed
router.get('/trips/expense-splits/:expenseId/update/:userId', async (req: Request, res: Response) => {
    const { expenseId, userId } = req.params;
    const { amountOwed } = req.body;

    const { data, error } = await supabase.from('expenses').update({ amount_owed: amountOwed }).eq("expense_id", expenseId).eq("user_id", userId)
    .eq("user_id", userId)

    if (error) {
        res.status(400).json({ error: error.message });
        return
    }

    res.status(200).json(data);
});

export default router;
