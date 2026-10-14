const Cookies = {
    set(name, value, days = 365) {
        const d = new Date();
        d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${d.toUTCString()}; path=/; SameSite=Lax` +
            (location.protocol === 'https:' ? '; Secure' : '');
    },
    get(name) {
        const match = document.cookie.split('; ').find(row => row.startsWith(name + '='));
        return match ? decodeURIComponent(match.split('=')[1]) : null;
    },
    remove(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
    }
};

// Consent value: 'all' | 'necessary' | null (not decided yet)
const Consent = {
    KEY: 'cookie_consent',
    get() { return Cookies.get(this.KEY); },
    set(value) {
        Cookies.set(this.KEY, value, 180);
        document.dispatchEvent(new CustomEvent('consentchange', { detail: value }));
    },
    allowsPreferences() { return this.get() === 'all'; }
};

document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookieBanner');
    const show = () => banner.classList.add('show');
    const hide = () => banner.classList.remove('show');

    if (!Consent.get()) show();

    document.getElementById('cookieAccept').addEventListener('click', () => {
        Consent.set('all');
        hide();
    });
    document.getElementById('cookieDecline').addEventListener('click', () => {
        Consent.set('necessary');
        hide();
    });
    document.getElementById('cookieSettings').addEventListener('click', (e) => {
        e.preventDefault();
        show();
    });
});