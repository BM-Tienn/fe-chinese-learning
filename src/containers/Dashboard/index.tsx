import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Progress, Badge } from 'antd';
import {
  Play,
  BookOpen,
  Target,
  Calendar,
  Clock,
  Award,
  Eye,
  Layers,
} from 'lucide-react';
import { dashboardApi } from '../../services';
import {
  I_DashboardProps,
  I_DashboardData,
  I_Goal,
  I_CurrentLesson,
} from '../../types/shared/dashboard';
import { notifications } from '../../utils/notifications';
import { MainLayout, PageContainer } from '../../components';

const Dashboard: React.FC<I_DashboardProps> = React.memo(
  ({ isDarkMode = false }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<I_DashboardData | null>(
      null,
    );
    const [error, setError] = useState<string | null>(null);

    // Fetch dashboard data
    const fetchDashboardData = useCallback(async () => {
      try {
        setLoading(true);
        const response = await dashboardApi.getDashboard();
        setDashboardData(response);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Không thể tải dữ liệu dashboard');
        notifications.general.error('Không thể tải dữ liệu dashboard');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      fetchDashboardData();
    }, [fetchDashboardData]);

    const goals: I_Goal[] = useMemo(
      () => [
        {
          label: 'Từ mới',
          current: dashboardData?.stats?.completedLessons || 0,
          total: dashboardData?.stats?.totalWords || 0,
          icon: BookOpen,
          color: 'blue',
          unit: 'từ',
        },
        {
          label: 'Chữ Hán',
          current: dashboardData?.stats?.studyStreak || 0,
          total: 30,
          icon: Target,
          color: 'green',
          unit: 'ngày',
        },
        {
          label: 'Thời gian học',
          current: Math.floor((dashboardData?.stats?.totalStudyTime || 0) / 60),
          total: 120,
          icon: Play,
          color: 'purple',
          unit: 'phút',
        },
      ],
      [dashboardData?.stats],
    );

    // Get recent activities from API data
    const currentLessons: I_CurrentLesson[] = useMemo(
      () =>
        dashboardData?.recentActivities
          ?.filter(activity => activity.type === 'lesson')
          .slice(0, 4)
          .map((activity, index) => ({
            id: activity._id,
            title: activity.title,
            subtitle: 'Bài học gần đây',
            level: 'HSK 1',
            progress: activity.progress || 0,
            image: `https://placehold.co/80x60/ef4444/ffffff?text=${index + 1}`,
            timeSpent: '15 phút',
            isCurrent: index === 0,
            score: activity.progress || 0,
          })) || [],
      [dashboardData?.recentActivities],
    );

    const getGoalColor = useCallback((color: string) => {
      const colors = {
        blue: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
        green: 'text-green-500 bg-green-50 dark:bg-green-900/20',
        purple: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
      };
      return colors[color as keyof typeof colors] || colors.blue;
    }, []);

    const handleRetry = useCallback(() => {
      window.location.reload();
    }, []);

    return (
      <MainLayout
        title="Chào mừng trở lại! 👋"
        subtitle="Hôm nay bạn đã học được gì?"
        showUserAvatar={true}
        userInitials="A"
        notificationCount={3}
        loading={loading}
        error={error}
        onRetry={handleRetry}
      >
        <PageContainer>
          {/* Quick stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {goals.map((goal, index) => {
              const Icon = goal.icon;
              const progress = (goal.current / goal.total) * 100;
              return (
                <Card
                  key={index}
                  className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
                  styles={{ body: { padding: '16px' } }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`p-2 rounded-lg ${getGoalColor(goal.color)}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {goal.current}/{goal.total} {goal.unit}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {goal.label}
                  </h3>
                  <Progress
                    percent={progress}
                    showInfo={false}
                    strokeColor={
                      goal.color === 'blue'
                        ? '#3b82f6'
                        : goal.color === 'green'
                          ? '#10b981'
                          : '#8b5cf6'
                    }
                    trailColor="#e2e8f0"
                    size="small"
                  />
                </Card>
              );
            })}
          </div>

          {/* Current lessons section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Bài học hiện tại
              </h2>
              <Button
                type="link"
                size="small"
                className="text-indigo-500 hover:text-indigo-600 p-0 h-auto"
                onClick={() => navigate('/courses')}
              >
                Xem tất cả
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {currentLessons.length > 0 ? (
                currentLessons.map(lesson => (
                  <Card
                    key={lesson.id}
                    className={`
                    bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 
                    shadow-sm hover:shadow-md transition-all duration-200
                    ${lesson.isCurrent ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''}
                  `}
                    styles={{ body: { padding: '12px' } }}
                  >
                    <div className="space-y-3">
                      {/* Header with image and badge */}
                      <div className="relative">
                        <img
                          src={lesson.image}
                          alt={lesson.title}
                          className="w-full h-20 rounded-lg object-cover"
                        />
                        <Badge
                          count={lesson.level}
                          className="absolute -top-1 -right-1"
                          style={{
                            backgroundColor: lesson.isCurrent
                              ? '#ef4444'
                              : '#6b7280',
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm truncate">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {lesson.subtitle}
                        </p>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 dark:text-slate-400">
                              Tiến độ
                            </span>
                            <span className="font-medium text-indigo-500">
                              {lesson.progress}%
                            </span>
                          </div>
                          <Progress
                            percent={lesson.progress}
                            showInfo={false}
                            strokeColor={
                              lesson.isCurrent ? '#6366f1' : '#94a3b8'
                            }
                            trailColor="#e2e8f0"
                            size="small"
                          />

                          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                            <Clock className="w-3 h-3 mr-1" />
                            {lesson.timeSpent}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                        <Button
                          type={lesson.isCurrent ? 'primary' : 'default'}
                          size="small"
                          icon={<Play className="w-3 h-3" />}
                          onClick={() => navigate(`/lesson/${lesson.id}`)}
                          className={`
                          text-xs h-8
                          ${
                            lesson.isCurrent
                              ? 'bg-indigo-500 border-indigo-500 hover:bg-indigo-600'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-700'
                          }
                        `}
                        >
                          {lesson.isCurrent ? 'Tiếp tục' : 'Bắt đầu'}
                        </Button>

                        <div className="flex space-x-1">
                          <Button
                            type="default"
                            size="small"
                            icon={<Award className="w-3 h-3" />}
                            className="flex-1 text-xs h-8 hover:bg-slate-50 dark:hover:bg-slate-700"
                            disabled={lesson.score === 0}
                          >
                            {lesson.score > 0 ? `${lesson.score}đ` : 'Chưa có'}
                          </Button>
                          <Button
                            type="default"
                            size="small"
                            icon={<Eye className="w-3 h-3" />}
                            className="flex-1 text-xs h-8 hover:bg-slate-50 dark:hover:bg-slate-700"
                          >
                            Chi tiết
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-slate-500 dark:text-slate-400">
                    Chưa có bài học nào. Hãy bắt đầu học ngay!
                  </p>
                  <Button
                    type="primary"
                    className="mt-4"
                    onClick={() => navigate('/courses')}
                  >
                    Khám phá khóa học
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button
              type="default"
              size="large"
              icon={<BookOpen className="w-4 h-4" />}
              className="h-16 flex flex-col items-center justify-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300"
              onClick={() => navigate('/courses')}
            >
              <span className="text-xs mt-1">Khóa học</span>
            </Button>
            <Button
              type="default"
              size="large"
              icon={<Layers className="w-4 h-4" />}
              className="h-16 flex flex-col items-center justify-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300"
              onClick={() => navigate('/flashcards')}
            >
              <span className="text-xs mt-1">Flashcard</span>
            </Button>
            <Button
              type="default"
              size="large"
              icon={<Target className="w-4 h-4" />}
              className="h-16 flex flex-col items-center justify-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300"
            >
              <span className="text-xs mt-1">Luyện tập</span>
            </Button>
            <Button
              type="default"
              size="large"
              icon={<Calendar className="w-4 h-4" />}
              className="h-16 flex flex-col items-center justify-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300"
            >
              <span className="text-xs mt-1">Lịch học</span>
            </Button>
          </div>
        </PageContainer>
      </MainLayout>
    );
  },
);

export default Dashboard;
