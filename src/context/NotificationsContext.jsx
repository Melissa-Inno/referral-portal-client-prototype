import { createContext, useContext, useState } from 'react';
import { notifications as initialNotifs } from '../data/sampleData';

const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
  const [notifs, setNotifs] = useState(initialNotifs);

  function markRead(id) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  }

  function dismiss(id) {
    setNotifs(prev => prev.filter(n => n.id !== id));
  }

  return (
    <NotificationsContext.Provider value={{ notifs, markRead, markAllRead, dismiss }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext);
}
