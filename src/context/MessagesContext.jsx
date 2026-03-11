import { createContext, useContext, useState } from 'react';
import { conversations as initialConvos } from '../data/sampleData';

const MessagesContext = createContext();

export function MessagesProvider({ children }) {
  const [convos, setConvos] = useState(initialConvos);

  function markRead(id) {
    setConvos(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
  }

  function addMessage(convoId, message) {
    setConvos(prev => prev.map(c =>
      c.id === convoId ? { ...c, messages: [...c.messages, message] } : c
    ));
  }

  const totalUnread = convos.reduce((sum, c) => sum + c.unread, 0);

  return (
    <MessagesContext.Provider value={{ convos, setConvos, markRead, addMessage, totalUnread }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  return useContext(MessagesContext);
}
