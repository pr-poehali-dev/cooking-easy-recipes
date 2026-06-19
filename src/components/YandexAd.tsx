import { useEffect, useRef } from 'react';

type AdSize = 'horizontal' | 'vertical' | 'square' | 'footer';

interface YandexAdProps {
  blockId?: string;
  size?: AdSize;
  className?: string;
}

const SIZE_STYLES: Record<AdSize, { label: string; h: string; note: string }> = {
  horizontal: { label: '728×90', h: 'h-[90px]', note: 'Горизонтальный баннер' },
  square:     { label: '300×250', h: 'h-[250px]', note: 'Прямоугольник' },
  vertical:   { label: '160×600', h: 'h-[280px]', note: 'Вертикальный баннер' },
  footer:     { label: '970×90', h: 'h-[90px]', note: 'Футер-баннер' },
};

/**
 * Компонент рекламного блока Яндекс.Директ.
 * После получения blockId от Яндекса замените атрибут data-block-id
 * и раскомментируйте скрипт в useEffect.
 */
export default function YandexAd({ blockId = 'YOUR_BLOCK_ID', size = 'horizontal', className = '' }: YandexAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { label, h, note } = SIZE_STYLES[size];

  useEffect(() => {
    // Раскомментируйте после подключения Яндекс.Директ:
    // if (typeof window !== 'undefined' && (window as any).Ya) {
    //   (window as any).Ya.Context.AdvManager.render({ blockId, renderTo: containerRef.current?.id });
    // }
  }, [blockId]);

  return (
    <div
      ref={containerRef}
      id={`ya-ad-${blockId}-${size}`}
      className={`relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-border/60 bg-muted/30 ${h} ${className}`}
    >
      {/* Плейсхолдер — скроется после подключения реального кода */}
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Реклама · Яндекс.Директ · {label}
        </p>
        <p className="text-xs text-muted-foreground/50">{note}</p>
      </div>
    </div>
  );
}
