import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { updateTransaction, getUserById, updateUser } from '@/lib/db';

export async function POST(request) {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const { transactionId } = await request.json();
        const tx = await updateTransaction(transactionId, { status: 'Approved' });

        // If it's a deposit, add to balance
        if (tx.type === 'deposit') {
            const user = await getUserById(tx.userId);
            const newBalance = (user.balance || 0) + parseFloat(tx.amount);
            await updateUser(user.id, { balance: newBalance });
        }

        return NextResponse.json({ success: true, transaction: tx });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
