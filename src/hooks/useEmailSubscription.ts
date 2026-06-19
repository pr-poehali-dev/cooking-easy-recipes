/**
 * Хук подписки на email-рассылку.
 * Хранит подписчиков локально, готов к интеграции с бэкендом.
 */
import { useState } from 'react';
import { trackEvent } from './useAnalytics';

const SUBS_KEY = 'vp_subscribers';
const BONUS_KEY = 'vp_bonus_claimed';

export interface Subscriber {
  email: string;
  name?: string;
  ts: number;
  source: string;   // откуда подписался
  variant: string;  // A/B вариант
}

export function getSubscribers(): Subscriber[] {
  try { return JSON.parse(localStorage.getItem(SUBS_KEY) || '[]'); } catch { return []; }
}

export function useEmailSubscription(source = 'main', variant = 'A') {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const hasBonusClaimed = () => {
    const subs = getSubscribers();
    return subs.some(s => s.email === email);
  };

  const subscribe = async () => {
    trackEvent('subscribe_attempt', source);

    if (!email.includes('@') || !email.includes('.')) {
      setError('Введите корректный email');
      return;
    }

    setLoading(true);
    setError('');

    // Имитация отправки (замените на реальный API)
    await new Promise(r => setTimeout(r, 800));

    const subs = getSubscribers();
    if (subs.some(s => s.email === email)) {
      setError('Этот email уже подписан');
      setLoading(false);
      return;
    }

    const newSub: Subscriber = { email, name, ts: Date.now(), source, variant };
    subs.push(newSub);
    localStorage.setItem(SUBS_KEY, JSON.stringify(subs));
    localStorage.setItem(BONUS_KEY, '1');

    trackEvent('subscribe_success', source);
    setSuccess(true);
    setLoading(false);
  };

  return { email, setEmail, name, setName, loading, success, error, subscribe, hasBonusClaimed };
}
