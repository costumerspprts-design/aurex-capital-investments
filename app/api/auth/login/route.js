import { NextResponse } from 'next/server';
import { authenticateUser, getUserByEmail, getUsers } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const body = await request.json();
        const { identifier, password } = body; // identifier can be email or username

        if (!identifier || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        // Find user by email or username
        const users = await getUsers();
        const user = users.find(u => u.email === identifier || u.username === identifier);

        if (!user) {
             return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const { password: _, ...userWithoutPassword } = user;
        const token = signToken({ id: user.id, email: user.email, role: user.role });

        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 // 1 day
        });

        return NextResponse.json({ user: userWithoutPassword });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
