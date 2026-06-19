/**
 * Дашборд владельца сайта: метрики дохода, конверсии, A/B тест, поведение.
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { getEvents, clearEvents, AnalyticsEvent, getAbVariant } from '@/hooks/useAnalytics';
import { getSubscribers } from '@/hooks/useEmailSubscription';
import { getContactMessages } from '@/components/ContactForm';
import { useFavorites } from '@/hooks/useFavorites';

const PASS = 'admin123'; // Простая защита

function MetricCard({ label, value, sub, icon, color }: {
  label: string; value: string | number; sub?: string; icon: string; color: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${color} text-white`}>
          <Icon name={icon} size={18} />
        </div>
      </div>
      <div className="font-display text-3xl font-bold">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

function MiniBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-32 truncate text-sm text-muted-foreground">{label}</span>
      <div className="flex-1 overflow-hidden rounded-full bg-muted h-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 text-right text-sm font-bold">{value}</span>
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [tab, setTab] = useState<'overview' | 'conversions' | 'ab' | 'behavior' | 'subscribers'>('overview');
  const { count: favCount } = useFavorites();

  useEffect(() => {
    if (authed) setEvents(getEvents());
  }, [authed]);

  const subscribers = getSubscribers();
  const messages = getContactMessages();
  const abVariant = getAbVariant();

  // Агрегация событий
  const count = (type: string) => events.filter(e => e.type === type).length;
  const countLabel = (type: string, label: string) => events.filter(e => e.type === type && e.label === label).length;

  const pageViews = count('page_view');
  const recipeOpens = count('recipe_open');
  const favAdds = count('favorite_add');
  const shopClicks = count('shop_click');
  const subAttempts = count('subscribe_attempt');
  const subSuccess = count('subscribe_success');
  const premiumClicks = count('premium_click');
  const affiliateClicks = count('affiliate_click');
  const contactSubmits = count('contact_submit');

  const convRate = subAttempts > 0 ? Math.round((subSuccess / subAttempts) * 100) : 0;
  const engageRate = pageViews > 0 ? Math.round(((recipeOpens + favAdds) / pageViews) * 100) : 0;

  // A/B данные
  const abSubsA = subscribers.filter(s => s.variant === 'A').length;
  const abSubsB = subscribers.filter(s => s.variant === 'B').length;
  const totalAB = abSubsA + abSubsB;
  const abWinner = abSubsB > abSubsA ? 'B' : 'A';

  // Поведение — топ событий
  const eventTypes = Array.from(new Set(events.map(e => e.type)));
  const topEvents = eventTypes
    .map(t => ({ type: t, count: count(t) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Расчёт дохода (примерный)
  const estAdRevenue = Math.round(pageViews * 0.015); // ~1.5 руб за показ
  const estAffRevenue = Math.round(affiliateClicks * 45); // ~45 руб комиссия
  const estSubRevenue = Math.round(subSuccess * 299); // средний чек подписки
  const totalRevenue = estAdRevenue + estAffRevenue + estSubRevenue;

  if (!authed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Icon name="BarChart3" size={28} />
        </div>
        <h1 className="font-display text-2xl font-bold">Дашборд аналитики</h1>
        <p className="text-sm text-muted-foreground">Введите пароль для доступа</p>
        <div className="flex gap-2">
          <input
            type="password" value={pass} onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && pass === PASS && setAuthed(true)}
            placeholder="Пароль"
            className="rounded-full border border-border bg-background px-5 py-2.5 text-sm outline-none focus:border-primary"
          />
          <button
            onClick={() => pass === PASS ? setAuthed(true) : alert('Неверный пароль')}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
          >Войти</button>
        </div>
        <p className="text-xs text-muted-foreground">Подсказка: admin123</p>
        <button onClick={() => navigate('/')} className="text-xs text-primary underline">← На главную</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b border-border bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Icon name="BarChart3" size={20} />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold">Дашборд доходов</h1>
              <p className="text-xs text-muted-foreground">ВкусноПросто · Аналитика</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { clearEvents(); setEvents([]); }}
              className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-destructive"
            >
              <Icon name="Trash2" size={13} className="mr-1 inline" /> Сбросить
            </button>
            <button onClick={() => navigate('/')} className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">
              На сайт →
            </button>
          </div>
        </div>

        {/* Табы */}
        <div className="mt-4 flex gap-1 overflow-x-auto">
          {([
            ['overview', 'Обзор', 'LayoutDashboard'],
            ['conversions', 'Конверсии', 'TrendingUp'],
            ['ab', 'A/B тест', 'FlaskConical'],
            ['behavior', 'Поведение', 'MousePointer'],
            ['subscribers', 'Подписчики', 'Users'],
          ] as const).map(([id, label, icon]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${tab === id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon name={icon} size={13} /> {label}
            </button>
          ))}
        </div>
      </header>

      <div className="container max-w-6xl py-8">

        {/* ОБЗОР */}
        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard label="Просмотры страниц" value={pageViews} sub="за всё время" icon="Eye" color="bg-primary" />
              <MetricCard label="Email-подписчиков" value={subscribers.length} sub={`конверсия ${convRate}%`} icon="Mail" color="bg-accent" />
              <MetricCard label="Клики по магазину" value={shopClicks + affiliateClicks} sub="партнёрские" icon="ShoppingCart" color="bg-secondary" />
              <MetricCard label="Избранных рецептов" value={favCount} sub="у текущего пользователя" icon="Heart" color="bg-destructive" />
            </div>

            {/* Расчётный доход */}
            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="mb-4 font-display text-xl font-bold">Расчётный доход</h2>
              <div className="grid gap-4 sm:grid-cols-4">
                {[
                  { label: 'Реклама (РСЯ)', value: estAdRevenue, icon: 'Tv', note: '≈1,5₽/показ' },
                  { label: 'Партнёрки', value: estAffRevenue, icon: 'ShoppingBag', note: '≈45₽/клик' },
                  { label: 'Подписка', value: estSubRevenue, icon: 'Crown', note: '≈299₽/подп.' },
                  { label: 'Итого', value: totalRevenue, icon: 'Wallet', note: 'прогноз' },
                ].map(m => (
                  <div key={m.label} className={`rounded-2xl p-4 ${m.label === 'Итого' ? 'bg-primary text-primary-foreground' : 'bg-muted/50'}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <Icon name={m.icon} size={16} />
                      <span className="text-xs font-semibold">{m.label}</span>
                    </div>
                    <div className="font-display text-2xl font-bold">{m.value.toLocaleString('ru')} ₽</div>
                    <div className={`text-[11px] ${m.label === 'Итого' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{m.note}</div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                * Расчёт примерный, основан на статистике из вашего браузера. Реальные данные будут после подключения Яндекс.Директ и партнёрских программ.
              </p>
            </div>

            {/* Быстрые метрики */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="mb-3 font-semibold">Вовлечённость</h3>
                <div className="font-display text-4xl font-bold text-primary">{engageRate}%</div>
                <p className="text-xs text-muted-foreground">пользователей взаимодействуют с рецептами</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="mb-3 font-semibold">Обращения</h3>
                <div className="font-display text-4xl font-bold text-accent">{messages.length}</div>
                <p className="text-xs text-muted-foreground">сообщений через форму обратной связи</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="mb-3 font-semibold">Клики Премиум</h3>
                <div className="font-display text-4xl font-bold text-secondary">{premiumClicks}</div>
                <p className="text-xs text-muted-foreground">интереса к платной подписке</p>
              </div>
            </div>
          </div>
        )}

        {/* КОНВЕРСИИ */}
        {tab === 'conversions' && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <MetricCard label="Попыток подписки" value={subAttempts} icon="Send" color="bg-muted-foreground" />
              <MetricCard label="Успешных подписок" value={subSuccess} sub={`${convRate}% конверсия`} icon="CheckCircle" color="bg-accent" />
              <MetricCard label="Кликов Купить" value={affiliateClicks} sub="партнёрские" icon="ShoppingCart" color="bg-primary" />
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="mb-5 font-display text-xl font-bold">Воронка конверсий</h2>
              <div className="space-y-4">
                {[
                  { label: 'Визиты на сайт', val: pageViews, color: 'bg-primary' },
                  { label: 'Открыли рецепты', val: recipeOpens, color: 'bg-accent' },
                  { label: 'Добавили в избранное', val: favAdds, color: 'bg-secondary' },
                  { label: 'Попытки подписки', val: subAttempts, color: 'bg-primary/60' },
                  { label: 'Успешные подписки', val: subSuccess, color: 'bg-accent/60' },
                  { label: 'Клики партнёрок', val: affiliateClicks, color: 'bg-secondary/60' },
                ].map(r => (
                  <MiniBar key={r.label} label={r.label} value={r.val} max={pageViews || 1} color={r.color} />
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="mb-4 font-display text-xl font-bold">Сообщения из формы</h2>
              {messages.length === 0 ? (
                <p className="text-sm text-muted-foreground">Сообщений пока нет</p>
              ) : (
                <div className="space-y-3">
                  {messages.slice().reverse().slice(0, 5).map((m, i) => (
                    <div key={i} className="rounded-2xl bg-muted/50 p-4">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-semibold">{m.name} · {m.email}</span>
                        <span className="text-xs text-muted-foreground">{new Date(m.ts).toLocaleDateString('ru')}</span>
                      </div>
                      <div className="mb-1 text-xs font-medium text-primary">{m.topic}</div>
                      <p className="text-sm text-muted-foreground">{m.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* A/B ТЕСТ */}
        {tab === 'ab' && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="mb-2 flex items-center gap-3">
                <Icon name="FlaskConical" size={24} className="text-primary" />
                <h2 className="font-display text-xl font-bold">A/B тест попапа подписки</h2>
              </div>
              <p className="mb-6 text-sm text-muted-foreground">
                Вариант <strong>A</strong> — стандартный призыв «Подписаться на рецепты».
                Вариант <strong>B</strong> — «Получи сборник 30 рецептов бесплатно!» с бонусом.
              </p>

              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                {[
                  { v: 'A', subs: abSubsA, label: 'Стандартный призыв', color: 'border-muted' },
                  { v: 'B', subs: abSubsB, label: 'С бонусом (PDF-сборник)', color: 'border-primary' },
                ].map(ab => (
                  <div key={ab.v} className={`rounded-2xl border-2 p-5 ${ab.color} ${abWinner === ab.v ? 'bg-primary/5' : ''}`}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-display text-2xl font-bold">Вариант {ab.v}</span>
                      {abWinner === ab.v && totalAB > 0 && (
                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">Победитель</span>
                      )}
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">{ab.label}</p>
                    <div className="font-display text-4xl font-bold text-primary">{ab.subs}</div>
                    <div className="text-sm text-muted-foreground">подписок</div>
                    {totalAB > 0 && (
                      <div className="mt-2 text-sm font-semibold">
                        Конверсия: {Math.round((ab.subs / (totalAB || 1)) * 100)}%
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-muted/50 p-4">
                <p className="text-sm font-semibold">Ваш текущий вариант: <span className="text-primary">{abVariant}</span></p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Вариант назначается случайно при первом визите и сохраняется в браузере.
                  После накопления 50+ результатов оставьте только выигрышный вариант.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ПОВЕДЕНИЕ */}
        {tab === 'behavior' && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="mb-5 font-display text-xl font-bold">Топ действий пользователей</h2>
              <div className="space-y-3">
                {topEvents.length === 0
                  ? <p className="text-sm text-muted-foreground">Событий пока нет — пользуйтесь сайтом, данные появятся</p>
                  : topEvents.map(e => (
                    <MiniBar key={e.type} label={e.type.replace(/_/g, ' ')} value={e.count}
                      max={topEvents[0]?.count || 1} color="bg-primary" />
                  ))
                }
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="mb-4 font-display text-xl font-bold">Последние 20 событий</h2>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {events.slice().reverse().slice(0, 20).map((e, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-muted/40 px-4 py-2 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-mono text-primary">{e.type}</span>
                      {e.label && <span className="text-muted-foreground">{e.label}</span>}
                    </div>
                    <span className="text-xs text-muted-foreground">{new Date(e.ts).toLocaleTimeString('ru')}</span>
                  </div>
                ))}
                {events.length === 0 && <p className="text-sm text-muted-foreground">Событий пока нет</p>}
              </div>
            </div>
          </div>
        )}

        {/* ПОДПИСЧИКИ */}
        {tab === 'subscribers' && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <MetricCard label="Всего подписчиков" value={subscribers.length} icon="Users" color="bg-primary" />
              <MetricCard label="Через попап (A)" value={abSubsA} icon="MousePointer" color="bg-accent" />
              <MetricCard label="С бонусом (B)" value={abSubsB} sub="PDF-сборник" icon="Gift" color="bg-secondary" />
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="mb-4 font-display text-xl font-bold">Список подписчиков</h2>
              {subscribers.length === 0 ? (
                <p className="text-sm text-muted-foreground">Подписчиков пока нет</p>
              ) : (
                <div className="space-y-2">
                  {subscribers.slice().reverse().map((s, i) => (
                    <div key={i} className="flex items-center justify-between rounded-2xl bg-muted/40 px-4 py-3">
                      <div>
                        <div className="font-semibold">{s.name || '—'} · <span className="font-normal text-muted-foreground">{s.email}</span></div>
                        <div className="text-xs text-muted-foreground">источник: {s.source} · вариант {s.variant}</div>
                      </div>
                      <span className="text-xs text-muted-foreground">{new Date(s.ts).toLocaleDateString('ru')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
