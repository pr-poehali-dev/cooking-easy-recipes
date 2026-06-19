export const CATEGORY_ICONS: Record<string, string> = {
  'Завтраки': 'Coffee',
  'Супы': 'Soup',
  'Основные': 'UtensilsCrossed',
  'Салаты': 'Salad',
  'Десерты': 'CakeSlice',
  'Напитки': 'CupSoda',
};

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Завтраки': 'Начни день вкусно — быстрые и питательные завтраки за 15–20 минут.',
  'Супы': 'Горячие и сытные супы на каждый день из доступных продуктов.',
  'Основные': 'Полноценные обеды и ужины с расчётом КБЖУ для всей семьи.',
  'Салаты': 'Лёгкие и полезные салаты — от классики до современных вариантов.',
  'Десерты': 'Сладкие угощения без лишних хлопот — торты, блины и выпечка.',
  'Напитки': 'Компоты, морсы, смузи и другие домашние напитки.',
};

export interface Recipe {
  title: string;
  category: string;
  time: number;
  difficulty: string;
  img: string;
  kbju: { kcal: number; p: number; f: number; c: number };
  ingredients: string[];
  steps: string[];
}

export const RECIPES: Recipe[] = [
  {
    title: 'Борщ классический',
    category: 'Супы',
    time: 30,
    difficulty: 'Просто',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/2b5f0887-dca5-4ab7-b2e8-bac800feb76f.jpg',
    kbju: { kcal: 210, p: 10, f: 8, c: 24 },
    ingredients: ['Свёкла — 2 шт', 'Капуста — 200 г', 'Картофель — 2 шт', 'Морковь — 1 шт', 'Лук — 1 шт', 'Томатная паста — 2 ст.л.', 'Говяжий бульон — 1 л', 'Сметана, укроп — для подачи'],
    steps: ['Нарежьте свёклу соломкой, обжарьте с томатной пастой 10 минут.', 'В кипящий бульон добавьте картофель кубиками и варите 10 минут.', 'Добавьте нашинкованную капусту и морковь, варите ещё 7 минут.', 'Введите свёклу, посолите, проварите 5 минут. Подавайте со сметаной и укропом.'],
  },
  {
    title: 'Блины со сметаной',
    category: 'Завтраки',
    time: 20,
    difficulty: 'Просто',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/2eba423b-d81a-4ebd-8f92-032c53566530.jpg',
    kbju: { kcal: 320, p: 9, f: 12, c: 44 },
    ingredients: ['Мука — 200 г', 'Молоко — 500 мл', 'Яйца — 2 шт', 'Сахар — 1 ст.л.', 'Соль — щепотка', 'Масло сливочное — 30 г', 'Сметана — для подачи'],
    steps: ['Взбейте яйца с сахаром и солью.', 'Добавьте муку и постепенно влейте молоко, размешайте до однородного теста без комков.', 'Добавьте растопленное масло. Дайте тесту постоять 10 минут.', 'Жарьте тонкие блины на раскалённой сковороде по 1–2 минуты с каждой стороны. Подавайте со сметаной.'],
  },
  {
    title: 'Пельмени домашние',
    category: 'Основные',
    time: 25,
    difficulty: 'Просто',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/cf7f4b0f-4104-445c-9b8f-db0e48528e54.jpg',
    kbju: { kcal: 520, p: 26, f: 18, c: 62 },
    ingredients: ['Готовые пельмени — 400 г', 'Вода — 2 л', 'Соль — 1 ст.л.', 'Лавровый лист — 2 шт', 'Перец горошком — 5 шт', 'Сметана — для подачи', 'Сливочное масло — 20 г'],
    steps: ['Доведите воду до кипения, добавьте соль, лавровый лист и перец.', 'Аккуратно опустите пельмени в кипящую воду, помешайте.', 'Варите 7–8 минут после всплытия до готовности.', 'Выложите в тарелку, добавьте масло. Подавайте со сметаной.'],
  },
  {
    title: 'Салат Оливье',
    category: 'Салаты',
    time: 25,
    difficulty: 'Просто',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/f2e2a054-0009-4740-acba-dfa22a045249.jpg',
    kbju: { kcal: 280, p: 11, f: 18, c: 19 },
    ingredients: ['Картофель — 3 шт', 'Морковь — 2 шт', 'Яйца — 3 шт', 'Колбаса варёная — 200 г', 'Огурцы маринованные — 3 шт', 'Горошек — 1 банка', 'Майонез — 3 ст.л.'],
    steps: ['Отварите картофель, морковь и яйца до готовности, остудите.', 'Нарежьте всё кубиками одинакового размера.', 'Добавьте горошек и нарезанную колбасу.', 'Заправьте майонезом, перемешайте, посолите по вкусу. Охладите 20 минут.'],
  },
  {
    title: 'Медовик быстрый',
    category: 'Десерты',
    time: 30,
    difficulty: 'Просто',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/ff3df9a4-5f2a-45ff-9d6f-f1dcbda0c5d5.jpg',
    kbju: { kcal: 420, p: 7, f: 16, c: 62 },
    ingredients: ['Мёд — 3 ст.л.', 'Сахар — 100 г', 'Яйца — 2 шт', 'Масло — 80 г', 'Сода — 1 ч.л.', 'Мука — 350 г', 'Сметана 20% — 400 г для крема', 'Сахарная пудра — 3 ст.л.'],
    steps: ['Растопите мёд с маслом и сахаром на водяной бане, добавьте соду — масса вспенится.', 'Снимите с огня, вбейте яйца, добавьте муку — замесите тесто.', 'Разделите на 6 частей, раскатайте и выпекайте коржи по 5 минут при 180°С.', 'Взбейте сметану с пудрой. Соберите торт, промазав каждый корж. Уберите в холодильник на 2 часа.'],
  },
  {
    title: 'Уха рыбная',
    category: 'Супы',
    time: 25,
    difficulty: 'Просто',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/0607754d-514d-4b0f-b79a-ea97763626da.jpg',
    kbju: { kcal: 180, p: 18, f: 5, c: 14 },
    ingredients: ['Рыба (судак или горбуша) — 400 г', 'Картофель — 3 шт', 'Морковь — 1 шт', 'Лук — 1 шт', 'Вода — 1.5 л', 'Лавровый лист — 2 шт', 'Укроп, соль, перец — по вкусу'],
    steps: ['Залейте рыбу холодной водой, доведите до кипения, снимите пену.', 'Добавьте нарезанные картофель, морковь и лук целиком.', 'Варите 15 минут на среднем огне, добавьте лавровый лист и специи.', 'Выньте лук, посыпьте свежим укропом и подавайте горячей.'],
  },
  {
    title: 'Будда-боул с курицей',
    category: 'Основные',
    time: 25,
    difficulty: 'Просто',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/a8739846-db33-42c3-832a-d44b8e395f6c.jpg',
    kbju: { kcal: 480, p: 38, f: 18, c: 42 },
    ingredients: ['Куриное филе — 200 г', 'Киноа — 100 г', 'Авокадо — 1 шт', 'Черри — 6 шт', 'Микс салата — 50 г', 'Оливковое масло — 1 ст.л.'],
    steps: ['Отварите киноа до готовности, около 15 минут.', 'Обжарьте куриное филе на сковороде с двух сторон.', 'Нарежьте авокадо и черри дольками.', 'Соберите боул, полейте маслом и подавайте.'],
  },
  {
    title: 'Паста Карбонара',
    category: 'Основные',
    time: 20,
    difficulty: 'Просто',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/1607d259-58a3-4741-9869-5c1222c1044f.jpg',
    kbju: { kcal: 620, p: 24, f: 28, c: 68 },
    ingredients: ['Спагетти — 200 г', 'Бекон — 100 г', 'Яйца — 2 шт', 'Пармезан — 50 г', 'Чёрный перец — по вкусу'],
    steps: ['Отварите спагетти аль денте.', 'Обжарьте бекон до хрустящей корочки.', 'Смешайте яйца с тёртым пармезаном.', 'Соедините всё, быстро перемешивая, посыпьте перцем.'],
  },
  {
    title: 'Панкейки с ягодами',
    category: 'Завтраки',
    time: 15,
    difficulty: 'Просто',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/84991a6c-1cfb-4195-8651-db17ab1bd8d8.jpg',
    kbju: { kcal: 390, p: 12, f: 11, c: 58 },
    ingredients: ['Мука — 150 г', 'Молоко — 200 мл', 'Яйцо — 1 шт', 'Сахар — 2 ст.л.', 'Ягоды — 100 г', 'Мёд — по вкусу'],
    steps: ['Смешайте муку, молоко, яйцо и сахар в тесто.', 'Выпекайте панкейки на сухой сковороде до золотистого цвета.', 'Выложите стопкой, украсьте свежими ягодами.', 'Полейте мёдом и подавайте тёплыми.'],
  },
];

