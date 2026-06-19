/**
 * Виджет социальных сетей — фиксированная боковая панель + блок для встройки в страницы.
 */
import { useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { trackEvent } from '@/hooks/useAnalytics';

const SOCIALS = [
  { id: 'vk',       label: 'ВКонтакте',  icon: 'Users',     color: 'bg-[#0077FF]', count: '4.2K', url: 'https://vk.com' },
  { id: 'tg',       label: 'Telegram',   icon: 'Send',       color: 'bg-[#26A5E4]', count: '2.8K', url: 'https://t.me' },
  { id: 'yt',       label: 'YouTube',    icon: 'Youtube',    color: 'bg-[#FF0000]', count: '1.1K', url: 'https://youtube.com' },
  { id: 'dzen',     label: 'Дзен',       icon: 'BookOpen',   color: 'bg-foreground', count: '890', url: 'https://dzen.ru' },
];

interface SocialWidgetProps {
  variant?: 'sidebar' | 'inline';
}

export function SocialWidget({ variant = 'inline' }: SocialWidgetProps) {
  const handleClick = (s: typeof SOCIALS[0]) => {
    trackEvent('affiliate_click', `social_${s.id}`);
    toast(`Переходим в ${s.label} — скоро подключим канал!`);
  };

  if (variant === 'sidebar') {
    return (
      <div className="fixed right-4 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2">
        {SOCIALS.map(s => (
          <button
            key={s.id}
            onClick={() => handleClick(s)}
            title={s.label}
            className={`group flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg transition-all hover:w-36 hover:gap-2 hover:px-3 overflow-hidden ${s.color}`}
          >
            <Icon name={s.icon} size={20} className="flex-none" />
            <span className="hidden whitespace-nowrap text-xs font-bold group-hover:block">{s.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <h3 className="mb-1 font-display text-xl font-bold">Мы в соцсетях</h3>
      <p className="mb-5 text-sm text-muted-foreground">Подписывайтесь — публикуем рецепты каждый день</p>
      <div className="grid grid-cols-2 gap-3">
        {SOCIALS.map(s => (
          <button
            key={s.id}
            onClick={() => handleClick(s)}
            className={`flex items-center gap-3 rounded-2xl p-3 text-white transition-opacity hover:opacity-90 ${s.color}`}
          >
            <Icon name={s.icon} size={22} />
            <div className="text-left">
              <div className="text-xs font-bold">{s.label}</div>
              <div className="text-[11px] opacity-80">{s.count} подписчиков</div>
            </div>
          </button>
        ))}
      </div>

      {/* Шеринг */}
      <div className="mt-4 border-t border-border pt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Поделиться сайтом</p>
        <div className="flex gap-2">
          {[
            { label: 'VK', icon: 'Users', url: `https://vk.com/share.php?url=${encodeURIComponent(window.location.href)}` },
            { label: 'TG', icon: 'Send',  url: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}` },
          ].map(b => (
            <button
              key={b.label}
              onClick={() => { trackEvent('affiliate_click', `share_${b.label}`); window.open(b.url, '_blank'); }}
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary hover:text-primary"
            >
              <Icon name={b.icon} size={13} /> {b.label}
            </button>
          ))}
          <button
            onClick={() => { navigator.clipboard.writeText(window.location.href); toast('Ссылка скопирована!'); }}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary hover:text-primary"
          >
            <Icon name="Link" size={13} /> Скопировать
          </button>
        </div>
      </div>
    </div>
  );
}

export default SocialWidget;
