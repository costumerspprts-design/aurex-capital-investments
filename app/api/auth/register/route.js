import { NextResponse } from 'next/server';
import { createUser, initAdmin } from '@/lib/db';

// Ensure admin exists on first use of DB
initAdmin();

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, email, password } = body;

        if (!username || !email || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const user = await createUser({ username, email, password });
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
