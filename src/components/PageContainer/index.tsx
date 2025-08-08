import React from 'react';

export interface I_PageContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  centered?: boolean;
}

export const PageContainer: React.FC<I_PageContainerProps> = ({
  children,
  className = '',
  padding = 'medium',
  maxWidth = 'none',
  centered = false,
}) => {
  const paddingClasses = {
    none: '',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
  };

  const maxWidthClasses = {
    none: '',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  const containerClasses = [
    paddingClasses[padding],
    maxWidthClasses[maxWidth],
    centered && maxWidth !== 'none' ? 'mx-auto' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={containerClasses}>{children}</div>;
};
