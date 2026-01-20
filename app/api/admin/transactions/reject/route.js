import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { updateTransaction } from '@/lib/db';

export async function POST(request) {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const { transactionId } = await request.json();
        const tx = await updateTransaction(transactionId, { status: 'Rejected' });
        return NextResponse.json({ success: true, transaction: tx });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
