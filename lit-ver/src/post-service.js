
const DB_URL = './db.json';

export async function getPostById(id) {
    try {
        const response = await fetch(DB_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch database');
        }
        
        const data = await response.json();
        
        const post = data.posts.find(p => p.id === parseInt(id));
        
        return post;
    } catch (error) {
        console.error("Error loading post:", error);
        return null;
    }
}