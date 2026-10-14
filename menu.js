const MENU = [
    { key: 'margarita',    mk: 'Маргарита',       en: 'Margarita',       price: 350, aliases: ['margarite', 'margherita'] },
    { key: 'oldfashioned', mk: 'Old Fashioned',   en: 'Old Fashioned',   price: 420 },
    { key: 'mojito',       mk: 'Мохито',          en: 'Mojito',          price: 300 },
    { key: 'cosmopolitan', mk: 'Космополитен',    en: 'Cosmopolitan',    price: 350 },
    { key: 'whiskeysour',  mk: 'Виски саур',      en: 'Whiskey Sour',    price: 320 },
    { key: 'negroni',      mk: 'Негрони',         en: 'Negroni',         price: 380 },
    { key: 'pinacolada',   mk: 'Пина колада',     en: 'Piña Colada',     price: 360 },
    { key: 'lemonade',     mk: 'Лимонада',        en: 'Lemonade',        price: 150 },
    { key: 'orangejuice',  mk: 'Сок од портокал', en: 'Orange juice',    price: 120 },
    { key: 'icedtea',      mk: 'Леден чај',       en: 'Iced tea',        price: 130 },
    { key: 'cola',         mk: 'Coca-Cola',       en: 'Coca-Cola',       price: 100, aliases: ['cola', 'kola', 'coca cola'] },
    { key: 'sprite',       mk: 'Sprite',          en: 'Sprite',          price: 100 },
    { key: 'clubsandwich', mk: 'Клуб сендвич',    en: 'Club sandwich',   price: 300, aliases: ['club sandwitch'] },
    { key: 'pizza',        mk: 'Каприциоза',      en: 'Capricciosa',     price: 350, aliases: ['kapricioza', 'capriciosa', 'pizza'] },
    { key: 'burrito',      mk: 'Бурито',          en: 'Burrito',         price: 320 },
    { key: 'hamburger',    mk: 'Хамбургер',       en: 'Hamburger',       price: 280 },
    { key: 'fries',        mk: 'Помфрит',         en: 'French fries',    price: 120, aliases: ['fries'] },
    { key: 'extrafries',   mk: 'Додаток помфрит', en: 'Extra fries',     price: 40 }
];

const MENU_BY_KEY = Object.fromEntries(MENU.map(item => [item.key, item]));