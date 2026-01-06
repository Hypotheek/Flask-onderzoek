import { LitElement, html, css } from "lit";

export class NewPost extends LitElement {
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

    render() {
        return html`
        <section class="content">
            <header>
                <h1>New Post</h1>
            </header>
            <form method="post">
                <label for="title">Title</label>
                <input name="title" id="title" required>
                <label for="body">Body</label>
                <textarea name="body" id="body" required></textarea>
                <input type="submit" value="Create">
            </form>
        </section>
        `;
    }
}

customElements.define("new-post", NewPost);