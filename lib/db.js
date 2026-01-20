import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const usersFile = path.join(process.cwd(), 'data/users.json');
const transactionsFile = path.join(process.cwd(), 'data/transactions.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(usersFile))) {
    fs.mkdirSync(path.dirname(usersFile), { recursive: true });
}
if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, '[]');
}
if (!fs.existsSync(transactionsFile)) {
    fs.writeFileSync(transactionsFile, '[]');
}

// Helper to read data
function readData(file) {
    try {
        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Helper to write data
function writeData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// --- Users ---

export async function getUsers() {
    return readData(usersFile);
}

export async function getUserByEmail(email) {
    const users = readData(usersFile);
    return users.find(u => u.email === email);
}

export async function getUserById(id) {
    const users = readData(usersFile);
    return users.find(u => u.id === id);
}

export async function createUser(userData) {
    const users = readData(usersFile);

    // Check if user exists
    if (users.find(u => u.email === userData.email)) {
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = {
        id: uuidv4(),
        ...userData,
        password: hashedPassword,
        balance: 0,
        createdAt: new Date().toISOString(),
        role: 'user', // or 'admin'
        status: 'active'
    };

    users.push(newUser);
    writeData(usersFile, users);

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

export async function updateUser(id, updates) {
    const users = readData(usersFile);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');

    users[index] = { ...users[index], ...updates };
    writeData(usersFile, users);

    const { password, ...userWithoutPassword } = users[index];
    return userWithoutPassword;
}

// --- Transactions ---

export async function getTransactions() {
    return readData(transactionsFile);
}

export async function getUserTransactions(userId) {
    const txs = readData(transactionsFile);
    return txs.filter(t => t.userId === userId);
}

export async function createTransaction(txData) {
    const txs = readData(transactionsFile);

    const newTx = {
        id: uuidv4(),
        date: new Date().toISOString(),
        status: 'pending',
        ...txData
    };

    txs.push(newTx);
    writeData(transactionsFile, txs);
    return newTx;
}

export async function updateTransaction(id, updates) {
    const txs = readData(transactionsFile);
    const index = txs.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Transaction not found');

    txs[index] = { ...txs[index], ...updates };
    writeData(transactionsFile, txs);
    return txs[index];
}

// --- Auth ---

export async function authenticateUser(email, password) {
    const user = await getUserByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

// Initialize Admin if not exists
export async function initAdmin() {
    const users = readData(usersFile);
    const adminEmail = 'admin@aurex.com'; // or use username 'administration'
    // The prompt says default username: administration, password: p@$$word1234
    // I'll handle that in the register flow or here.
    // Let's create a special admin user here.

    const adminUser = users.find(u => u.username === 'administration');
    if (!adminUser) {
        const hashedPassword = await bcrypt.hash('p@$$word1234', 10);
        users.push({
            id: uuidv4(),
            username: 'administration',
            email: 'admin@aurex.com',
            password: hashedPassword,
            role: 'admin',
            balance: 0,
            createdAt: new Date().toISOString(),
            status: 'active'
        });
        writeData(usersFile, users);
        console.log('Admin user initialized');
    }
}
