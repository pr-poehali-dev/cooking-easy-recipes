/**
 * Система push-уведомлений о новых рецептах.
 * Использует браузерный Notification API + localStorage для хранения статуса.
 */
import { useState, useEffect } from 'react';

const PERM_KEY = 'vp_notif_granted';
const LAST_NOTIF_KEY = 'vp_last_notif';

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [supported] = useState(() => 'Notification' in window);

  useEffect(() => {
    if (supported) setPermission(Notification.permission);
  }, [supported]);

  const requestPermission = async (): Promise<boolean> => {
    if (!supported) return false;
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === 'granted') {
      localStorage.setItem(PERM_KEY, '1');
      // Сразу шлём приветственное уведомление
      sendNotification('ВкусноПросто 🍳', 'Уведомления включены! Будем сообщать о новых рецептах.');
    }
    return result === 'granted';
  };

  const sendNotification = (title: string, body: string, icon = '/favicon.svg') => {
    if (Notification.permission !== 'granted') return;
    new Notification(title, { body, icon });
    localStorage.setItem(LAST_NOTIF_KEY, String(Date.now()));
  };

  const sendRecipeNotification = (recipe: string, category: string) => {
    sendNotification(
      `Новый рецепт: ${recipe} 🍽`,
      `В разделе «${category}» появился новый быстрый рецепт с расчётом КБЖУ!`
    );
  };

  return { permission, supported, requestPermission, sendNotification, sendRecipeNotification };
}
