import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CATEGORIES = [
  { name: 'Завтраки', icon: 'Coffee', count: 42 },
  { name: 'Супы', icon: 'Soup', count: 31 },
  { name: 'Основные', icon: 'UtensilsCrossed', count: 88 },
  { name: 'Салаты', icon: 'Salad', count: 27 },
  { name: 'Десерты', icon: 'CakeSlice', count: 54 },
  { name: 'Напитки', icon: 'CupSoda', count: 19 },
];

const RECIPES = [
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

const NAV = ['Главная', 'Категории', 'Рецепты', 'Избранное', 'О нас', 'Контакты'];

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container flex h-18 items-center justify-between py-4">
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Icon name="ChefHat" size={22} />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight">ВкусноПросто</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <a key={n} href="#" className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary">{n}</a>
            ))}
          </nav>
          <Button className="rounded-full font-semibold">
            <Icon name="Bell" size={16} className="mr-1" /> Подписка
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
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
            <div className="mt-8 flex max-w-md items-center gap-2 rounded-full border border-border bg-card p-2 shadow-sm">
              <Icon name="Search" size={20} className="ml-3 text-muted-foreground" />
              <Input placeholder="Найти рецепт..." className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
              <Button className="rounded-full font-semibold">Искать</Button>
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
      <section className="container py-12">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Категории</h2>
          <a href="#" className="text-sm font-semibold text-primary hover:underline">Все категории →</a>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <button key={c.name} className="hover-lift group rounded-2xl border border-border bg-card p-5 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon name={c.icon} size={26} />
              </div>
              <div className="font-display text-lg font-semibold">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.count} рецептов</div>
            </button>
          ))}
        </div>
      </section>

      {/* Recipes */}
      <section className="container py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="font-accent text-2xl text-primary">самое популярное</span>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Рецепты дня</h2>
          </div>
          <a href="#" className="text-sm font-semibold text-primary hover:underline">Все рецепты →</a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {RECIPES.map((r, i) => (
            <article key={r.title} className="hover-lift overflow-hidden rounded-3xl border border-border bg-card">
              <div className="relative">
                <img src={r.img} alt={r.title} className="aspect-[4/3] w-full object-cover" />
                <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-primary backdrop-blur transition-transform hover:scale-110">
                  <Icon name="Heart" size={18} />
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
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="container py-12">
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
      <section className="container py-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-secondary p-10 text-center text-primary-foreground md:p-16">
          <Icon name="Mail" size={40} className="mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold md:text-4xl">Подпишитесь на новые рецепты</h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/90">
            Каждую неделю — подборка простых блюд с готовым расчётом КБЖУ прямо на почту.
          </p>
          <div className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
            <Input placeholder="Ваш email" className="rounded-full border-0 bg-background/95 text-foreground" />
            <Button className="rounded-full bg-foreground font-semibold text-background hover:bg-foreground/90">Подписаться</Button>
          </div>
        </div>
      </section>

      {/* Footer / Contacts */}
      <footer className="border-t border-border bg-card">
        <div className="container grid gap-8 py-12 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Icon name="ChefHat" size={20} />
              </div>
              <span className="font-display text-xl font-bold">ВкусноПросто</span>
            </div>
            <p className="text-sm text-muted-foreground">Простые рецепты с пошаговым приготовлением и расчётом КБЖУ.</p>
          </div>
          <div>
            <h4 className="mb-3 font-display font-semibold">Разделы</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {NAV.map((n) => <li key={n}><a href="#" className="hover:text-primary">{n}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-display font-semibold">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Icon name="Mail" size={15} /> hello@vkusnoprosto.ru</li>
              <li className="flex items-center gap-2"><Icon name="Phone" size={15} /> +7 (900) 123-45-67</li>
              <li className="flex items-center gap-2"><Icon name="MapPin" size={15} /> Москва, Россия</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-display font-semibold">Мы в соцсетях</h4>
            <div className="flex gap-2">
              {['Instagram', 'Send', 'Youtube'].map((s) => (
                <a key={s} href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                  <Icon name={s} size={18} />
                </a>
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
