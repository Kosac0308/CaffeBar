const LANG_KEY = 'site_lang';
const SUPPORTED = ['mk', 'en'];
const LOCALES = { mk: 'mk-MK', en: 'en-GB' };

const translations = {
    mk: {
        'nav.home': 'Почетна', 'nav.about': 'За нас', 'nav.menu': 'Мени', 'nav.gallery': 'Галерија',
        'nav.events': 'Настани', 'nav.reservation': 'Резервација', 'nav.reserve': 'Резервирај', 'nav.login': 'Најава',
        'status.open': 'Отворено', 'status.closed': 'Затворено',

        'hero.title': 'Добредојдовте во Night Owl Bar',
        'hero.subtitle': 'Место за музика, коктели и незаборавни ноќи.',
        'hero.viewMenu': 'Гледај мени', 'hero.reserve': 'Резервирај маса',
        'hero.hours': 'Работно време: 8:00 AM — 03:00 AM',

        'about.title': 'За нас',
        'about.lead': 'Night Owl Bar е место каде што ноќта оживува — внимателно избрани коктели, локални диџеи и пријатна атмосфера.',
        'about.li1': 'Квалитетни пијалоци и оригинални коктели',
        'about.li2': 'Настани секој викенд',
        'about.li3': 'Онлајн резервации и брз одговор',

        'menu.title': 'Нашето мени', 'menu.ingredients': 'Состојки',
        'filter.all': 'Сите', 'filter.alcohol': 'Алкохолни', 'filter.non': 'Безалкохолни', 'filter.specialty': 'Специјалитети',

        'm.margarita.title': 'Маргарита', 'm.margarita.desc': 'Традиционален коктел со текила, трипл сек и лиме.', 'm.margarita.ing': 'Текила, трипл сек, сок од лиме',
        'm.oldfashioned.title': 'Old Fashioned', 'm.oldfashioned.desc': 'Класичен бурбон коктел.', 'm.oldfashioned.ing': 'Бурбон, шеќер, битери',
        'm.mojito.title': 'Мохито', 'm.mojito.desc': 'Освежителен коктел со рум, нане и лимета.', 'm.mojito.ing': 'Бел рум, нане, лимета, сода, шеќер',
        'm.cosmopolitan.title': 'Космополитен', 'm.cosmopolitan.desc': 'Стилен коктел со вотка и сок од брусница.', 'm.cosmopolitan.ing': 'Вотка, трипл сек, брусница, лимета',
        'm.whiskeysour.title': 'Виски саур', 'm.whiskeysour.desc': 'Класика со бурбон и свеж сок од лимон.', 'm.whiskeysour.ing': 'Бурбон, лимон, шеќерен сируп, белка',
        'm.negroni.title': 'Негрони', 'm.negroni.desc': 'Горчливо-слатка комбинација на италијански стил.', 'm.negroni.ing': 'Џин, кампари, слатки вермут',
        'm.pinacolada.title': 'Пина колада', 'm.pinacolada.desc': 'Егзотичен коктел со рум, кокос и ананас.', 'm.pinacolada.ing': 'Бел рум, кокос крем, сок од ананас',
        'm.lemonade.title': 'Лимонада', 'm.lemonade.desc': 'Домашна лимонада од свежи лимони.', 'm.lemonade.ing': 'Лимон, вода, шеќер',
        'm.orangejuice.title': 'Сок од портокал', 'm.orangejuice.desc': 'Свежо исцеден сок од портокал.', 'm.orangejuice.ing': 'Портокал',
        'm.icedtea.title': 'Леден чај', 'm.icedtea.desc': 'Освежувачки чај со лимон и мраз.', 'm.icedtea.ing': 'Чај, лимон, мраз',
        'm.cola.title': 'Coca-Cola', 'm.cola.desc': 'Освежувачка газирана кола.', 'm.cola.ing': 'Вода, шеќер, јаглероден диоксид, ароми',
        'm.sprite.title': 'Sprite', 'm.sprite.desc': 'Освежувачко лимон-лајм газирано пијалок.', 'm.sprite.ing': 'Вода, шеќер, јаглероден диоксид, лимон, лајм',
        'm.clubsandwich.title': 'Клуб сендвич', 'm.clubsandwich.desc': 'Сендвич со пилешко, сланина, зеленчук и мајонез.', 'm.clubsandwich.ing': 'Леб, пилешко, сланина, зелена салата, домат, мајонез',
        'm.pizza.title': 'Каприциоза', 'm.pizza.desc': 'Класична пица со шунка, печурки и сирење.', 'm.pizza.ing': 'Тесто, шунка, печурки, сирење, доматен сос',
        'm.burrito.title': 'Бурито', 'm.burrito.desc': 'Мек мексикански бурито со месо, грав и зеленчук.', 'm.burrito.ing': 'Тортиља, месо, грав, зелена салата, сос',
        'm.hamburger.title': 'Хамбургер', 'm.hamburger.desc': 'Класичен хамбургер со месо, сирење и зеленчук.', 'm.hamburger.ing': 'Леб, говедско месо, сирење, домат, зелена салата, сос',
        'm.fries.title': 'Помфрит', 'm.fries.desc': 'Златни помфритчиња, крцкави однадвор и меки внатре.', 'm.fries.ing': 'Компир, сол, масло',
        'm.extrafries.title': 'Додаток помфрит', 'm.extrafries.desc': 'Дополнителна порција помфрит – 40 ден.', 'm.extrafries.ing': 'Компир, сол, масло',

        'gallery.title': 'Галерија',

        'events.title': 'Настани',
        'events.dj.title': 'Live DJ Night', 'events.dj.text': 'Секој петок од 22:00 — живи диџеј сетови.', 'events.dj.price': 'Влез: 200 ден',
        'events.ac.title': 'Acoustic Sunday', 'events.ac.text': 'Неделен акустичен перформанс, 19:00 — 22:00.', 'events.ac.price': 'Влез: бесплатен',
        'events.next': 'Следен настан: Live DJ Night', 'events.at': 'во',
        'events.updates': 'Проверувај редовно за ажурирања',

        'res.title': 'Резервација', 'res.name': 'Име и презиме', 'res.phone': 'Телефон',
        'res.datetime': 'Датум и време', 'res.guests': 'Број на гости', 'res.submit': 'Потврди резервација',
        'res.saved': 'Резервацијата е зачувана. Ви благодариме!', 'res.invalid': 'Внеси валидни податоци во сите полиња.',

        'modal.close': 'Затвори',
        'footer.contact': 'Контакт', 'footer.city': 'Центар, Скопје', 'footer.cookies': 'Поставки за колачиња',

        'cookie.title': 'Ние користиме колачиња',
        'cookie.text': 'Користиме колачиња за да ја запамтиме вашата јазична поставка. Можете да ги прифатите или да продолжите само со неопходните.',
        'cookie.accept': 'Прифати', 'cookie.decline': 'Само неопходни'
    },

    en: {
        'nav.home': 'Home', 'nav.about': 'About', 'nav.menu': 'Menu', 'nav.gallery': 'Gallery',
        'nav.events': 'Events', 'nav.reservation': 'Reservation', 'nav.reserve': 'Book now', 'nav.login': 'Login',
        'status.open': 'Open', 'status.closed': 'Closed',

        'hero.title': 'Welcome to Night Owl Bar',
        'hero.subtitle': 'A place for music, cocktails and unforgettable nights.',
        'hero.viewMenu': 'View menu', 'hero.reserve': 'Reserve a table',
        'hero.hours': 'Opening hours: 8:00 AM — 03:00 AM',

        'about.title': 'About us',
        'about.lead': 'Night Owl Bar is where the night comes alive — carefully selected cocktails, local DJs and a cozy atmosphere.',
        'about.li1': 'Quality drinks and original cocktails',
        'about.li2': 'Events every weekend',
        'about.li3': 'Online reservations and quick response',

        'menu.title': 'Our menu', 'menu.ingredients': 'Ingredients',
        'filter.all': 'All', 'filter.alcohol': 'Alcoholic', 'filter.non': 'Non-alcoholic', 'filter.specialty': 'Specialties',

        'm.margarita.title': 'Margarita', 'm.margarita.desc': 'Traditional cocktail with tequila, triple sec and lime.', 'm.margarita.ing': 'Tequila, triple sec, lime juice',
        'm.oldfashioned.title': 'Old Fashioned', 'm.oldfashioned.desc': 'Classic bourbon cocktail.', 'm.oldfashioned.ing': 'Bourbon, sugar, bitters',
        'm.mojito.title': 'Mojito', 'm.mojito.desc': 'Refreshing cocktail with rum, mint and lime.', 'm.mojito.ing': 'White rum, mint, lime, soda, sugar',
        'm.cosmopolitan.title': 'Cosmopolitan', 'm.cosmopolitan.desc': 'Stylish cocktail with vodka and cranberry juice.', 'm.cosmopolitan.ing': 'Vodka, triple sec, cranberry, lime',
        'm.whiskeysour.title': 'Whiskey Sour', 'm.whiskeysour.desc': 'A classic with bourbon and fresh lemon juice.', 'm.whiskeysour.ing': 'Bourbon, lemon, sugar syrup, egg white',
        'm.negroni.title': 'Negroni', 'm.negroni.desc': 'Italian-style bittersweet combination.', 'm.negroni.ing': 'Gin, Campari, sweet vermouth',
        'm.pinacolada.title': 'Piña Colada', 'm.pinacolada.desc': 'Exotic cocktail with rum, coconut and pineapple.', 'm.pinacolada.ing': 'White rum, coconut cream, pineapple juice',
        'm.lemonade.title': 'Lemonade', 'm.lemonade.desc': 'Homemade lemonade from fresh lemons.', 'm.lemonade.ing': 'Lemon, water, sugar',
        'm.orangejuice.title': 'Orange juice', 'm.orangejuice.desc': 'Freshly squeezed orange juice.', 'm.orangejuice.ing': 'Orange',
        'm.icedtea.title': 'Iced tea', 'm.icedtea.desc': 'Refreshing tea with lemon and ice.', 'm.icedtea.ing': 'Tea, lemon, ice',
        'm.cola.title': 'Coca-Cola', 'm.cola.desc': 'Refreshing carbonated cola.', 'm.cola.ing': 'Water, sugar, carbon dioxide, flavourings',
        'm.sprite.title': 'Sprite', 'm.sprite.desc': 'Refreshing lemon-lime carbonated drink.', 'm.sprite.ing': 'Water, sugar, carbon dioxide, lemon, lime',
        'm.clubsandwich.title': 'Club sandwich', 'm.clubsandwich.desc': 'Sandwich with chicken, bacon, vegetables and mayonnaise.', 'm.clubsandwich.ing': 'Bread, chicken, bacon, lettuce, tomato, mayonnaise',
        'm.pizza.title': 'Capricciosa', 'm.pizza.desc': 'Classic pizza with ham, mushrooms and cheese.', 'm.pizza.ing': 'Dough, ham, mushrooms, cheese, tomato sauce',
        'm.burrito.title': 'Burrito', 'm.burrito.desc': 'Soft Mexican burrito with meat, beans and vegetables.', 'm.burrito.ing': 'Tortilla, meat, beans, lettuce, sauce',
        'm.hamburger.title': 'Hamburger', 'm.hamburger.desc': 'Classic hamburger with meat, cheese and vegetables.', 'm.hamburger.ing': 'Bun, beef, cheese, tomato, lettuce, sauce',
        'm.fries.title': 'French fries', 'm.fries.desc': 'Golden fries, crispy outside and soft inside.', 'm.fries.ing': 'Potato, salt, oil',
        'm.extrafries.title': 'Extra fries', 'm.extrafries.desc': 'Additional portion of fries – 40 MKD.', 'm.extrafries.ing': 'Potato, salt, oil',

        'gallery.title': 'Gallery',

        'events.title': 'Events',
        'events.dj.title': 'Live DJ Night', 'events.dj.text': 'Every Friday at 22:00 — live DJ sets.', 'events.dj.price': 'Entry: 200 MKD',
        'events.ac.title': 'Acoustic Sunday', 'events.ac.text': 'Weekly acoustic performance, 19:00 — 22:00.', 'events.ac.price': 'Entry: free',
        'events.next': 'Next event: Live DJ Night', 'events.at': 'at',
        'events.updates': 'Check back regularly for updates',

        'res.title': 'Reservation', 'res.name': 'Full name', 'res.phone': 'Phone',
        'res.datetime': 'Date and time', 'res.guests': 'Number of guests', 'res.submit': 'Confirm reservation',
        'res.saved': 'Your reservation has been saved. Thank you!', 'res.invalid': 'Please enter valid data in all fields.',

        'modal.close': 'Close',
        'footer.contact': 'Contact', 'footer.city': 'City Center, Skopje', 'footer.cookies': 'Cookie settings',

        'cookie.title': 'We use cookies',
        'cookie.text': 'We use cookies to remember your language preference. You can accept them or continue with only the necessary ones.',
        'cookie.accept': 'Accept', 'cookie.decline': 'Necessary only'
    }
};

// Read saved language
let currentLang = Cookies.get(LANG_KEY);
if (!SUPPORTED.includes(currentLang)) currentLang = 'mk';

function t(key) {
    return translations[currentLang]?.[key] ?? translations.mk[key] ?? key;
}

function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.getElementById('currentLangLabel').textContent = currentLang.toUpperCase();
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    document.dispatchEvent(new CustomEvent('langchange', { detail: currentLang }));
}

function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) return;
    currentLang = lang;
    if (Consent.allowsPreferences()) Cookies.set(LANG_KEY, lang, 365);
    applyTranslations();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
    applyTranslations();
});

// save language if accepted else delete it if declined
document.addEventListener('consentchange', () => {
    if (Consent.allowsPreferences()) Cookies.set(LANG_KEY, currentLang, 365);
    else Cookies.remove(LANG_KEY);
});