export const CATEGORY_PRODUCTS: Record<string, { name: string; desc: string; price: string; icon: string }[]> = {
  'Завтраки': [
    { name: 'Блинница антипригарная', desc: 'Идеальна для блинов и панкейков', price: '1 290 ₽', icon: 'Circle' },
    { name: 'Тостер 4 секции', desc: 'Быстрый завтрак за 2 минуты', price: '2 490 ₽', icon: 'Zap' },
    { name: 'Ягоды замороженные 1 кг', desc: 'Клубника, черника, малина микс', price: '349 ₽', icon: 'Leaf' },
  ],
  'Супы': [
    { name: 'Кастрюля 5 л нержавейка', desc: 'Для варки борща и ухи', price: '2 190 ₽', icon: 'Soup' },
    { name: 'Половник силиконовый', desc: 'Не царапает посуду', price: '290 ₽', icon: 'Utensils' },
    { name: 'Набор специй для супов', desc: '12 видов пряных трав', price: '490 ₽', icon: 'Leaf' },
  ],
  'Основные': [
    { name: 'Сковорода чугунная 28 см', desc: 'Для жарки мяса и рыбы', price: '3 490 ₽', icon: 'Circle' },
    { name: 'Кухонные весы цифровые', desc: 'Точность до 1 грамма', price: '890 ₽', icon: 'Scale' },
    { name: 'Масло оливковое Extra Virgin', desc: 'Для заправки и жарки', price: '690 ₽', icon: 'Droplets' },
  ],
  'Салаты': [
    { name: 'Салатник стеклянный 3 л', desc: 'Для Оливье и больших салатов', price: '590 ₽', icon: 'Circle' },
    { name: 'Овощечистка керамическая', desc: 'Чистит быстро и тонко', price: '390 ₽', icon: 'Scissors' },
    { name: 'Заправки для салатов набор', desc: '6 видов соусов', price: '450 ₽', icon: 'Droplets' },
  ],
  'Десерты': [
    { name: 'Форма силиконовая для торта', desc: 'Ровные коржи каждый раз', price: '590 ₽', icon: 'Circle' },
    { name: 'Миксер ручной 500 Вт', desc: 'Для крема и теста', price: '1 890 ₽', icon: 'Zap' },
    { name: 'Мёд натуральный 1 кг', desc: 'Для медовика и выпечки', price: '680 ₽', icon: 'Leaf' },
  ],
  'Напитки': [
    { name: 'Блендер стационарный', desc: 'Смузи за 30 секунд', price: '4 290 ₽', icon: 'Zap' },
    { name: 'Чайник со свистком 3 л', desc: 'Быстро кипятит воду', price: '1 190 ₽', icon: 'Flame' },
    { name: 'Ягодный морс набор', desc: 'Концентраты из брусники и клюквы', price: '390 ₽', icon: 'Droplets' },
  ],
};

