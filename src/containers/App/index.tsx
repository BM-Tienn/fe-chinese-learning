/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import NotificationsSystem, {
  atalhoTheme,
  setUpNotifications,
  dismissNotification,
} from 'reapop';
import { store } from 'store/configureStore';
import AppRoutes from 'routes';
import { getCookie } from 'utils/cookies';
import { TYPE_COOKIE } from 'utils/constants';
import { AuthProvider } from 'contexts/AuthContext';

// Setup notifications configuration
setUpNotifications({
  defaultProps: {
    allowHTML: true,
    dismissible: true,
    dismissAfter: 3000,
    transition: 'slide',
    position: 'bottom-right',
    showDismissButton: true,
  },
});

// Component to access Redux state
const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Apply dark mode to body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Initialize dark mode on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const isDark = saved ? saved === 'dark' : false;
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  // Get notifications from Redux state
  const notifications = useSelector((state: any) => state.notifications);

  // Check authentication on app load
  useEffect(() => {
    const token = getCookie(TYPE_COOKIE.TOKEN);
    if (token) {
      // dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
        <AppRoutes isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
      <NotificationsSystem
        theme={atalhoTheme}
        notifications={notifications}
        dismissNotification={id => store.dispatch(dismissNotification(id))}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Provider>
  );
};

export default App;
