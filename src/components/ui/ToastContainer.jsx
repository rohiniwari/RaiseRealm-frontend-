import { useState, useEffect } from 'react';
import { useToast } from '../../hooks/useToast.jsx';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  const getToastStyles = (type) => {
    const baseStyles = "flex items-center p-4 mb-4 text-sm rounded-lg transition-all duration-300";
    const typeStyles = {
      success: "text-green-800 border border-green-300 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800",
      error: "text-red-800 border border-red-300 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800",
      warning: "text-yellow-800 border border-yellow-300 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800",
      info: "text-blue-800 border border-blue-300 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
    };
    return `${baseStyles} ${typeStyles[type] || typeStyles.info}`;
  };

  const getIcon = (type) => {
    const icons = {
      success: "✓",
      error: "✕",
      warning: "⚠",
      info: "ℹ"
    };
    return icons[type] || icons.info;
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={getToastStyles(toast.type)}
          role="alert"
        >
          <span className="mr-3 text-lg">{getIcon(toast.type)}</span>
          <div className="flex-1">{toast.message}</div>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-3 text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export { ToastContainer };