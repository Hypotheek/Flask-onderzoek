const API_URL = 'http://localhost:3000/posts';

export async function getPostById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Post not found');
        return await response.json();
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}

export async function updatePost(id, postData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT', // PUT replaces the entire object
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });
        
        if (!response.ok) throw new Error('Failed to update post');
        return await response.json();
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
}

export async function deletePost(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete post');
        return true;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
}

export async function createPost(postData) {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });
        if (!response.ok) throw new Error('Failed to create post');
        return await response.json();
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}

export async function getAllPosts() {
    try {
        const response = await fetch(`${API_URL}`);
        if (!response.ok) throw new Error('Failed to fetch posts');
        return await response.json();
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}