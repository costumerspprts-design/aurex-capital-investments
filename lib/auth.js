import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = 'your-secret-key-change-this-in-prod'; // In a real app, use env var

export function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (e) {
        return null;
    }
}

export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;
    return verifyToken(token);
}
