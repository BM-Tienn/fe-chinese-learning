/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Menu, Dropdown } from 'antd';
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Layers,
  PenSquare,
  Sun,
  Moon,
  Menu as MenuIcon,
  Settings,
  Users,
  FileText,
  Target,
  BarChart3,
  Calendar,
  BookMarked,
} from 'lucide-react';
import { useAuth } from 'contexts/AuthContext';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

interface SidebarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isMobileOpen?: boolean;
  onMobileToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isDarkMode,
  toggleTheme,
  isMobileOpen = false,
  onMobileToggle,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAdminExpanded, setIsAdminExpanded] = useState(false);
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  const navItems = [
    {
      path: '/dashboard',
      icon: LayoutDashboard,
      label: 'Bảng điều khiển',
      tooltip: 'Tổng quan học tập',
    },
    {
      path: '/courses',
      icon: BookOpen,
      label: 'Khóa học',
      tooltip: 'Danh sách khóa học',
    },
    {
      path: '/flashcards',
      icon: Layers,
      label: 'Flashcard',
      tooltip: 'Ôn tập từ vựng',
    },
    {
      path: '/writing-practice',
      icon: PenSquare,
      label: 'Luyện viết',
      tooltip: 'Thực hành viết chữ',
    },
  ];

  const adminSubItems = [
    {
      path: '/admin',
      icon: Settings,
      label: 'Tổng quan',
      tooltip: 'Tổng quan quản trị',
    },
    {
      path: '/admin/users',
      icon: Users,
      label: 'Người dùng',
      tooltip: 'Quản lý người dùng',
    },
    {
      path: '/admin/courses',
      icon: BookOpen,
      label: 'Khóa học',
      tooltip: 'Quản lý khóa học',
    },
    {
      path: '/admin/lessons',
      icon: FileText,
      label: 'Bài học',
      tooltip: 'Quản lý bài học',
    },
    {
      path: '/admin/flashcards',
      icon: Layers,
      label: 'Flashcard',
      tooltip: 'Quản lý flashcard',
    },
    {
      path: '/admin/vocabularies',
      icon: BookMarked,
      label: 'Từ vựng',
      tooltip: 'Quản lý từ vựng',
    },
    {
      path: '/admin/words',
      icon: GraduationCap,
      label: 'Từ',
      tooltip: 'Quản lý từ',
    },
    {
      path: '/admin/configurations',
      icon: Settings,
      label: 'Cấu hình',
      tooltip: 'Cấu hình hệ thống',
    },
    {
      path: '/admin/study-sessions',
      icon: BarChart3,
      label: 'Phiên học',
      tooltip: 'Phiên học tập',
    },
    {
      path: '/admin/user-progress',
      icon: Target,
      label: 'Tiến độ',
      tooltip: 'Tiến độ người dùng',
    },
    {
      path: '/admin/user-goals',
      icon: Calendar,
      label: 'Mục tiêu',
      tooltip: 'Mục tiêu người dùng',
    },
  ];

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Sử dụng logout từ AuthContext để clear tất cả dữ liệu
      await logout();

      // Redirect về trang login
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const profileMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ cá nhân',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
      onClick: () => navigate('/settings'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: loading ? (
        <div className="animate-spin">⏳</div>
      ) : (
        <LogoutOutlined />
      ),
      label: loading ? 'Đang đăng xuất...' : 'Đăng xuất',
      onClick: handleLogout,
      disabled: loading,
    },
  ];

  // Create menu items with admin sub-items
  const createMenuItems = () => {
    const items = navItems.map(item => {
      const Icon = item.icon;
      return {
        key: item.path,
        icon: <Icon className="w-5 h-5" />,
        label: !isCollapsed ? item.label : null,
        onClick: () => {
          navigate(item.path);
          if (onMobileToggle) {
            onMobileToggle();
          }
        },
      };
    });

    // Add admin section if user is admin
    if (isAdmin) {
      // Admin main item
      items.push({
        key: 'admin',
        icon: <Settings className="w-5 h-5" />,
        label: !isCollapsed ? 'Quản trị' : null,
        onClick: () => {
          if (isCollapsed) {
            navigate('/admin');
          } else {
            setIsAdminExpanded(!isAdminExpanded);
          }
        },
      });

      // Admin sub-items (only show when expanded and not collapsed)
      if (isAdminExpanded && !isCollapsed) {
        adminSubItems.forEach(item => {
          const Icon = item.icon;
          items.push({
            key: item.path,
            icon: <Icon className="w-4 h-4 ml-4" />,
            label: item.label,
            onClick: () => {
              navigate(item.path);
              if (onMobileToggle) {
                onMobileToggle();
              }
            },
          });
        });
      }
    }

    return items;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onMobileToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 
        fixed inset-y-0 left-0 z-30 transform transition-all duration-300 ease-in-out 
        md:relative md:translate-x-0 md:flex md:flex-col
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center">
            <GraduationCap className="w-6 h-6 text-indigo-500 flex-shrink-0" />
            {!isCollapsed && (
              <span className="ml-3 text-lg font-bold text-indigo-500 truncate">
                Chinese Learning
              </span>
            )}
          </div>
          <Button
            type="text"
            size="small"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:block p-1 h-6 w-6 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            <MenuIcon className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow px-3 overflow-y-auto mt-2">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            className="bg-transparent border-none"
            items={createMenuItems()}
          />
        </nav>

        {/* Bottom section */}
        <div className="px-3 pb-3 border-t border-slate-200 dark:border-slate-800">
          <div className="space-y-2 pt-3">
            {/* Theme Toggle */}
            <div
              className="flex items-center justify-center cursor-pointer p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={toggleTheme}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              )}
              {!isCollapsed && (
                <span className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                  Chế độ Sáng/Tối
                </span>
              )}
            </div>

            {/* Profile Dropdown */}
            <div>
              <Dropdown
                menu={{
                  items: profileMenuItems,
                  className: 'w-full',
                }}
                placement={isCollapsed ? 'bottomRight' : 'topRight'}
                trigger={['click']}
                overlayStyle={{ zIndex: 1000 }}
              >
                <div className="flex items-center justify-center cursor-pointer p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <UserOutlined className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  {!isCollapsed && (
                    <span className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                      {user?.email || 'Hồ sơ cá nhân'}
                    </span>
                  )}
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu button - hidden as it's handled by ProtectedLayout */}
    </>
  );
};

export default Sidebar;