export interface ShopProduct {
  id: string;
  name: string;
  desc: string;
  price: number;
  oldPrice?: number;
  icon: string;
  img?: string;
  tag?: string;           // «Хит», «Скидка», «Новинка»
  rating: number;
  reviews: number;
  shopSection: string;    // раздел магазина
  categories: string[];   // к каким категориям рецептов подходит
  affiliate: string;      // Wildberries / Ozon / Яндекс.Маркет
  url: string;            // партнёрская ссылка (заглушка)
}

export const SHOP_SECTIONS = ['Посуда', 'Техника', 'Ножи и инструменты', 'Специи и продукты', 'Хранение'];

export const SHOP_PRODUCTS: ShopProduct[] = [
  // ПОСУДА
  {
    id: 'p1', name: 'Сковорода чугунная 28 см', desc: 'Равномерный нагрев, идеальна для стейков, блинов и тушения. Служит десятилетиями.',
    price: 3490, oldPrice: 4200, icon: 'Circle',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/7203623b-9914-4fc0-9943-cc48ba76f862.jpg',
    tag: 'Хит', rating: 4.9, reviews: 312, shopSection: 'Посуда',
    categories: ['Основные', 'Завтраки'], affiliate: 'Wildberries', url: 'https://wb.ru',
  },
  {
    id: 'p2', name: 'Кастрюля 5 л нержавейка', desc: 'Для борща, ухи и любых супов. Утолщённое дно — не пригорает.',
    price: 2190, icon: 'Soup',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/7203623b-9914-4fc0-9943-cc48ba76f862.jpg',
    rating: 4.7, reviews: 198, shopSection: 'Посуда',
    categories: ['Супы'], affiliate: 'Ozon', url: 'https://ozon.ru',
  },
  {
    id: 'p3', name: 'Блинница антипригарная 24 см', desc: 'Специальная форма для идеально круглых блинов без масла.',
    price: 1290, oldPrice: 1590, icon: 'Circle',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/7203623b-9914-4fc0-9943-cc48ba76f862.jpg',
    tag: 'Скидка', rating: 4.8, reviews: 241, shopSection: 'Посуда',
    categories: ['Завтраки', 'Десерты'], affiliate: 'Wildberries', url: 'https://wb.ru',
  },
  {
    id: 'p4', name: 'Форма силиконовая для торта', desc: 'Набор 3 формы разных диаметров. Ровные коржи без пригара.',
    price: 590, icon: 'Circle',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/7203623b-9914-4fc0-9943-cc48ba76f862.jpg',
    rating: 4.6, reviews: 87, shopSection: 'Посуда',
    categories: ['Десерты'], affiliate: 'Ozon', url: 'https://ozon.ru',
  },
  {
    id: 'p5', name: 'Салатник стеклянный 3 л', desc: 'Для Оливье и любых больших салатов. Прозрачное стекло, крышка в комплекте.',
    price: 590, icon: 'Circle',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/7203623b-9914-4fc0-9943-cc48ba76f862.jpg',
    rating: 4.5, reviews: 64, shopSection: 'Посуда',
    categories: ['Салаты'], affiliate: 'Wildberries', url: 'https://wb.ru',
  },

  // ТЕХНИКА
  {
    id: 't1', name: 'Миксер ручной 500 Вт', desc: '5 скоростей, турборежим. Для крема, теста и взбивания яиц.',
    price: 1890, oldPrice: 2490, icon: 'Zap',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/c3fb8bd5-bc98-4a5c-b5d6-0dc778ad023d.jpg',
    tag: 'Скидка', rating: 4.8, reviews: 156, shopSection: 'Техника',
    categories: ['Десерты', 'Завтраки'], affiliate: 'Яндекс.Маркет', url: 'https://market.yandex.ru',
  },
  {
    id: 't2', name: 'Блендер стационарный 1000 Вт', desc: 'Смузи, супы-пюре, соусы за 30 секунд. Колба 1,5 л.',
    price: 4290, icon: 'Zap',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/c3fb8bd5-bc98-4a5c-b5d6-0dc778ad023d.jpg',
    tag: 'Новинка', rating: 4.9, reviews: 203, shopSection: 'Техника',
    categories: ['Напитки', 'Супы'], affiliate: 'Ozon', url: 'https://ozon.ru',
  },
  {
    id: 't3', name: 'Кухонные весы цифровые', desc: 'Точность до 1 г, макс. 5 кг. Встроенный таймер.',
    price: 890, icon: 'Scale',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/c3fb8bd5-bc98-4a5c-b5d6-0dc778ad023d.jpg',
    tag: 'Хит', rating: 4.7, reviews: 445, shopSection: 'Техника',
    categories: ['Основные', 'Десерты', 'Завтраки'], affiliate: 'Wildberries', url: 'https://wb.ru',
  },
  {
    id: 't4', name: 'Тостер 4 секции', desc: '6 режимов поджарки, функция разморозки. Стальной корпус.',
    price: 2490, icon: 'Zap',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/c3fb8bd5-bc98-4a5c-b5d6-0dc778ad023d.jpg',
    rating: 4.6, reviews: 92, shopSection: 'Техника',
    categories: ['Завтраки'], affiliate: 'Яндекс.Маркет', url: 'https://market.yandex.ru',
  },

  // НОЖИ И ИНСТРУМЕНТЫ
  {
    id: 'k1', name: 'Нож шеф-повара 20 см', desc: 'Немецкая сталь, идеальный баланс. Подходит для мяса, овощей и зелени.',
    price: 2890, oldPrice: 3500, icon: 'Scissors',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/b76dde41-18a6-4e14-a3f5-746c2eea9cb3.jpg',
    tag: 'Хит', rating: 4.9, reviews: 378, shopSection: 'Ножи и инструменты',
    categories: ['Основные', 'Салаты', 'Супы'], affiliate: 'Wildberries', url: 'https://wb.ru',
  },
  {
    id: 'k2', name: 'Набор ножей 5 предметов', desc: 'Шеф, хлебный, для чистки, обвалочный + ножницы. Подставка в комплекте.',
    price: 3990, icon: 'Scissors',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/b76dde41-18a6-4e14-a3f5-746c2eea9cb3.jpg',
    tag: 'Новинка', rating: 4.8, reviews: 134, shopSection: 'Ножи и инструменты',
    categories: ['Основные', 'Салаты'], affiliate: 'Ozon', url: 'https://ozon.ru',
  },
  {
    id: 'k3', name: 'Овощечистка керамическая', desc: 'Ультратонкая чистка, не окисляет овощи. Эргономичная ручка.',
    price: 390, icon: 'Scissors',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/b76dde41-18a6-4e14-a3f5-746c2eea9cb3.jpg',
    rating: 4.5, reviews: 217, shopSection: 'Ножи и инструменты',
    categories: ['Салаты', 'Супы'], affiliate: 'Wildberries', url: 'https://wb.ru',
  },
  {
    id: 'k4', name: 'Доска разделочная бамбук', desc: 'Антибактериальный бамбук, не тупит ножи. Размер 40×25 см.',
    price: 890, icon: 'Layers',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/b76dde41-18a6-4e14-a3f5-746c2eea9cb3.jpg',
    rating: 4.7, reviews: 289, shopSection: 'Ножи и инструменты',
    categories: ['Основные', 'Салаты', 'Завтраки', 'Супы'], affiliate: 'Ozon', url: 'https://ozon.ru',
  },

  // СПЕЦИИ И ПРОДУКТЫ
  {
    id: 's1', name: 'Набор специй для супов', desc: '12 видов пряных трав: лавр, тмин, кориандр, розмарин и другие.',
    price: 490, icon: 'Leaf',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/7203623b-9914-4fc0-9943-cc48ba76f862.jpg',
    rating: 4.8, reviews: 167, shopSection: 'Специи и продукты',
    categories: ['Супы', 'Основные'], affiliate: 'Яндекс.Маркет', url: 'https://market.yandex.ru',
  },
  {
    id: 's2', name: 'Мёд натуральный 1 кг', desc: 'Гречишный мёд из экологически чистых районов. Без добавок.',
    price: 680, icon: 'Leaf',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/7203623b-9914-4fc0-9943-cc48ba76f862.jpg',
    tag: 'Хит', rating: 4.9, reviews: 521, shopSection: 'Специи и продукты',
    categories: ['Десерты', 'Завтраки'], affiliate: 'Wildberries', url: 'https://wb.ru',
  },
  {
    id: 's3', name: 'Масло оливковое Extra Virgin', desc: 'Холодный отжим, первый пресс. 0,5 л. Для заправки и жарки.',
    price: 690, icon: 'Droplets',
    img: 'https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/7203623b-9914-4fc0-9943-cc48ba76f862.jpg',
    rating: 4.7, reviews: 203, shopSection: 'Специи и продукты',
    categories: ['Салаты', 'Основные'], affiliate: 'Ozon', url: 'https://ozon.ru',
  },
];

