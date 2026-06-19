import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  RECIPES,
  CATEGORY_ICONS,
  CATEGORY_DESCRIPTIONS,
  CATEGORY_PRODUCTS,
  CATEGORY_BLOG,
} from '@/data';
import { useFavorites } from '@/hooks/useFavorites';

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

const TABS = [
  { id: 'recipes', label: 'Рецепты', icon: 'UtensilsCrossed' },
  { id: 'blog', label: 'Статьи', icon: 'BookOpen' },
  { id: 'products', label: 'Товары', icon: 'ShoppingCart' },
];

export default function CategoryPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const category = decodeURIComponent(name || '');

  const { toggle, isFav, count: favCount } = useFavorites();
  const [tab, setTab] = useState<'recipes' | 'blog' | 'products'>('recipes');
  const [activeRecipe, setActiveRecipe] = useState<number | null>(null);

  const recipes = RECIPES.filter((r) => r.category === category);
  const icon = CATEGORY_ICONS[category] || 'UtensilsCrossed';
  const description = CATEGORY_DESCRIPTIONS[category] || '';
  const products = CATEGORY_PRODUCTS[category] || [];
  const blogs = CATEGORY_BLOG[category] || [];

  if (!CATEGORY_ICONS[category]) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <Icon name="SearchX" size={48} className="text-muted-foreground opacity-40" />
        <p className="text-lg font-semibold text-muted-foreground">Категория не найдена</p>
        <Button onClick={() => navigate('/')} className="rounded-full">← На главную</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Icon name="ChefHat" size={20} />
            </div>
            <span className="font-display text-xl font-bold">ВкусноПросто</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/favorites')}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"
            >
              <Icon name="Heart" size={16} className={favCount > 0 ? 'fill-primary text-primary' : ''} />
              {favCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                  {favCount}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon name="ArrowLeft" size={16} /> Все категории
            </button>
          </div>
        </div>
      </header>

      {/* Hero категории */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12">
        <div className="absolute -right-10 top-0 h-60 w-60 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-primary/15 blur-3xl" />
        <div className="container relative flex items-center gap-6">
          <div className="flex h-20 w-20 flex-none items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg">
            <Icon name={icon} size={40} />
          </div>
          <div>
            <div className="mb-1 flex items-center gap-3">
              <h1 className="font-display text-4xl font-bold md:text-5xl">{category}</h1>
              <span className="rounded-full bg-primary/15 px-3 py-1 text-sm font-semibold text-primary">
                {recipes.length} {recipes.length === 1 ? 'рецепт' : 'рецепта'}
              </span>
            </div>
            <p className="max-w-lg text-muted-foreground">{description}</p>
          </div>
        </div>
      </section>

      {/* Табы */}
      <div className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex gap-1 py-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                tab === t.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon name={t.icon} size={16} />
              {t.label}
              {t.id === 'recipes' && (
                <span className={`rounded-full px-1.5 py-0.5 text-xs ${tab === 'recipes' ? 'bg-white/20' : 'bg-muted'}`}>
                  {recipes.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="container py-10">

        {/* ── РЕЦЕПТЫ ── */}
        {tab === 'recipes' && (
          <div>
            {recipes.length === 0 ? (
              <div className="py-20 text-center">
                <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground opacity-30" />
                <p className="text-lg font-semibold">Рецепты скоро появятся</p>
                <p className="mt-1 text-sm text-muted-foreground">Следите за обновлениями в разделе «{category}»</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recipes.map((r, i) => {
                  const globalIdx = RECIPES.indexOf(r);
                  return (
                    <article key={r.title} className="hover-lift overflow-hidden rounded-3xl border border-border bg-card">
                      <div className="relative">
                        <img src={r.img} alt={r.title} className="aspect-[4/3] w-full object-cover" />
                        <button
                          onClick={() => {
                            const wasInFav = isFav(globalIdx);
                            toggle(globalIdx);
                            if (!wasInFav) {
                              toast(<div className="flex items-center gap-3"><Icon name="Heart" size={16} className="fill-red-500 text-red-500" /><div><div className="font-semibold">«{r.title}» в избранном!</div><button onClick={() => navigate('/favorites')} className="text-xs text-primary underline">Открыть избранное →</button></div></div>);
                            } else {
                              toast(`«${r.title}» убрано из избранного`);
                            }
                          }}
                          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-primary backdrop-blur transition-transform hover:scale-110"
                        >
                          <Icon name="Heart" size={18} className={isFav(globalIdx) ? 'fill-primary' : ''} />
                        </button>
                      </div>
                      <div className="p-5">
                        <div className="mb-3 flex gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Icon name="Clock" size={14} /> {r.time} мин</span>
                          <span className="flex items-center gap-1"><Icon name="Gauge" size={14} /> {r.difficulty}</span>
                        </div>
                        <h3 className="mb-4 font-display text-2xl font-semibold">{r.title}</h3>
                        <KbjuBar kbju={r.kbju} />

                        <Button
                          onClick={() => setActiveRecipe(activeRecipe === i ? null : i)}
                          variant="outline"
                          className="mt-4 w-full rounded-full font-semibold"
                        >
                          {activeRecipe === i ? 'Скрыть рецепт' : 'Пошаговый рецепт'}
                          <Icon name={activeRecipe === i ? 'ChevronUp' : 'ChevronDown'} size={16} className="ml-1" />
                        </Button>

                        {activeRecipe === i && (
                          <div className="mt-5 animate-fade-in space-y-4">
                            <div>
                              <h4 className="mb-2 flex items-center gap-2 font-display text-base font-semibold">
                                <Icon name="ShoppingBasket" size={16} className="text-accent" /> Ингредиенты
                              </h4>
                              <ul className="space-y-1.5">
                                {r.ingredients.map((ing) => (
                                  <li key={ing} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Icon name="Check" size={14} className="mt-0.5 text-accent" /> {ing}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="mb-3 flex items-center gap-2 font-display text-base font-semibold">
                                <Icon name="ListOrdered" size={16} className="text-primary" /> Приготовление
                              </h4>
                              <ol className="space-y-3">
                                {r.steps.map((step, si) => (
                                  <li key={si} className="flex gap-3">
                                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                      {si + 1}
                                    </span>
                                    <span className="pt-0.5 text-sm">{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                            {/* Партнёрские товары внутри рецепта */}
                            <div className="rounded-2xl border border-secondary/40 bg-secondary/10 p-4">
                              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                <Icon name="ShoppingCart" size={13} /> Нужно для рецепта
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {products.slice(0, 2).map((p) => (
                                  <button
                                    key={p.name}
                                    onClick={() => toast(`Переходим в магазин: ${p.name}`)}
                                    className="rounded-full border border-secondary bg-background px-3 py-1 text-xs font-medium transition-colors hover:bg-secondary"
                                  >
                                    {p.name} →
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
            )}

            {/* Реклама между рецептами и блогом */}
            <div className="my-10 flex items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 py-7 text-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Реклама · Яндекс.Директ</p>
                <p className="mt-1 text-sm text-muted-foreground">Место для рекламного баннера</p>
              </div>
            </div>
          </div>
        )}

        {/* ── БЛОГ ── */}
        {tab === 'blog' && (
          <div className="grid gap-6 md:grid-cols-2">
            {blogs.map((b) => (
              <article
                key={b.title}
                className="hover-lift cursor-pointer rounded-3xl border border-border bg-card p-7"
                onClick={() => toast(`Статья «${b.title}» — скоро полная версия!`)}
              >
                <div className="mb-4 text-5xl">{b.emoji}</div>
                <h3 className="mb-2 font-display text-xl font-bold">{b.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
                  Читать статью <Icon name="ArrowRight" size={15} />
                </div>
              </article>
            ))}

            {/* Блок призыва к подписке внутри блога */}
            <div className="rounded-3xl bg-gradient-to-br from-primary to-secondary p-7 text-primary-foreground md:col-span-2">
              <Icon name="Mail" size={32} className="mb-3" />
              <h3 className="mb-1 font-display text-2xl font-bold">Новые статьи на почту</h3>
              <p className="mb-4 text-sm text-primary-foreground/80">Подпишитесь — раз в неделю присылаем полезные кулинарные советы и новые рецепты.</p>
              <button
                onClick={() => toast('Форма подписки — скоро!')}
                className="rounded-full bg-background px-6 py-2.5 text-sm font-bold text-foreground transition-opacity hover:opacity-90"
              >
                Подписаться на рассылку
              </button>
            </div>
          </div>
        )}

        {/* ── ТОВАРЫ ── */}
        {tab === 'products' && (
          <div>
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold">Товары для раздела «{category}»</h2>
              <p className="mt-1 text-sm text-muted-foreground">Подобрали всё необходимое — от посуды до ингредиентов</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <div key={p.name} className="hover-lift flex flex-col rounded-3xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon name={p.icon} size={28} />
                  </div>
                  <h3 className="mb-1 font-display text-lg font-bold">{p.name}</h3>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-bold text-primary">{p.price}</span>
                    <button
                      onClick={() => toast(`Партнёрская ссылка: ${p.name} — скоро подключим магазин!`)}
                      className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Купить →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Рекламный блок */}
            <div className="mt-10 flex items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 py-8 text-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Реклама · Яндекс.Директ</p>
                <p className="mt-1 text-sm text-muted-foreground">Место для рекламного баннера</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer мини */}
      <footer className="mt-12 border-t border-border bg-card py-6 text-center text-sm text-muted-foreground">
        <button onClick={() => navigate('/')} className="font-semibold text-primary hover:underline">← Вернуться на главную</button>
        <span className="mx-3">·</span>
        © 2026 ВкусноПросто
      </footer>
    </div>
  );
}