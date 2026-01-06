import { LitElement, html, css } from 'lit';
import { updatePost, deletePost } from './post-service.js';

export class EditPost extends LitElement {
  
  static properties = {
    post: { type: Object }
  };

  static styles = css`
        .content { padding: 0 1rem 1rem; }
        .content > header { border-bottom: 1px solid lightgray; display: flex; align-items: flex-end; }
        .content > header h1 { flex: auto; margin: 1rem 0 0.25rem 0; }
        h1 { font-family: serif; color: #377ba8; margin: 1rem 0; }
        a { color: #377ba8; }
        .content:last-child { margin-bottom: 0; }
        .content form { margin: 1em 0; display: flex; flex-direction: column; }
        .content label { font-weight: bold; margin-bottom: 0.5em; }
        .content input, .content textarea { margin-bottom: 1em; }
        .content textarea { min-height: 12em; resize: vertical; }
        input.danger { color: #cc2f2e; }
        input[type=submit] { align-self: start; min-width: 10em; }
  `;

  constructor() {
    super();
    this.post = { title: '', body: '', id: null };
  }

  async _handleSave(e) {
    e.preventDefault(); 

    const formData = new FormData(e.target);
    const updatedData = {
      ...this.post, 
      title: formData.get('title'),
      body: formData.get('body')
    };

    try {
      await updatePost(this.post.id, updatedData);
      alert('Saved successfully!');
      window.location.href = '/index.html';
    } catch (err) {
      alert('Error saving post');
    }
  }

  async _handleDelete(e) {
    e.preventDefault();
    
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(this.post.id);
        window.location.href = '/index.html';
      } catch (err) {
        alert('Error deleting post');
      }
    }
  }

  render() {
    if (!this.post || !this.post.id) return html`Loading...`;

    return html`
      <section class="content">
        <header>
          <h1>Edit "${this.post.title}"</h1>
        </header>

        <form @submit="${this._handleSave}">
            <label for="title">Title</label>
            <input name="title" id="title" .value="${this.post.title}" required>
            <label for="body">Body</label>
            <textarea name="body" id="body" .value="${this.post.body}"></textarea>
          <input type="submit" value="Save">
        </form>

        <hr>

        <form @submit="${this._handleDelete}">
            <input 
                class="danger" 
                type="submit" 
                value="Delete"
            >
        </form>

      </section>
    `;
  }
}

customElements.define('edit-post', EditPost);