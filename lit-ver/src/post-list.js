import { LitElement, html, css } from "lit";
import "./posts-element"; 

export class PostList extends LitElement {
    static properties = {
        postList: { type: Array }
    };

    static styles = css`
        .content { padding: 0 1rem 1rem; }
        .content > header { border-bottom: 1px solid lightgray; display: flex; align-items: flex-end; }
        .content > header h1 { flex: auto; margin: 1rem 0 0.25rem 0; }
        h1 { font-family: serif; color: #377ba8; margin: 1rem 0; }
        a { color: #377ba8; }
    `;

    constructor() {
        super();
        this.postList = [
            {
                "id": 1,
                "title": "First Post",
                "body": "This is the body of the first post.",
                "author": "admin",
                "created_at": "2024-01-01T12:00:00Z"
            },
            {
                "id": 2,
                "title": "Lit is Great",
                "body": "Looping through arrays in Lit is very efficient.",
                "author": "user123",
                "created_at": "2024-01-02T15:30:00Z"
            }
        ];
    }

    render() {
        return html`
        <section class="content">
            <header>
                <h1>Posts</h1>
                <a class="action" href="/new-post">New</a>
            </header>
            
            ${this.postList.map(post => html`
                <posts-element .post=${post}></posts-element>
            `)}
        </section>
        `;
    }
}

customElements.define("post-list", PostList);