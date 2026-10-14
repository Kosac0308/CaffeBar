const ADMIN_PASS = 'admin';   // PASSWORD MUST BE ADMIN!

// if already loged in go to tables
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
    sessionStorage.setItem('admin_user', name);
    location.href = 'tables.html';
});