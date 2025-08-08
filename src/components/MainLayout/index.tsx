import React from 'react';
import { Header, I_HeaderProps } from '../Header';

export interface I_MainLayoutProps extends I_HeaderProps {
  children: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  className?: string;
  mainClassName?: string;
}

export const MainLayout: React.FC<I_MainLayoutProps> = ({
  children,
  loading = false,
  error = null,
  onRetry,
  className = '',
  mainClassName = '',
  ...headerProps
}) => {
  if (loading) {
    return (
      <div className={`flex flex-col h-full ${className}`}>
        <Header {...headerProps} />
        <main
          className={`flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-slate-900 p-4 ${mainClassName}`}
        >
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-4"></div>
              <p className="text-slate-500 dark:text-slate-400">Đang tải...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col h-full ${className}`}>
        <Header {...headerProps} />
        <main
          className={`flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-slate-900 p-4 ${mainClassName}`}
        >
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  Thử lại
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <Header {...headerProps} />
      <main
        className={`flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-slate-900 p-4 ${mainClassName}`}
      >
        {children}
      </main>
    </div>
  );
};
