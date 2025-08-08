import React from 'react';
import { Typography, Avatar, Badge, Button } from 'antd';
import { ArrowLeft, Bell } from 'lucide-react';

const { Title } = Typography;

export interface I_HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  rightContent?: React.ReactNode;
  showUserAvatar?: boolean;
  userAvatar?: string;
  userInitials?: string;
  notificationCount?: number;
  onNotificationClick?: () => void;
  className?: string;
}

export const Header: React.FC<I_HeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  onBackClick,
  rightContent,
  showUserAvatar = false,
  userAvatar,
  userInitials = 'U',
  notificationCount = 0,
  onNotificationClick,
  className = '',
}) => {
  return (
    <header
      className={`flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0 ${className}`}
    >
      {/* Left side */}
      <div className="flex items-center">
        {showBackButton && (
          <button
            onClick={onBackClick}
            className="mr-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div className="ml-4">
          <Title level={2} className="!mb-0 text-slate-800 dark:text-slate-200">
            {title}
          </Title>
          {subtitle && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-3">
        {rightContent}

        {showUserAvatar && (
          <div className="flex items-center space-x-2">
            {notificationCount > 0 && (
              <Badge count={notificationCount} size="small">
                <Button
                  type="text"
                  icon={<Bell className="w-5 h-5" />}
                  onClick={onNotificationClick}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                />
              </Badge>
            )}
            <Avatar
              size={40}
              src={userAvatar}
              className="bg-indigo-500 text-white font-semibold"
            >
              {userInitials}
            </Avatar>
          </div>
        )}
      </div>
    </header>
  );
};
