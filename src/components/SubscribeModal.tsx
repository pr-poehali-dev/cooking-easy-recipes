/**
 * Попап email-подписки с бонусом — сборник рецептов.
 * Показывается через 30 секунд или при попытке уйти со страницы.
 */
import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { useEmailSubscription } from '@/hooks/useEmailSubscription';
import { getAbVariant } from '@/hooks/useAnalytics';

const SHOWN_KEY = 'vp_modal_shown';

interface Props {
  onClose: () => void;
}

export default function SubscribeModal({ onClose }: Props) {
  const variant = getAbVariant();
  const { email, setEmail, name, setName, loading, success, error, subscribe } =
    useEmailSubscription('popup', variant);

  const isVariantB = variant === 'B';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Оверлей */}
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md animate-scale-in overflow-hidden rounded-3xl bg-card shadow-2xl">
        {/* Кнопка закрыть */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
        >
          <Icon name="X" size={16} />
        </button>

        {/* Шапка */}
        <div className={`px-8 pt-8 pb-6 text-center ${isVariantB ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground' : 'bg-muted/30'}`}>
          <div className="mb-3 text-5xl">{isVariantB ? '🎁' : '📬'}</div>
          <h2 className="font-display text-2xl font-bold">
            {isVariantB
              ? 'Получи сборник 30 рецептов бесплатно!'
              : 'Подпишитесь на новые рецепты'}
          </h2>
          <p className={`mt-2 text-sm ${isVariantB ? 'text-primary-foreground/85' : 'text-muted-foreground'}`}>
            {isVariantB
              ? 'Введите email — мы пришлём PDF-сборник «30 быстрых рецептов с КБЖУ» прямо сейчас'
              : 'Каждую неделю — новые рецепты с расчётом калорий и КБЖУ на вашу почту'}
          </p>
          {isVariantB && (
            <div className="mt-3 flex justify-center gap-3 text-xs text-primary-foreground/80">
              <span>✓ 30 рецептов PDF</span>
              <span>✓ Расчёт КБЖУ</span>
              <span>✓ Бесплатно</span>
            </div>
          )}
        </div>

        {/* Форма */}
        <div className="px-8 py-6">
          {success ? (
            <div className="text-center">
              <div className="mb-3 text-4xl">🎉</div>
              <h3 className="mb-1 font-display text-xl font-bold">Готово!</h3>
              <p className="text-sm text-muted-foreground">
                {isVariantB
                  ? 'Сборник рецептов уже летит на ваш email. Проверьте папку «Входящие»!'
                  : 'Вы подписаны! Первая подборка придёт на следующей неделе.'}
              </p>
              <button onClick={onClose} className="mt-5 w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground">
                Отлично, спасибо!
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {isVariantB && (
                <div className="relative">
                  <Icon name="User" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full rounded-full border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-primary"
                  />
                </div>
              )}
              <div className="relative">
                <Icon name="Mail" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && subscribe()}
                  placeholder="Ваш email"
                  className="w-full rounded-full border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-primary"
                />
              </div>
              {error && <p className="text-center text-xs text-destructive">{error}</p>}
              <button
                onClick={subscribe}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 font-bold text-primary-foreground disabled:opacity-70"
              >
                {loading ? <Icon name="Loader2" size={18} className="animate-spin" /> : <Icon name="Send" size={18} />}
                {isVariantB ? 'Получить сборник бесплатно' : 'Подписаться на рецепты'}
              </button>
              <p className="text-center text-[11px] text-muted-foreground">
                Без спама. Отписаться можно в любой момент.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Хук управления показом модала
export function useSubscribeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(SHOWN_KEY)) return;

    // Показываем через 30 сек
    const timer = setTimeout(() => {
      setOpen(true);
      localStorage.setItem(SHOWN_KEY, '1');
    }, 30000);

    // Или при попытке уйти (exit intent)
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem(SHOWN_KEY)) {
        setOpen(true);
        localStorage.setItem(SHOWN_KEY, '1');
      }
    };
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return { open, setOpen };
}
