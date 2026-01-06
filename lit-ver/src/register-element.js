import { LitElement, html, css} from "lit";
import { registerUser } from './auth-service.js';
export class RegisterElement extends LitElement {

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
        this.errorMessage = '';
    }
    
    async _handleRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            await registerUser(username, password);
            alert('Registration successful! Please login.');
            window.location.href = '/login.html';
        } catch (err) {
            this.errorMessage = err.message;
        }
    }

    render() {
        return html`
        <section class="content">
            <header>
                <h1>Register</h1>
            </header>
            
            ${this.errorMessage ? html`<div class="error">${this.errorMessage}</div>` : ''}

            <form @submit="${this._handleRegister}">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required />
                
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required />
                
                <input type="submit" value="Register" />
            </form>
            <p>Already have an account? <a href="/login.html">Login here</a></p>
        </section>
        `;
    }
}

customElements.define("register-element", RegisterElement);