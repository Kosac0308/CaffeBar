document.addEventListener('DOMContentLoaded', () => {
    // yearr in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // open closed status
    const openBadge = document.getElementById('openStatus');
    let lastIsOpen = true;

    function checkOpenStatus(now = new Date()) {
        const totalMinutes = now.getHours() * 60 + now.getMinutes();
        lastIsOpen = totalMinutes >= 8 * 60 || totalMinutes <= 3 * 60;
        renderOpenStatus();
    }
    function renderOpenStatus() {
        openBadge.textContent = lastIsOpen ? t('status.open') : t('status.closed');
        openBadge.classList.toggle('bg-success', lastIsOpen);
        openBadge.classList.toggle('bg-danger', !lastIsOpen);
    }
    checkOpenStatus();
    setInterval(() => checkOpenStatus(new Date()), 60 * 1000);

    //menu filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterMenu(btn.dataset.filter);
    }));

    function filterMenu(type) {
        document.querySelectorAll('.menu-item').forEach(it => {
            if (type === 'all' || it.dataset.type === type) {
                it.style.display = '';
                it.classList.add('animate__animated', 'animate__fadeIn');
            } else {
                it.style.display = 'none';
            }
        });
    }
    filterMenu('all');

    //ingredients modal)
    const ingredientsModal = new bootstrap.Modal(document.getElementById('ingredientsModal'));
    document.querySelectorAll('.view-ingredient').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.key;
            document.getElementById('ingredientTitle').textContent = t(`m.${key}.title`);
            document.getElementById('ingredientBody').textContent = t(`m.${key}.ing`);
            ingredientsModal.show();
        });
    });

    // 5) Gallery lightbox
    const lightboxModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', () => {
            document.getElementById('lightboxImg').src = img.dataset.full || img.src;
            lightboxModal.show();
        });
    });

    //reservation form and localStorage
    const reservationForm = document.getElementById('reservationForm');
    const resMsg = document.getElementById('resMsg');

    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('resName').value.trim();
        const phone = document.getElementById('resPhone').value.trim();
        const datetime = document.getElementById('resDatetime').value;
        const guests = document.getElementById('resGuests').value;

        if (!name || !phone || !datetime) {
            alert(t('res.invalid'));
            return;
        }

        const reservation = { name, phone, datetime, guests, created: new Date().toISOString() };
        const existing = JSON.parse(localStorage.getItem('reservations') || '[]');
        existing.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(existing));

        resMsg.classList.remove('visually-hidden');
        resMsg.textContent = t('res.saved');
        reservationForm.reset();

        setTimeout(() => { resMsg.classList.add('visually-hidden'); }, 5000);
    });

    // reserve buttons scroll to the form
    ['reserveBtnTop', 'heroReserve'].forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener('click', () => {
            document.getElementById('resName').focus();
            document.getElementById('reservation').scrollIntoView({ behavior: 'smooth' });
        });
        el.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.target.click(); });
    });

    // next event time
    const nextEventTime = document.getElementById('nextEventTime');
    function updateNextEvent() {
        const now = new Date();
        const targetWeekday = 5; // Friday
        const daysUntil = (targetWeekday + 7 - now.getDay()) % 7 || 7;
        const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntil, 22, 0, 0);
        const locale = LOCALES[currentLang];
        nextEventTime.textContent =
            `${t('events.next')} — ${next.toLocaleDateString(locale)} ${t('events.at')} ` +
            next.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    }
    updateNextEvent();

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const targetId = a.getAttribute('href').slice(1);
            if (!targetId) return;
            const el = document.getElementById(targetId);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    document.getElementById('lightboxModal').addEventListener('shown.bs.modal', () => {
        document.getElementById('lightboxImg').focus();
    });

    // re render dynamic texts when the language changes
    document.addEventListener('langchange', () => {
        renderOpenStatus();
        updateNextEvent();
    });
});