import { useState, useEffect, useRef } from 'react';

const VISITORS_KEY = 'vp_visitors';
const SESSION_KEY = 'vp_session';
const TIME_KEY = 'vp_time_total';

function getStoredNumber(key: string, fallback: number): number {
  try { return parseInt(localStorage.getItem(key) || String(fallback), 10); } catch { return fallback; }
}

export function usePageStats() {
  // Счётчик посетителей — эмулируем реалистичный рост
  const [visitors, setVisitors] = useState<number>(() => {
    const stored = getStoredNumber(VISITORS_KEY, 0);
    if (stored === 0) {
      // Первый запуск — случайная база от 11 000 до 14 000
      const base = 11000 + Math.floor(Math.random() * 3000);
      localStorage.setItem(VISITORS_KEY, String(base));
      return base;
    }
    return stored;
  });

  // Время на странице (секунды)
  const [timeOnPage, setTimeOnPage] = useState(0);
  const startRef = useRef(Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Онлайн-счётчик — псевдослучайное число
  const [online] = useState(() => 18 + Math.floor(Math.random() * 24));

  useEffect(() => {
    // Новая сессия — увеличиваем счётчик
    const isNewSession = !sessionStorage.getItem(SESSION_KEY);
    if (isNewSession) {
      sessionStorage.setItem(SESSION_KEY, '1');
      const newCount = visitors + 1;
      setVisitors(newCount);
      localStorage.setItem(VISITORS_KEY, String(newCount));
    }

    // Таймер времени на странице
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
      setTimeOnPage(elapsed);
      // Сохраняем накопленное время
      const prev = getStoredNumber(TIME_KEY, 0);
      localStorage.setItem(TIME_KEY, String(prev + 1));
    }, 1000);

    // Предупреждение при уходе со страницы (удержание)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (timeOnPage > 30) {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const formatTime = (sec: number): string => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m > 0 ? `${m}м ${s}с` : `${s}с`;
  };

  const formatVisitors = (n: number): string => {
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace('.', ',')} тыс.`;
    return String(n);
  };

  return { visitors, online, timeOnPage, formatTime, formatVisitors };
}