export const POPULAR_PRODUCTS = SHOP_PRODUCTS.filter(p => p.tag === 'Хит' || p.reviews > 200);

export const getProductsForRecipeCategory = (category: string): ShopProduct[] =>
  SHOP_PRODUCTS.filter(p => p.categories.includes(category)).slice(0, 3);

export const AFFILIATE_COLORS: Record<string, string> = {
  'Wildberries': 'bg-purple-100 text-purple-700',
  'Ozon':        'bg-blue-100 text-blue-700',
  'Яндекс.Маркет': 'bg-yellow-100 text-yellow-700',
};

export const CATEGORY_BLOG: Record<string, { title: string; text: string; emoji: string }[]> = {
  'Завтраки': [
    { emoji: '⏰', title: '5 завтраков за 10 минут', text: 'Собрали самые быстрые варианты для тех, кто спешит утром. Никаких сложностей — только вкус.' },
    { emoji: '🥚', title: 'Почему яйца на завтрак — это лучший выбор', text: 'Яйца дают долгое ощущение сытости и содержат полный набор аминокислот. Разбираемся в деталях.' },
  ],
  'Супы': [
    { emoji: '🍲', title: 'Как сварить идеальный бульон', text: 'Прозрачный, наваристый бульон — основа любого хорошего супа. Делимся секретами шеф-поваров.' },
    { emoji: '❄️', title: 'Можно ли замораживать борщ?', text: 'Да, и он станет вкуснее! Рассказываем, как правильно заморозить и разогреть суп без потери вкуса.' },
  ],
  'Основные': [
    { emoji: '🔥', title: 'Как пожарить мясо без масла', text: 'Чугунная сковорода и правильная температура — вот два секрета идеальной корочки без лишнего жира.' },
    { emoji: '🍝', title: 'Паста: варить аль денте или до мягкости?', text: 'Разбираем разницу в текстуре и какой вариант лучше сочетается с разными соусами.' },
  ],
  'Салаты': [
    { emoji: '🥗', title: 'Как Оливье стал символом Нового года', text: 'История популярного салата — от французского ресторатора до советских столовых и праздничных столов.' },
    { emoji: '🥑', title: 'Топ-5 заправок вместо майонеза', text: 'Вкусные и более полезные альтернативы для любых салатов — с рецептами и советами по хранению.' },
  ],
  'Десерты': [
    { emoji: '🍯', title: 'История медовика: от царского стола до вашей кухни', text: 'Медовик появился в XIX веке и с тех пор не потерял популярности. Разбираемся, в чём его секрет.' },
    { emoji: '🎂', title: 'Почему коржи получаются жёсткими', text: 'Три главные ошибки при выпечке и как их избежать, чтобы торт всегда получался мягким.' },
  ],
  'Напитки': [
    { emoji: '🫐', title: 'Морс vs сок: что полезнее', text: 'Сравниваем домашний морс из ягод и покупной сок по составу, сахару и пользе для здоровья.' },
    { emoji: '🍵', title: 'Как правильно заварить иван-чай', text: 'Традиционный русский напиток переживает возрождение. Рассказываем о пользе и способах заварки.' },
  ],
};