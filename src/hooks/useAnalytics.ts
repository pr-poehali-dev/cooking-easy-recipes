/**
 * Хук аналитики: трекинг конверсий, A/B тест, поведение пользователя.
 * Данные хранятся в localStorage и отображаются на дашборде.
 */
import { useEffect, useCallback } from 'react';

export type EventType =
  | 'page_view'
  | 'recipe_open'
  | 'favorite_add'
  | 'shop_click'
  | 'subscribe_attempt'
  | 'subscribe_success'
  | 'premium_click'
  | 'course_click'
  | 'affiliate_click'
  | 'contact_submit'
  | 'ad_impression'
  | 'category_click'
  | 'search';

export interface AnalyticsEvent {
  type: EventType;
  label?: string;
  value?: number;
  ts: number;
}

const EVENTS_KEY = 'vp_analytics_events';
const AB_KEY = 'vp_ab_variant';

// A/B тест: вариант A — обычный призыв, вариант B — с бонусом
export function getAbVariant(): 'A' | 'B' {
  const stored = localStorage.getItem(AB_KEY);
  if (stored === 'A' || stored === 'B') return stored;
  const v = Math.random() < 0.5 ? 'A' : 'B';
  localStorage.setItem(AB_KEY, v);
  return v;
}

export function trackEvent(type: EventType, label?: string, value?: number) {
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    events.push({ type, label, value, ts: Date.now() });
    // Храним последние 500 событий
    if (events.length > 500) events.splice(0, events.length - 500);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch { /* silent */ }
}

export function getEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function clearEvents() {
  localStorage.removeItem(EVENTS_KEY);
}

export function useAnalytics() {
  const track = useCallback((type: EventType, label?: string, value?: number) => {
    trackEvent(type, label, value);
  }, []);

  // Автоматически трекаем page_view
  useEffect(() => {
    track('page_view', window.location.pathname);
  }, []);

  // Трекаем глубину скролла
  useEffect(() => {
    let maxScroll = 0;
    const onScroll = () => {
      const pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (pct > maxScroll + 25) {
        maxScroll = pct;
        track('page_view', `scroll_${pct}pct`, pct);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { track, abVariant: getAbVariant() };
}
