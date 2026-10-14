const ADMIN_PASS = 'admin';   // any name is accepted as username, the password must be this

// already logged in? go straight to the tables
if (sessionStorage.getItem('admin_auth') === '1') {
    location.replace('tables.html');
}

const errorBox = document.getElementById('loginError');
function showError(message) {
    errorBox.textContent = message;
    errorBox.classList.remove('d-none');
}

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value;
    const passInput = document.getElementById('password');

    if (!name) {
        showError('Please enter your name.');
        document.getElementById('username').focus();
        return;
    }
    if (pass !== ADMIN_PASS) {
        showError('Wrong password.');
        passInput.value = '';
        passInput.focus();
        return;
    }

    sessionStorage.setItem('admin_auth', '1');
    sessionStorage.setItem('admin_user', name);   // shown as "Waiter: name" on the tables
    location.href = 'tables.html';
});