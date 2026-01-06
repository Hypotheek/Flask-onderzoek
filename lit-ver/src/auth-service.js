const API_URL = 'http://localhost:3000/users';

export async function registerUser(username, password) {
    try {
        const check = await fetch(`${API_URL}?username=${username}`);
        const existingUsers = await check.json();

        if (existingUsers.length > 0) {
            throw new Error('Username already taken');
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }) 
        });

        if (!response.ok) throw new Error('Registration failed');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function loginUser(username, password) {
    try {
        const response = await fetch(`${API_URL}?username=${username}&password=${password}`);
        const users = await response.json();

        if (users.length === 0) {
            throw new Error('Invalid username or password');
        }

        const user = users[0];
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    } catch (error) {
        throw error;
    }
}

export function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login.html';
}

export function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}