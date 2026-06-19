import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  SHOP_PRODUCTS, SHOP_SECTIONS, ShopProduct,
  AFFILIATE_COLORS, CATEGORY_ICONS,
} from '@/data';
import YandexAd from '@/components/YandexAd';

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1">
      {[1,2,3,4,5].map(s => (
        <Icon key={s} name="Star" size={12}
          className={s <= Math.round(rating) ? 'fill-secondary text-secondary' : 'text-muted-foreground/30'} />
      ))}
    </span>
  );
}

function ProductCard({ product, onBuy }: { product: ShopProduct; onBuy: (p: ShopProduct) => void }) {
  const affiliateClass = AFFILIATE_COLORS[product.affiliate] || 'bg-muted text-muted-foreground';
  return (
    <div className="hover-lift flex flex-col overflow-hidden rounded-3xl border border-border bg-card">
      {/* Фото */}
      <div className="relative overflow-hidden">
        <img src={product.img} alt={product.name} className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105" />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
            {product.tag}
          </span>
        )}
        <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold ${affiliateClass}`}>
          {product.affiliate}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 text-xs font-medium text-muted-foreground">{product.shopSection}</div>
        <h3 className="mb-1 font-display text-lg font-bold leading-snug">{product.name}</h3>
        <p className="mb-3 flex-1 text-sm text-muted-foreground">{product.desc}</p>

        {/* Категории рецептов */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {product.categories.map(c => (
            <span key={c} className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              <Icon name={CATEGORY_ICONS[c] || 'Utensils'} size={10} /> {c}
            </span>
          ))}
        </div>

        {/* Рейтинг */}
        <div className="mb-4 flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs font-semibold">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews} отзывов)</span>
        </div>

        {/* Цена и кнопка */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="font-display text-2xl font-bold text-primary">
              {product.price.toLocaleString('ru')} ₽
            </div>
            {product.oldPrice && (
              <div className="text-xs text-muted-foreground line-through">
                {product.oldPrice.toLocaleString('ru')} ₽
              </div>
            )}
          </div>
          <button
            onClick={() => onBuy(product)}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Icon name="ShoppingCart" size={15} /> Купить
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'cheap' | 'expensive'>('popular');

  const recipeCategories = Object.keys(CATEGORY_ICONS);

  const handleBuy = (p: ShopProduct) => {
    toast(
      <div className="flex items-center gap-3">
        <Icon name="ShoppingCart" size={18} className="text-primary" />
        <div>
          <div className="font-semibold">Переходим в {p.affiliate}</div>
          <div className="text-xs text-muted-foreground">«{p.name}» — {p.price.toLocaleString('ru')} ₽</div>
        </div>
      </div>
    );
    // Открываем ссылку (после подключения реального affiliate)
    window.open(p.url, '_blank');
  };

  let filtered = SHOP_PRODUCTS.filter(p => {
    const secOk = !activeSection || p.shopSection === activeSection;
    const catOk = !activeCategory || p.categories.includes(activeCategory);
    return secOk && catOk;
  });

  if (sortBy === 'cheap') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'expensive') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'popular') filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);

  const totalSavings = filtered
    .filter(p => p.oldPrice)
    .reduce((s, p) => s + (p.oldPrice! - p.price), 0);

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
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <Icon name="ArrowLeft" size={16} /> На главную
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12">
        <div className="absolute -right-10 top-0 h-60 w-60 rounded-full bg-secondary/20 blur-3xl" />
        <div className="container relative">
          <span className="font-accent text-2xl text-primary">партнёрский магазин</span>
          <h1 className="mt-1 font-display text-4xl font-bold md:text-5xl">Товары для кухни</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Подбираем товары специально под рецепты нашего сайта. Покупаете — мы получаем небольшой процент, для вас цена та же.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-semibold">
              <Icon name="Package" size={15} className="text-primary" /> {SHOP_PRODUCTS.length} товаров
            </span>
            <span className="flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-semibold">
              <Icon name="Store" size={15} className="text-accent" /> 3 маркетплейса
            </span>
            {totalSavings > 0 && (
              <span className="flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-semibold text-primary">
                <Icon name="Tag" size={15} /> Экономия до {totalSavings.toLocaleString('ru')} ₽
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="container py-8">

        {/* Фильтры по разделам */}
        <div className="mb-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Раздел</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSection(null)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${!activeSection ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
            >
              Все
            </button>
            {SHOP_SECTIONS.map(s => (
              <button
                key={s}
                onClick={() => setActiveSection(activeSection === s ? null : s)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${activeSection === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Фильтр по категориям рецептов */}
        <div className="mb-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Для каких рецептов</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${!activeCategory ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
            >
              Все категории
            </button>
            {recipeCategories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(activeCategory === c ? null : c)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${activeCategory === c ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
              >
                <Icon name={CATEGORY_ICONS[c]} size={13} /> {c}
              </button>
            ))}
          </div>
        </div>

        {/* Сортировка и счётчик */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Найдено: <strong className="text-foreground">{filtered.length}</strong> товаров</span>
          <div className="flex gap-2">
            {([['popular','По популярности'], ['cheap','Дешевле'], ['expensive','Дороже']] as const).map(([v, label]) => (
              <button
                key={v}
                onClick={() => setSortBy(v)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${sortBy === v ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Каталог */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground opacity-30" />
            <p className="text-lg font-semibold">Товары не найдены</p>
            <button onClick={() => { setActiveSection(null); setActiveCategory(null); }} className="mt-4 text-sm text-primary underline">
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, idx) => (
              <>
                <ProductCard key={p.id} product={p} onBuy={handleBuy} />
                {idx === 3 && (
                  <div key="ad" className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                    <YandexAd size="horizontal" blockId="shop-mid" className="w-full" />
                  </div>
                )}
              </>
            ))}
          </div>
        )}

        {/* Баннер маркетплейсов */}
        <div className="mt-12 rounded-3xl border border-border bg-card p-6 md:p-8">
          <h2 className="mb-2 font-display text-2xl font-bold">Где мы рекомендуем покупать</h2>
          <p className="mb-6 text-sm text-muted-foreground">Все ссылки ведут на проверенные маркетплейсы с защитой покупателя</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { name: 'Wildberries', desc: 'Быстрая доставка, широкий выбор посуды', color: 'bg-purple-50 border-purple-200', textColor: 'text-purple-700', count: SHOP_PRODUCTS.filter(p => p.affiliate === 'Wildberries').length },
              { name: 'Ozon', desc: 'Техника и гаджеты для кухни', color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-700', count: SHOP_PRODUCTS.filter(p => p.affiliate === 'Ozon').length },
              { name: 'Яндекс.Маркет', desc: 'Специи, продукты и мелкая техника', color: 'bg-yellow-50 border-yellow-200', textColor: 'text-yellow-700', count: SHOP_PRODUCTS.filter(p => p.affiliate === 'Яндекс.Маркет').length },
            ].map(m => (
              <button
                key={m.name}
                onClick={() => toast(`Переходим на ${m.name} — скоро подключим!`)}
                className={`rounded-2xl border p-5 text-left transition-all hover:shadow-md ${m.color}`}
              >
                <div className={`mb-1 font-display text-lg font-bold ${m.textColor}`}>{m.name}</div>
                <div className="mb-2 text-xs text-muted-foreground">{m.desc}</div>
                <div className={`text-xs font-semibold ${m.textColor}`}>{m.count} товаров →</div>
              </button>
            ))}
          </div>
        </div>

        <YandexAd size="horizontal" blockId="shop-bottom" className="mt-8 w-full" />
      </div>

      <footer className="mt-8 border-t border-border bg-card py-6 text-center text-sm text-muted-foreground">
        <button onClick={() => navigate('/')} className="font-semibold text-primary hover:underline">← На главную</button>
        <span className="mx-3">·</span>© 2026 ВкусноПросто
      </footer>
    </div>
  );
}
