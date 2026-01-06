import { LitElement, html, css } from "lit";
import { getAllPosts } from './post-service.js';
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
        this.postList = [];
    }


    async connectedCallback() {
        super.connectedCallback();
        const response = await getAllPosts();
        this.postList = response;
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