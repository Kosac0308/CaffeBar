// Needs menu-data.js (MENU). Show a clear message if it was not loaded.
if (typeof MENU === 'undefined') {
    document.getElementById('tablesGrid').innerHTML =
        '<div class="alert alert-danger" style="grid-column:1/-1">menu-data.js was not loaded. Check that it is in the same folder as tables.html.</div>';
    throw new Error('menu-data.js not loaded');
}

const STORAGE_KEY = 'nightowl_tables';
const TABLE_COUNT = 9;       // shown as a 3 x 3 grid of equal squares
const ITEM_LANG = 'mk';      // language of item names shown in the list ('mk' or 'en')
const CURRENCY = 'ден';

// name typed on the login page
const currentWaiter = sessionStorage.getItem('admin_user') || 'Waiter';

// ---------- helpers ----------
// lower-case, remove accents, spaces, dashes... so "coca-cola" == "Coca Cola"
const norm = s => s.toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]/gu, '');

const itemName = item => item[ITEM_LANG];
const money = n => `${Math.round(n * 100) / 100} ${CURRENCY}`;

function searchTerms(item) {
    return [item.key, item.mk, item.en, ...(item.aliases || [])].map(norm);
}

// returns { item } or { error }
function findItem(text) {
    const q = norm(text);
    if (!q) return { error: 'Type an item first.' };

    // 1) exact match on any name / alias
    const exact = MENU.find(it => searchTerms(it).includes(q));
    if (exact) return { item: exact };

    // 2) partial match ("marg" -> Margarita)
    const partial = MENU.filter(it => q.length >= 2 && searchTerms(it).some(term => term.startsWith(q) || term.includes(q)));
    if (partial.length === 1) return { item: partial[0] };
    if (partial.length > 1) return { error: `More than one match: ${partial.map(itemName).join(', ')}` };

    return { error: 'Item not found on the menu.' };
}

// ---------- state ----------
function emptyTable(id) {
    return { id, items: {}, paid: false, waiter: null, received: null, tip: 0 };
}

function loadTables() {
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) {}
    return Array.from({ length: TABLE_COUNT }, (_, i) => {
        const id = i + 1;
        const s = saved.find(t => t.id === id);
        if (!s) return emptyTable(id);
        return {
            id,
            items: s.items || {},
            paid: !!s.paid,
            waiter: s.waiter || null,
            received: typeof s.received === 'number' ? s.received : null,
            tip: typeof s.tip === 'number' ? s.tip : 0
        };
    });
}

let tables = loadTables();
let activeId = null;

const saveTables = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(tables));
const getTable = id => tables.find(t => t.id === id);
const isOccupied = t => Object.keys(t.items).length > 0;
const getTotal = t => Object.entries(t.items)
    .reduce((sum, [key, qty]) => sum + (MENU_BY_KEY[key]?.price || 0) * qty, 0);

// bill + tip is what the customer has to pay; change = received - bill - tip
function calcPayment(t) {
    const total = getTotal(t);
    const tip = t.tip || 0;
    const due = total + tip;
    const change = t.received === null ? null : t.received - due;
    return { total, tip, due, change };
}

function resetTable(t) {
    Object.assign(t, emptyTable(t.id));
}

// ---------- elements ----------
const grid = document.getElementById('tablesGrid');
const modalEl = document.getElementById('tableModal');
const modal = new bootstrap.Modal(modalEl);
const modalTitle = document.getElementById('modalTitle');
const waiterName = document.getElementById('waiterName');
const addForm = document.getElementById('addItemForm');
const itemInput = document.getElementById('itemInput');
const qtyInput = document.getElementById('qtyInput');
const itemError = document.getElementById('itemError');
const orderList = document.getElementById('orderList');
const totalPrice = document.getElementById('totalPrice');
const statusBadge = document.getElementById('statusBadge');
const receivedInput = document.getElementById('receivedInput');
const tipInput = document.getElementById('tipInput');
const changeOutput = document.getElementById('changeOutput');
const dueLine = document.getElementById('dueLine');
const payBtn = document.getElementById('payBtn');
const closeTableBtn = document.getElementById('closeTableBtn');

// suggestions for the input (both languages)
document.getElementById('menuList').innerHTML = MENU
    .flatMap(it => (it.mk === it.en ? [it.mk] : [it.mk, it.en]))
    .map(name => `<option value="${name}"></option>`)
    .join('');

// ---------- render: tables ----------
function renderGrid() {
    grid.innerHTML = '';
    tables.forEach(t => {
        const occupied = isOccupied(t);
        const tile = document.createElement('button');
        tile.type = 'button';
        tile.className = `table-tile ${occupied ? 'occupied' : 'free'}`;
        tile.setAttribute('aria-label', `Table ${t.id}`);
        tile.innerHTML = `
            <span class="table-number">${t.id}</span>
            ${occupied ? `
                <span class="table-meta">
                    <span class="table-info">${money(getTotal(t))}</span>
                    <span class="table-paid">${t.paid ? 'Paid' : 'Not paid'}</span>
                </span>` : ''}
        `;
        tile.addEventListener('click', () => openTable(t.id));
        grid.appendChild(tile);
    });
}

