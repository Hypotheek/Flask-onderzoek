import { LitElement, css, html } from 'lit'
import { getCurrentUser, logoutUser } from './auth-service.js';

export class NavElement extends LitElement {
  
  static styles = css`
    nav { background: lightgray; display: flex; align-items: center; padding: 0 0.5rem; }
    nav h1 { flex: auto; margin: 0; }
    nav h1 a { text-decoration: none; padding: 0.25rem 0.5rem; }
    nav ul  { display: flex; list-style: none; margin: 0; padding: 0; }
    nav ul li a, nav ul li span, header .action { display: block; padding: 0.5rem; }
    h1 { font-family: serif; color: #377ba8; margin: 1rem 0; }
    a { color: #377ba8; }
`
  _handleLogout(e) {
    e.preventDefault();
    logoutUser(); 
  }

  render() {
    const user = getCurrentUser();

    return html`
      <nav>
        <h1><a href="/index.html">Javascript (Lit)</a></h1>
        <ul>
          ${user 
            ? html`
                <li><span>${user.username}</span></li>
                <li><a href="#" @click=${this._handleLogout}>Logout</a></li>
              ` 
            : html`
                <li><a href="/register.html">Register</a></li>
                <li><a href="/login.html">Login</a></li>
              `
          }
        </ul>
      </nav>
    `;
  }
}

window.customElements.define('nav-element', NavElement);
