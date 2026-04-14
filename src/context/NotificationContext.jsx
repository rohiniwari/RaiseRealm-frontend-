import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '../hooks/useToast';
import { NotificationBell } from '../components/layout/NotificationBell';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  const addNotification = (message, type = 'info', link = null) => {
    const notif = {
      id: Date.now(),
      message,
      type,
      link,
      read: false,
      timestamp: new Date().toLocaleString()
    };
    setNotifications(prev => [notif, ...prev]);
    setUnreadCount(prev => prev + 1);
    
    // Browser push notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('RaiseRealm Update', { body: message, icon: '/logo.png' });
    }

    toast({
      title: type.toUpperCase(),
      description: message,
    });
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, clearAll }}>
      {children}
      <NotificationBell />
    </NotificationContext.Provider>
  );
};

