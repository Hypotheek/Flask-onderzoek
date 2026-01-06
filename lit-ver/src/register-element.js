import { LitElement, html, css} from "lit";

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

  render() {
    return html`
        <section class="content">
            <header>
            <h1>Register</h1>
            </header>
            <form method="post">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required />
                <br />
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <br />
                <input type="submit" value="Register" />
            </form>
        </section>
    `;
  }
}

customElements.define("register-element", RegisterElement);