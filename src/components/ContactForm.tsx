/**
 * Форма обратной связи с быстрым ответом и трекингом конверсий.
 */
import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { trackEvent } from '@/hooks/useAnalytics';

const CONTACTS_KEY = 'vp_contacts';

interface Message { name: string; email: string; topic: string; text: string; ts: number; }

const TOPICS = ['Вопрос по рецепту', 'Партнёрство', 'Реклама на сайте', 'Техническая проблема', 'Предложение рецепта', 'Другое'];

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) { setError('Введите имя'); return; }
    if (!email.includes('@')) { setError('Введите корректный email'); return; }
    if (text.trim().length < 10) { setError('Напишите хотя бы несколько слов'); return; }

    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 700));

    const msgs: Message[] = JSON.parse(localStorage.getItem(CONTACTS_KEY) || '[]');
    msgs.push({ name, email, topic, text, ts: Date.now() });
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(msgs));

    trackEvent('contact_submit', topic);
    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center">
        <div className="mb-3 text-5xl">✉️</div>
        <h3 className="mb-2 font-display text-xl font-bold">Сообщение отправлено!</h3>
        <p className="text-sm text-muted-foreground">
          Мы отвечаем в течение <strong>2–4 часов</strong> в рабочее время.<br />
          Ответ придёт на <strong>{email}</strong>
        </p>
        <div className="mt-5 rounded-2xl bg-muted/50 p-4 text-left text-sm">
          <p className="font-semibold">Пока ждёте — посмотрите:</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>→ Новые рецепты в разделе «Рецепты дня»</li>
            <li>→ Товары для кухни со скидками в магазине</li>
          </ul>
        </div>
        <button onClick={() => setSent(false)} className="mt-4 text-xs text-primary underline">
          Отправить ещё одно сообщение
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Icon name="MessageSquare" size={24} />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold">Напишите нам</h3>
          <p className="text-sm text-muted-foreground">Обычно отвечаем за 2–4 часа</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-muted-foreground">Ваше имя *</label>
            <input
              value={name} onChange={e => setName(e.target.value)}
              placeholder="Иван Иванов"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-muted-foreground">Email *</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="ivan@example.ru"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-muted-foreground">Тема</label>
          <select
            value={topic} onChange={e => setTopic(e.target.value)}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          >
            {TOPICS.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-muted-foreground">Сообщение *</label>
          <textarea
            value={text} onChange={e => setText(e.target.value)}
            rows={4} placeholder="Опишите ваш вопрос или предложение..."
            className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>

        {error && (
          <p className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-2 text-sm text-destructive">
            <Icon name="AlertCircle" size={15} /> {error}
          </p>
        )}

        <button
          onClick={handleSubmit} disabled={loading}
          className="flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-bold text-primary-foreground disabled:opacity-70"
        >
          {loading
            ? <><Icon name="Loader2" size={18} className="animate-spin" /> Отправляем...</>
            : <><Icon name="Send" size={18} /> Отправить сообщение</>
          }
        </button>
      </div>
    </div>
  );
}

export function getContactMessages(): Message[] {
  try { return JSON.parse(localStorage.getItem(CONTACTS_KEY) || '[]'); } catch { return []; }
}
