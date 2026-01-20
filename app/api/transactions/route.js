import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { createTransaction, getUserTransactions } from '@/lib/db';

export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const txs = await getUserTransactions(session.id);
    return NextResponse.json(txs);
}

export async function POST(request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        // Validation...

        const tx = await createTransaction({
            userId: session.id,
            username: session.username || body.username, // In case session doesn't have it, but better to fetch user.
            ...body
        });

        return NextResponse.json(tx, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