// ---------- render: payment box (does not touch the input values) ----------
function renderPayment(t) {
    const occupied = isOccupied(t);
    const { total, tip, due, change } = calcPayment(t);

    receivedInput.disabled = !occupied;
    tipInput.disabled = !occupied;

    dueLine.textContent = occupied
        ? `Bill ${money(total)} + tip ${money(tip)} = ${money(due)} to pay`
        : '';

    changeOutput.classList.remove('text-success', 'text-danger');
    if (!occupied || change === null) {
        changeOutput.value = '';
    } else if (change >= 0) {
        changeOutput.value = money(change);
        changeOutput.classList.add('text-success');
    } else {
        changeOutput.value = `Missing ${money(-change)}`;
        changeOutput.classList.add('text-danger');
    }

    // can't mark as paid while the received amount is not enough
    payBtn.disabled = occupied && change !== null && change < 0;
}

// ---------- render: modal ----------
function renderModal() {
    const t = getTable(activeId);
    const occupied = isOccupied(t);

    modalTitle.textContent = `Table ${t.id}`;
    waiterName.textContent = t.waiter || currentWaiter;

    // ordered items
    orderList.innerHTML = '';
    const entries = Object.entries(t.items);
    if (!entries.length) {
        orderList.innerHTML = '<li class="list-group-item text-muted">No items yet.</li>';
    }
    entries.forEach(([key, qty]) => {
        const item = MENU_BY_KEY[key];
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center gap-2';
        li.innerHTML = `
            <div><strong>${itemName(item)}</strong> <span class="text-muted">x${qty}</span></div>
            <div class="d-flex align-items-center gap-2">
                <span>${money(item.price * qty)}</span>
                <button type="button" class="btn btn-sm btn-outline-secondary" data-action="dec" data-key="${key}" aria-label="Remove one"><i class="bi bi-dash"></i></button>
                <button type="button" class="btn btn-sm btn-outline-danger" data-action="remove" data-key="${key}" aria-label="Remove item"><i class="bi bi-trash"></i></button>
            </div>`;
        orderList.appendChild(li);
    });

    // bill + status
    totalPrice.textContent = money(getTotal(t));
    statusBadge.textContent = t.paid ? 'Paid' : 'Not paid';
    statusBadge.className = `badge fs-6 ${occupied ? (t.paid ? 'bg-success' : 'bg-warning text-dark') : 'd-none'}`;

    // payment inputs
    receivedInput.value = t.received === null ? '' : t.received;
    tipInput.value = t.tip ? t.tip : '';
    renderPayment(t);

    // buttons: pay first, then close
    payBtn.classList.toggle('d-none', !(occupied && !t.paid));
    closeTableBtn.classList.toggle('d-none', !(occupied && t.paid));
}

function refresh() {
    saveTables();
    renderGrid();
    renderModal();
}

// ---------- actions ----------
function openTable(id) {
    activeId = id;
    itemInput.value = '';
    qtyInput.value = 1;
    itemError.classList.add('d-none');
    renderModal();
    modal.show();
}

modalEl.addEventListener('shown.bs.modal', () => itemInput.focus());

// add item
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const result = findItem(itemInput.value);

    if (result.error) {
        itemError.textContent = result.error;
        itemError.classList.remove('d-none');
        return;
    }

    const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
    const t = getTable(activeId);
    if (!t.waiter) t.waiter = currentWaiter;   // the waiter who opened the table
    t.items[result.item.key] = (t.items[result.item.key] || 0) + qty;
    t.paid = false; // new items -> needs to be paid again

    // clear the input
    itemInput.value = '';
    qtyInput.value = 1;
    itemError.classList.add('d-none');
    refresh();
    itemInput.focus();
});

// minus one / remove line
orderList.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const t = getTable(activeId);
    const key = btn.dataset.key;

    if (btn.dataset.action === 'dec') {
        t.items[key] -= 1;
        if (t.items[key] <= 0) delete t.items[key];
    } else {
        delete t.items[key];
    }
    if (!isOccupied(t)) resetTable(t);   // no items left -> table is free again
    refresh();
});

// money received + tip -> change is recalculated while typing
receivedInput.addEventListener('input', () => {
    const t = getTable(activeId);
    const v = receivedInput.value.trim();
    const n = Number(v);
    t.received = (v === '' || isNaN(n)) ? null : Math.max(0, n);
    saveTables();
    renderPayment(t);
});

tipInput.addEventListener('input', () => {
    const t = getTable(activeId);
    const n = Number(tipInput.value);
    t.tip = isNaN(n) ? 0 : Math.max(0, n);
    saveTables();
    renderPayment(t);
});

// mark as paid
payBtn.addEventListener('click', () => {
    getTable(activeId).paid = true;
    refresh();
});

// close table -> becomes green, everything deleted (items, price, waiter, money, tip)
closeTableBtn.addEventListener('click', () => {
    resetTable(getTable(activeId));
    refresh();
    modal.hide();
});

renderGrid();