import { LitElement, css, html } from 'lit'

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
  render() {
    return html`
      <nav>
        <h1>Javascript (Lit)</h1>
        <ul>
          <li><a href="/register">register</a></li>
          <li><a href="/login">login</a></li>
        </ul>
      </nav>
    `
  }
}
window.customElements.define('nav-element', NavElement)
