import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { RECIPES, CATEGORY_PRODUCTS } from '@/data';
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

const UPSELL_THRESHOLD = 3;

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, toggle, isFav, clear, count } = useFavorites();
  const [activeRecipe, setActiveRecipe] = useState<number | null>(null);
  const [showClear, setShowClear] = useState(false);

  const favRecipes = RECIPES.filter((_, i) => favorites.includes(i));

  // Похожие — из тех же категорий, но не в избранном
  const favCategories = [...new Set(favRecipes.map((r) => r.category))];
  const suggested = RECIPES.filter(
    (r, i) => favCategories.includes(r.category) && !favorites.includes(i)
  ).slice(0, 3);

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
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Icon name="ArrowLeft" size={16} /> На главную
          </button>
        </div>
      </header>

      <div className="container py-10">

        {/* Заголовок */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="font-accent text-2xl text-primary">твоя коллекция</span>
            <h1 className="font-display text-4xl font-bold md:text-5xl">Избранные рецепты</h1>
          </div>
          {count > 0 && (
            <button
              onClick={() => setShowClear(true)}
              className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
            >
              <Icon name="Trash2" size={15} /> Очистить всё
            </button>
          )}
        </div>

        {/* Диалог подтверждения очистки */}
        {showClear && (
          <div className="mb-6 flex items-center gap-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
            <Icon name="AlertTriangle" size={20} className="text-destructive" />
            <span className="flex-1 text-sm font-medium">Удалить все {count} рецепта из избранного?</span>
            <button
              onClick={() => { clear(); setShowClear(false); toast('Избранное очищено'); }}
              className="rounded-full bg-destructive px-4 py-1.5 text-xs font-bold text-white"
            >Да, удалить</button>
            <button
              onClick={() => setShowClear(false)}
              className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold"
            >Отмена</button>
          </div>
        )}

        {/* ПУСТО */}
        {count === 0 && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <Icon name="HeartOff" size={40} className="text-primary/50" />
            </div>
            <h2 className="mb-2 font-display text-2xl font-bold">Пока пусто</h2>
            <p className="mb-8 text-muted-foreground">Нажмите ❤️ на любом рецепте — он появится здесь</p>
            <Button onClick={() => navigate('/')} className="rounded-full font-semibold">
              Перейти к рецептам
            </Button>

            {/* Подсказка-мотиватор */}
            <div className="mx-auto mt-10 max-w-sm rounded-2xl border border-secondary/40 bg-secondary/10 p-5 text-left">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <Icon name="Lightbulb" size={18} className="text-secondary" /> Зачем сохранять?
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><Icon name="Check" size={14} className="mt-0.5 text-accent" /> Рецепты не потеряются — хранятся в браузере</li>
                <li className="flex items-start gap-2"><Icon name="Check" size={14} className="mt-0.5 text-accent" /> Быстрый доступ без поиска</li>
                <li className="flex items-start gap-2"><Icon name="Check" size={14} className="mt-0.5 text-accent" /> Готовьте по плану — всё в одном месте</li>
              </ul>
            </div>
          </div>
        )}

        {/* СПИСОК ИЗБРАННОГО */}
        {count > 0 && (
          <>
            {/* Счётчик-мотиватор */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <Icon name="Heart" size={16} className="fill-primary" /> {count} {count === 1 ? 'рецепт сохранён' : count < 5 ? 'рецепта сохранено' : 'рецептов сохранено'}
              </div>
              <div className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                <Icon name="Flame" size={16} />
                {favRecipes.reduce((s, r) => s + r.kbju.kcal, 0)} ккал суммарно
              </div>
              <div className="flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-2 text-sm font-semibold text-foreground">
                <Icon name="Clock" size={16} />
                {favRecipes.reduce((s, r) => s + r.time, 0)} мин на приготовление
              </div>
            </div>

            {/* Апселл после 3+ рецептов */}
            {count >= UPSELL_THRESHOLD && (
              <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-secondary p-6 text-primary-foreground md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <Icon name="Crown" size={20} />
                      <span className="font-display text-lg font-bold">Вы уже сохранили {count} рецепта!</span>
                    </div>
                    <p className="text-sm text-primary-foreground/85">
                      С Премиум-подпиской получите план питания на неделю из ваших любимых блюд, автоматический список покупок и 100+ эксклюзивных рецептов без рекламы.
                    </p>
                  </div>
                  <button
                    onClick={() => { navigate('/'); setTimeout(() => document.getElementById('premium')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                    className="flex-none rounded-full bg-background px-6 py-3 text-sm font-bold text-foreground transition-opacity hover:opacity-90"
                  >
                    Попробовать Премиум →
                  </button>
                </div>
              </div>
            )}

            {/* Карточки избранного */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {favRecipes.map((r) => {
                const i = RECIPES.indexOf(r);
                const products = CATEGORY_PRODUCTS[r.category] || [];
                return (
                  <article key={r.title} className="hover-lift overflow-hidden rounded-3xl border border-border bg-card">
                    <div className="relative">
                      <img src={r.img} alt={r.title} className="aspect-[4/3] w-full object-cover" />
                      {/* Кнопка удаления из избранного */}
                      <button
                        onClick={() => { toggle(i); toast(`«${r.title}» убрано из избранного`); }}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-primary backdrop-blur transition-transform hover:scale-110"
                      >
                        <Icon name="Heart" size={18} className="fill-primary" />
                      </button>
                      <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                        {r.category}
                      </span>
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

                          {/* Партнёрские товары под рецептом */}
                          {products.length > 0 && (
                            <div className="rounded-2xl border border-secondary/40 bg-secondary/10 p-4">
                              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                <Icon name="ShoppingCart" size={13} /> Нужно для рецепта
                              </p>
                              <div className="space-y-2">
                                {products.slice(0, 2).map((p) => (
                                  <div key={p.name} className="flex items-center justify-between rounded-xl bg-background px-3 py-2">
                                    <div>
                                      <div className="text-sm font-semibold">{p.name}</div>
                                      <div className="text-xs text-muted-foreground">{p.desc}</div>
                                    </div>
                                    <button
                                      onClick={() => toast(`Партнёрская ссылка: ${p.name} — скоро подключим!`)}
                                      className="ml-3 flex-none rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:opacity-90"
                                    >
                                      {p.price}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Рекламный блок */}
            <div className="my-10 flex items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 py-7 text-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Реклама · Яндекс.Директ</p>
                <p className="mt-1 text-sm text-muted-foreground">Место для рекламного баннера</p>
              </div>
            </div>

            {/* Похожие рецепты — удержание */}
            {suggested.length > 0 && (
              <div>
                <div className="mb-6">
                  <span className="font-accent text-xl text-primary">вам может понравиться</span>
                  <h2 className="font-display text-2xl font-bold">Похожие рецепты</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Из тех же категорий, что у вас в избранном</p>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  {suggested.map((r) => {
                    const i = RECIPES.indexOf(r);
                    return (
                      <div key={r.title} className="hover-lift flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                        <img src={r.img} alt={r.title} className="h-20 w-20 flex-none rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <div className="mb-1 text-xs text-muted-foreground">{r.category} · {r.time} мин</div>
                          <div className="mb-2 truncate font-display font-semibold">{r.title}</div>
                          <div className="text-xs font-semibold text-primary">{r.kbju.kcal} ккал</div>
                        </div>
                        <button
                          onClick={() => { toggle(i); toast(isFav(i) ? `«${r.title}» убрано` : `«${r.title}» в избранном!`); }}
                          className="flex-none rounded-full border border-border p-2 transition-colors hover:border-primary hover:text-primary"
                        >
                          <Icon name="Heart" size={16} className={isFav(i) ? 'fill-primary text-primary' : ''} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTA — подписка на рассылку */}
            <div className="mt-10 rounded-3xl bg-gradient-to-br from-foreground to-foreground/80 p-8 text-background">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2 font-display text-xl font-bold">
                    <Icon name="Mail" size={20} /> Получайте новые рецепты на почту
                  </div>
                  <p className="text-sm text-background/70">Каждую неделю — подборка под ваши любимые категории</p>
                </div>
                <button
                  onClick={() => { navigate('/'); setTimeout(() => document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                  className="flex-none rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:opacity-90"
                >
                  Подписаться →
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <footer className="mt-12 border-t border-border bg-card py-6 text-center text-sm text-muted-foreground">
        <button onClick={() => navigate('/')} className="font-semibold text-primary hover:underline">← На главную</button>
        <span className="mx-3">·</span>© 2026 ВкусноПросто
      </footer>
    </div>
  );
}
