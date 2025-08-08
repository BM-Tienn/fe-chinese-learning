import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Card } from 'antd';
import {
  BookOpen,
  Users,
  FileText,
  Layers,
  Target,
  Settings,
  BarChart3,
  Calendar,
  BookMarked,
  GraduationCap,
} from 'lucide-react';

// Import admin sub-components
import UsersAdmin from './Users';
import CoursesAdmin from './Courses';
import LessonsAdmin from './Lessons';
import FlashcardsAdmin from './Flashcards';
import VocabulariesAdmin from './Vocabularies';
import WordsAdmin from './Words';
import ConfigurationsAdmin from './Configurations';
import StudySessionsAdmin from './StudySessions';
import UserProgressAdmin from './UserProgress';
import UserGoalsAdmin from './UserGoals';
import { MainLayout, PageContainer } from '../../components';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const adminModules = [
    {
      title: 'Quản lý người dùng',
      description: 'Quản lý tài khoản người dùng và phân quyền',
      icon: Users,
      path: '/admin/users',
      color: 'blue',
    },
    {
      title: 'Quản lý khóa học',
      description: 'Tạo và chỉnh sửa các khóa học',
      icon: BookOpen,
      path: '/admin/courses',
      color: 'green',
    },
    {
      title: 'Quản lý bài học',
      description: 'Quản lý nội dung bài học',
      icon: FileText,
      path: '/admin/lessons',
      color: 'purple',
    },
    {
      title: 'Quản lý flashcard',
      description: 'Tạo và quản lý bộ flashcard',
      icon: Layers,
      path: '/admin/flashcards',
      color: 'orange',
    },
    {
      title: 'Quản lý từ vựng',
      description: 'Quản lý danh sách từ vựng',
      icon: BookMarked,
      path: '/admin/vocabularies',
      color: 'cyan',
    },
    {
      title: 'Quản lý từ',
      description: 'Quản lý từng từ riêng lẻ',
      icon: GraduationCap,
      path: '/admin/words',
      color: 'magenta',
    },
    {
      title: 'Cấu hình hệ thống',
      description: 'Quản lý cấu hình chung',
      icon: Settings,
      path: '/admin/configurations',
      color: 'red',
    },
    {
      title: 'Phiên học tập',
      description: 'Theo dõi phiên học tập của người dùng',
      icon: BarChart3,
      path: '/admin/study-sessions',
      color: 'indigo',
    },
    {
      title: 'Tiến độ người dùng',
      description: 'Quản lý tiến độ học tập',
      icon: Target,
      path: '/admin/user-progress',
      color: 'lime',
    },
    {
      title: 'Mục tiêu người dùng',
      description: 'Quản lý mục tiêu học tập',
      icon: Calendar,
      path: '/admin/user-goals',
      color: 'pink',
    },
  ];

  const getColorClass = (color: string) => {
    const colors = {
      blue: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
      green: 'text-green-500 bg-green-50 dark:bg-green-900/20',
      purple: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
      orange: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20',
      cyan: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20',
      magenta: 'text-pink-500 bg-pink-50 dark:bg-pink-900/20',
      red: 'text-red-500 bg-red-50 dark:bg-red-900/20',
      indigo: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20',
      lime: 'text-lime-500 bg-lime-50 dark:bg-lime-900/20',
      pink: 'text-pink-500 bg-pink-50 dark:bg-pink-900/20',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <MainLayout
      title="Quản trị hệ thống"
      subtitle="Quản lý toàn bộ dữ liệu và cấu hình hệ thống"
      showBackButton={true}
      onBackClick={() => navigate('/dashboard')}
    >
      <Routes>
        <Route
          path="/"
          element={
            <PageContainer>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {adminModules.map((module, index) => {
                    const Icon = module.icon;
                    return (
                      <Card
                        key={index}
                        className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                        onClick={() => navigate(module.path)}
                        styles={{ body: { padding: '20px' } }}
                      >
                        <div className="space-y-3">
                          <div
                            className={`p-3 rounded-lg ${getColorClass(module.color)} w-fit`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg mb-2">
                              {module.title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {module.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </PageContainer>
          }
        />
        <Route path="/users" element={<UsersAdmin />} />
        <Route path="/courses" element={<CoursesAdmin />} />
        <Route path="/lessons" element={<LessonsAdmin />} />
        <Route path="/flashcards" element={<FlashcardsAdmin />} />
        <Route path="/vocabularies" element={<VocabulariesAdmin />} />
        <Route path="/words" element={<WordsAdmin />} />
        <Route path="/configurations" element={<ConfigurationsAdmin />} />
        <Route path="/study-sessions" element={<StudySessionsAdmin />} />
        <Route path="/user-progress" element={<UserProgressAdmin />} />
        <Route path="/user-goals" element={<UserGoalsAdmin />} />
      </Routes>
    </MainLayout>
  );
};

export default AdminDashboard;
