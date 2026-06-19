import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const CATEGORY_ICONS: Record<string, string> = {
  'Завтраки': 'Coffee',
  'Супы': 'Soup',
  'Основные': 'UtensilsCrossed',
  'Салаты': 'Salad',
  'Десерты': 'CakeSlice',
  'Напитки': 'CupSoda',
};

const RECIPES = [
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

const NAV = [
  { label: 'Главная', id: 'home' },
  { label: 'Категории', id: 'categories' },
  { label: 'Рецепты', id: 'recipes' },
  { label: 'Курсы', id: 'courses' },
  { label: 'О нас', id: 'about' },
  { label: 'Контакты', id: 'contacts' },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function KbjuBar({ kbju }: { kbju: { kcal: number; p: number; f: number; c: number } }) {
  const items = [
    { label: 'ккал', value: kbju.kcal, color: 'bg-primary' },
    { label: 'белки', value: kbju.p, color: 'bg-accent' },
    { label: 'жиры', value: kbju.f, color: 'bg-secondary' },
    { label: 'углев', value: kbju.c, color: 'bg-primary/60' },
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((it) => (
        <div key={it.label} className="rounded-xl bg-muted p-2 text-center">
          <div className={`mx-auto mb-1 h-1.5 w-8 rounded-full ${it.color}`} />
          <div className="font-display text-lg font-bold leading-none">{it.value}</div>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{it.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function Index() {
  const [active, setActive] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleFavorite = (i: number, title: string) => {
    setFavorites((prev) =>
      prev.includes(i)
        ? prev.filter((x) => x !== i)
        : [...prev, i]
    );
    toast(favorites.includes(i) ? `«${title}» убрано из избранного` : `«${title}» в избранном!`);
  };

  const filteredRecipes = RECIPES.filter((r) => {
    const matchCat = !activeCategory || r.category === activeCategory;
    const matchQuery = !query.trim() || r.title.toLowerCase().includes(query.trim().toLowerCase());
    return matchCat && matchQuery;
  });

  const handleCategoryClick = (name: string) => {
    const next = activeCategory === name ? null : name;
    setActiveCategory(next);
    setActive(null);
    scrollToId('recipes');
  };

  const handleSearch = () => {
    if (!query.trim()) {
      toast('Введите название рецепта');
      return;
    }
    setActiveCategory(null);
    scrollToId('recipes');
  };

  const handleSubscribe = () => {
    if (!email.includes('@')) {
      toast('Введите корректный email');
      return;
    }
    toast(`Готово! Рецепты будут приходить на ${email}`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container flex h-18 items-center justify-between py-4">
          <button onClick={() => scrollToId('home')} className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Icon name="ChefHat" size={22} />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight">ВкусноПросто</span>
          </button>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <button key={n.label} onClick={() => scrollToId(n.id)} className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary">{n.label}</button>
            ))}
          </nav>
          <Button onClick={() => scrollToId('premium')} className="rounded-full font-semibold">
            <Icon name="Crown" size={16} className="mr-1" /> Премиум
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="container relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-fade-in">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-sm font-semibold text-accent">
              <Icon name="Sparkles" size={14} /> Готовим за 30 минут
            </span>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Простые рецепты с <span className="text-gradient">пошаговым</span> приготовлением
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Быстрые и понятные блюда с автоматическим расчётом калорийности и КБЖУ для каждого рецепта.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Icon name="Users" size={16} className="text-primary" /> <strong className="text-foreground">12 400+</strong> читателей</span>
              <span className="flex items-center gap-1.5"><Icon name="BookOpen" size={16} className="text-accent" /> <strong className="text-foreground">{RECIPES.length}</strong> рецептов</span>
              <span className="flex items-center gap-1.5"><Icon name="Star" size={16} className="text-secondary" /> <strong className="text-foreground">4.9</strong> рейтинг</span>
            </div>
            <div className="mt-5 flex max-w-md items-center gap-2 rounded-full border border-border bg-card p-2 shadow-sm">
              <Icon name="Search" size={20} className="ml-3 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Найти рецепт..."
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
              <Button onClick={handleSearch} className="rounded-full font-semibold">Искать</Button>
            </div>
          </div>
          <div className="relative animate-scale-in">
            <img
              src="https://cdn.poehali.dev/projects/5f89fe4c-1f81-41ce-a75c-3324244c0f62/files/a8739846-db33-42c3-832a-d44b8e395f6c.jpg"
              alt="Будда-боул"
              className="aspect-square w-full rounded-[2rem] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-5 -left-5 animate-float rounded-2xl bg-card p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon name="Flame" size={22} />
                </div>
                <div>
                  <div className="font-display text-xl font-bold">480 ккал</div>
                  <div className="text-xs text-muted-foreground">на порцию</div>
                </div>
              </div>
            </div>
            <span className="absolute -right-2 top-6 rotate-6 font-accent text-3xl text-primary">вкусно!</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="container scroll-mt-24 py-12">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Категории</h2>
          <button onClick={() => scrollToId('recipes')} className="text-sm font-semibold text-primary hover:underline">Все категории →</button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Object.entries(CATEGORY_ICONS).map(([name, icon]) => {
            const isActive = activeCategory === name;
            const count = RECIPES.filter((r) => r.category === name).length;
            return (
              <button
                key={name}
                onClick={() => handleCategoryClick(name)}
                className={`hover-lift group rounded-2xl border p-5 text-center transition-colors ${isActive ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card'}`}
              >
                <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${isActive ? 'bg-white/20 text-white' : 'bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground'}`}>
                  <Icon name={icon} size={26} />
                </div>
                <div className="font-display text-lg font-semibold">{name}</div>
                <div className={`text-xs ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>{count} {count === 1 ? 'рецепт' : 'рецепта'}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Recipes */}
      <section id="recipes" className="container scroll-mt-24 py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="font-accent text-2xl text-primary">
              {activeCategory ? activeCategory : 'самое популярное'}
            </span>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              {activeCategory ? `Рецепты: ${activeCategory}` : 'Рецепты дня'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {activeCategory && (
              <button
                onClick={() => { setActiveCategory(null); setActive(null); }}
                className="flex items-center gap-1 rounded-full border border-border px-3 py-1 text-sm font-semibold text-muted-foreground hover:text-primary"
              >
                <Icon name="X" size={14} /> Сбросить
              </button>
            )}
            <button onClick={() => toast('Скоро здесь будет полный каталог рецептов!')} className="text-sm font-semibold text-primary hover:underline">Все рецепты →</button>
          </div>
        </div>

        {filteredRecipes.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold">Рецепты не найдены</p>
            <p className="text-sm">Попробуйте другую категорию или поисковый запрос</p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {filteredRecipes.map((r) => {
            const i = RECIPES.indexOf(r);
            return (
            <article key={r.title} className="hover-lift overflow-hidden rounded-3xl border border-border bg-card">
              <div className="relative">
                <img src={r.img} alt={r.title} className="aspect-[4/3] w-full object-cover" />
                <button
                  onClick={() => toggleFavorite(i, r.title)}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-primary backdrop-blur transition-transform hover:scale-110"
                >
                  <Icon name="Heart" size={18} className={favorites.includes(i) ? 'fill-primary' : ''} />
                </button>
                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                  {r.category}
                </span>
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Icon name="Clock" size={15} /> {r.time} мин</span>
                  <span className="flex items-center gap-1"><Icon name="Gauge" size={15} /> {r.difficulty}</span>
                </div>
                <h3 className="mb-4 font-display text-2xl font-semibold">{r.title}</h3>
                <KbjuBar kbju={r.kbju} />
                <Button
                  onClick={() => setActive(active === i ? null : i)}
                  variant="outline"
                  className="mt-4 w-full rounded-full font-semibold"
                >
                  {active === i ? 'Скрыть рецепт' : 'Пошаговый рецепт'}
                  <Icon name={active === i ? 'ChevronUp' : 'ChevronDown'} size={16} className="ml-1" />
                </Button>

                {active === i && (
                  <div className="mt-5 animate-fade-in space-y-5">
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 font-display text-lg font-semibold">
                        <Icon name="ShoppingBasket" size={18} className="text-accent" /> Ингредиенты
                      </h4>
                      <ul className="space-y-1.5">
                        {r.ingredients.map((ing) => (
                          <li key={ing} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Icon name="Check" size={15} className="mt-0.5 text-accent" /> {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
                        <Icon name="ListOrdered" size={18} className="text-primary" /> Приготовление
                      </h4>
                      <ol className="space-y-3">
                        {r.steps.map((step, si) => (
                          <li key={si} className="flex gap-3">
                            <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                              {si + 1}
                            </span>
                            <span className="pt-0.5 text-sm">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    {/* Партнёрский блок внутри рецепта */}
                    <div className="rounded-2xl border border-secondary/40 bg-secondary/10 p-4">
                      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        <Icon name="ShoppingCart" size={13} /> Понадобится для рецепта
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['Сковорода с антипригаром', 'Кухонные весы', 'Острый нож'].map((item) => (
                          <button
                            key={item}
                            onClick={() => toast(`Переходим в магазин: ${item}`)}
                            className="rounded-full border border-secondary bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          >
                            {item} →
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
            );
          })}
        </div>
      </section>

      {/* Рекламный баннер Яндекс.Директ */}
      <section className="container py-6">
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-muted/50 py-8 text-center">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Реклама · Яндекс.Директ</p>
            <p className="mt-1 text-sm font-medium text-muted-foreground">Здесь будет показываться реклама после подключения Яндекс.Директ</p>
            <button
              onClick={() => toast('Для подключения рекламы зарегистрируйтесь на direct.yandex.ru')}
              className="mt-3 rounded-full border border-primary/40 px-4 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10"
            >
              Подключить Яндекс.Директ →
            </button>
          </div>
        </div>
      </section>

      {/* Платная подписка */}
      <section id="premium" className="container scroll-mt-24 py-12">
        <div className="mb-10 text-center">
          <span className="font-accent text-2xl text-primary">зарабатывай больше</span>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Подписка для настоящих гурманов</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">Базовые рецепты — бесплатно. Эксклюзивные блюда, планы питания и без рекламы — по подписке.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              name: 'Бесплатно', price: '0 ₽', period: 'навсегда', color: 'bg-muted', btn: 'bg-muted text-foreground',
              features: ['Доступ к базовым рецептам', 'Расчёт КБЖУ', 'Поиск и фильтры', '— Без эксклюзивных рецептов', '— Реклама на сайте'],
              action: () => toast('Вы уже используете бесплатный тариф!'),
            },
            {
              name: 'Премиум', price: '299 ₽', period: 'в месяц', color: 'bg-primary', btn: 'bg-background text-foreground',
              badge: 'Популярный',
              features: ['Все рецепты без ограничений', 'Расчёт КБЖУ', 'Планы питания на неделю', 'Без рекламы', 'Новые рецепты первым'],
              action: () => toast('Оформление подписки Премиум — скоро!'),
            },
            {
              name: 'Семейный', price: '499 ₽', period: 'в месяц', color: 'bg-foreground', btn: 'bg-primary text-primary-foreground',
              features: ['Всё из Премиум', 'До 5 аккаунтов', 'Персональные рекомендации', 'Шоппинг-листы', 'Приоритетная поддержка'],
              action: () => toast('Оформление семейной подписки — скоро!'),
            },
          ].map((plan) => (
            <div key={plan.name} className={`relative flex flex-col rounded-3xl p-7 text-background ${plan.color}`}>
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 text-xs font-bold text-foreground">
                  {plan.badge}
                </span>
              )}
              <div className={`mb-1 font-display text-xl font-bold ${plan.color === 'bg-muted' ? 'text-foreground' : ''}`}>{plan.name}</div>
              <div className={`mb-6 font-display text-4xl font-bold ${plan.color === 'bg-muted' ? 'text-foreground' : ''}`}>
                {plan.price} <span className="text-base font-normal opacity-70">{plan.period}</span>
              </div>
              <ul className="mb-8 flex-1 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${f.startsWith('—') ? 'opacity-40' : ''} ${plan.color === 'bg-muted' ? 'text-foreground' : ''}`}>
                    <Icon name={f.startsWith('—') ? 'X' : 'Check'} size={15} /> {f.replace('— ', '')}
                  </li>
                ))}
              </ul>
              <button
                onClick={plan.action}
                className={`rounded-full py-3 text-sm font-bold transition-opacity hover:opacity-90 ${plan.btn}`}
              >
                {plan.name === 'Бесплатно' ? 'Текущий тариф' : 'Оформить подписку'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Курсы и планы питания */}
      <section id="courses" className="container scroll-mt-24 py-12">
        <div className="mb-8 text-center">
          <span className="font-accent text-2xl text-primary">разовая покупка</span>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Кулинарные курсы и планы</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: 'CalendarDays', title: 'План питания на 7 дней', desc: '21 рецепт с готовым списком покупок и расчётом КБЖУ на неделю', price: '390 ₽', badge: 'Хит' },
            { icon: 'Video', title: 'Курс «Быстрые ужины»', desc: '10 видео-уроков — ужин за 20 минут из простых продуктов', price: '790 ₽', badge: null },
            { icon: 'Salad', title: 'Курс «ПП без скуки»', desc: 'Правильное питание без строгих диет — 15 вкусных рецептов', price: '590 ₽', badge: 'Новинка' },
          ].map((course) => (
            <div key={course.title} className="hover-lift relative flex flex-col rounded-3xl border border-border bg-card p-6">
              {course.badge && (
                <span className="absolute right-5 top-5 rounded-full bg-secondary px-3 py-0.5 text-xs font-bold text-foreground">{course.badge}</span>
              )}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon name={course.icon} size={28} />
              </div>
              <h3 className="mb-2 font-display text-xl font-bold">{course.title}</h3>
              <p className="mb-5 flex-1 text-sm text-muted-foreground">{course.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-bold text-primary">{course.price}</span>
                <button
                  onClick={() => toast(`Покупка «${course.title}» — скоро!`)}
                  className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Купить
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="container scroll-mt-24 py-12">
        <div className="grid gap-6 rounded-[2rem] bg-foreground p-8 text-background md:grid-cols-3 md:p-12">
          {[
            { icon: 'Calculator', t: 'Точный КБЖУ', d: 'Автоматический расчёт калорий, белков, жиров и углеводов для каждого блюда.' },
            { icon: 'Timer', t: 'Быстро', d: 'Все рецепты готовятся за 15–30 минут из доступных продуктов.' },
            { icon: 'BookOpen', t: 'Пошагово', d: 'Понятные инструкции с нумерацией шагов — справится каждый.' },
          ].map((f) => (
            <div key={f.t}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Icon name={f.icon} size={24} />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">{f.t}</h3>
              <p className="text-sm text-background/70">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription */}
      <section id="subscribe" className="container scroll-mt-24 py-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-secondary p-10 text-center text-primary-foreground md:p-16">
          <Icon name="Mail" size={40} className="mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold md:text-4xl">Подпишитесь на новые рецепты</h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/90">
            Каждую неделю — подборка простых блюд с готовым расчётом КБЖУ прямо на почту.
          </p>
          <div className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
              placeholder="Ваш email"
              className="rounded-full border-0 bg-background/95 text-foreground"
            />
            <Button onClick={handleSubscribe} className="rounded-full bg-foreground font-semibold text-background hover:bg-foreground/90">Подписаться</Button>
          </div>
        </div>
      </section>

      {/* Footer / Contacts */}
      <footer id="contacts" className="scroll-mt-24 border-t border-border bg-card">
        <div className="container grid gap-8 py-12 md:grid-cols-4">
          <div>
            <button onClick={() => scrollToId('home')} className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Icon name="ChefHat" size={20} />
              </div>
              <span className="font-display text-xl font-bold">ВкусноПросто</span>
            </button>
            <p className="text-sm text-muted-foreground">Простые рецепты с пошаговым приготовлением и расчётом КБЖУ.</p>
          </div>
          <div>
            <h4 className="mb-3 font-display font-semibold">Разделы</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {NAV.map((n) => <li key={n.label}><button onClick={() => scrollToId(n.id)} className="hover:text-primary">{n.label}</button></li>)}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-display font-semibold">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:hello@vkusnoprosto.ru" className="flex items-center gap-2 hover:text-primary"><Icon name="Mail" size={15} /> hello@vkusnoprosto.ru</a></li>
              <li><a href="tel:+79001234567" className="flex items-center gap-2 hover:text-primary"><Icon name="Phone" size={15} /> +7 (900) 123-45-67</a></li>
              <li className="flex items-center gap-2"><Icon name="MapPin" size={15} /> Москва, Россия</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-display font-semibold">Мы в соцсетях</h4>
            <div className="flex gap-2">
              {['Instagram', 'Send', 'Youtube'].map((s) => (
                <button key={s} onClick={() => toast('Скоро добавим наши соцсети!')} className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                  <Icon name={s} size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border py-5 text-center text-sm text-muted-foreground">
          © 2026 ВкусноПросто. Готовьте с удовольствием.
        </div>
      </footer>
    </div>
  );
}