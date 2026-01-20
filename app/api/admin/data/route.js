import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getUsers, getTransactions } from '@/lib/db';

export async function GET() {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const users = await getUsers();
    const transactions = await getTransactions();

    // Filter out passwords
    const safeUsers = users.map(u => {
        const { password, ...rest } = u;
        return rest;
    });

    return NextResponse.json({ users: safeUsers, transactions });
}
