document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem('user')); 

    const navHTML = `
        <nav>
            <h1><a href="/">Flaskr</a></h1>
            <ul>
                ${user ? `
                    <li><span>${user.username}</span></li>
                    <li><a href="#" id="logoutBtn">Log Out</a></li>
                ` : `
                    <li><a href="/register">Register</a></li>
                    <li><a href="/login">Log In</a></li>
                `}
            </ul>
        </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await fetch('/auth/logout', { method: 'POST' });
            localStorage.removeItem('user');
            window.location.href = '/login';
        });
    }

    window.flash = (message) => {
        const header = document.querySelector('.content > header');
        const flashDiv = document.createElement('div');
        flashDiv.className = 'flash';
        flashDiv.innerText = message;
        if(header) header.after(flashDiv);
    };
});