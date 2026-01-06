import { LitElement, html, css } from 'lit';

export class PostElement extends LitElement {
  static properties = {
    post: { type: Object }
  };

  static styles = css`
        .content { padding: 0 1rem 1rem; }
        .content > header { border-bottom: 1px solid lightgray; display: flex; align-items: flex-end; }
        .content > header h1 { flex: auto; margin: 1rem 0 0.25rem 0; }
        h1 { font-family: serif; color: #377ba8; margin: 1rem 0; }
        a { color: #377ba8; }
        .post > header { display: flex; align-items: flex-end; font-size: 0.85em; }
        .post > header > div:first-of-type { flex: auto; }
        .post > header h1 { font-size: 1.5em; margin-bottom: 0; }
        .post .about { color: slategray; font-style: italic; }
        .post .body { white-space: pre-line; }
  `;

  render() {
    if (!this.post) return html``; 

    return html`
      <article class="post">
        <header>
          <div>
          <h1>${this.post.title}</h1>
          <div class="about">
            by ${this.post.author} on ${new Date(this.post.created_at).toLocaleDateString()}
          </div>
          </div>
          <a class="action" href="edit.html?id=${this.post.id}">Edit</a>
        </header>
        <div class="body">${this.post.body}</div>
      </article>
    `;
  }
}

customElements.define('posts-element', PostElement);