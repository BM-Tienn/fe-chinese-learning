/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input, Progress, Badge, Tag, Spin } from 'antd';
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
} from 'lucide-react';
import { coursesApi, configurationsApi } from '../../services';
import { I_CourseSimple, I_Filter } from '../../types/shared/course';
import { notifications } from '../../utils/notifications';

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<I_CourseSimple[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<I_Filter[]>([]);

  // Fetch courses data and filters
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch courses and filters in parallel
        const [coursesResponse, filtersResponse] = await Promise.all([
          coursesApi.getAllCourses(),
          configurationsApi.getConfigurationsByType('filter'),
        ]);

        // Transform API data to match our interface
        const transformedCourses: I_CourseSimple[] =
          coursesResponse.courses.map(course => ({
            _id: course._id,
            title: course.title,
            description: course.description,
            level: course.level,
            totalLessons: course.totalLessons,
            completedLessons: 0, // Mock data - should come from API
            progress: 0, // Mock data - should come from API
            thumbnail: course.image,
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
            // Additional properties for display
            image:
              course.image ||
              `https://placehold.co/400x200/ef4444/ffffff?text=${course.level}`,
            isNew: course.isNewCourse,
            isPopular: course.isPopular,
            levelColor: course.levelColor,
            rating: course.rating,
            students: course.students,
            duration: course.duration,
          }));

        setCourses(transformedCourses);
        setFilters(filtersResponse || []);

        setError(null);
      } catch (err: any) {
        setError(err.message || 'Không thể tải dữ liệu');
        notifications.general.error('Không thể tải dữ liệu');
        console.error('Data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getLevelColor = (color: string) => {
    const colors = {
      red: 'text-red-500 bg-red-50 dark:bg-red-900/20',
      orange: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20',
      green: 'text-green-500 bg-green-50 dark:bg-green-900/20',
    };
    return colors[color as keyof typeof colors] || colors.red;
  };

  // Filter courses based on search and selected filter
  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === 'all' ||
      course.level.toLowerCase().replace('hsk', 'hsk') === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0">
          <div className="flex items-center">
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Khóa học
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Chọn khóa học phù hợp với bạn
              </p>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-slate-900 p-4">
          <div className="flex items-center justify-center h-full">
            <Spin size="large" />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0">
          <div className="flex items-center">
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Khóa học
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Chọn khóa học phù hợp với bạn
              </p>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-slate-900 p-4">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Thử lại</Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0">
        <div className="flex items-center">
          <div className="ml-4">
            <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Khóa học
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Chọn khóa học phù hợp với bạn
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            type={viewMode === 'grid' ? 'primary' : 'default'}
            size="small"
            icon={<BookOpen className="w-4 h-4" />}
            onClick={() => setViewMode('grid')}
            className="h-8 w-8 p-0 hidden md:flex"
          />
          <Button
            type={viewMode === 'list' ? 'primary' : 'default'}
            size="small"
            icon={<Filter className="w-4 h-4" />}
            onClick={() => setViewMode('list')}
            className="h-8 w-8 p-0 hidden md:flex"
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-slate-900 p-4">
        {/* Search and filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm khóa học..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 placeholder-slate-400"
              size="large"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {filters.map(filter => (
                <Button
                  key={filter.key}
                  type={selectedFilter === filter.key ? 'primary' : 'default'}
                  size="small"
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`
                    whitespace-nowrap h-8 px-3
                    ${
                      selectedFilter === filter.key
                        ? 'bg-indigo-500 border-indigo-500'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }
                  `}
                >
                  {filter.label}
                  <Badge count={filter.count} size="small" className="ml-2" />
                </Button>
              ))}
            </div>

            <Button
              type="default"
              size="small"
              icon={<Filter className="w-4 h-4" />}
              className="h-8 px-3"
            >
              Bộ lọc
            </Button>
          </div>
        </div>

        {/* Courses grid/list */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-4'
          }
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <div
                key={course._id}
                className={viewMode === 'list' ? 'w-full' : ''}
              >
                <Card
                  hoverable
                  className={`
                    cursor-pointer bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 
                    shadow-sm hover:shadow-md transition-all duration-200
                    ${viewMode === 'list' ? 'w-full' : ''}
                  `}
                  onClick={() => navigate(`/courses/${course._id}`)}
                  bodyStyle={{
                    padding: viewMode === 'list' ? '20px' : '12px',
                    width: viewMode === 'list' ? '100%' : 'auto',
                  }}
                >
                  {viewMode === 'grid' ? (
                    // Grid view layout
                    <div className="w-full">
                      {/* Image */}
                      <div className="relative w-full h-32 mb-3">
                        <img
                          alt={course.title}
                          src={course.image}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        {course.isNew && (
                          <Badge
                            count="Mới"
                            className="absolute -top-2 -right-2"
                            style={{ backgroundColor: '#10b981' }}
                          />
                        )}
                        {course.isPopular && (
                          <Badge
                            count="Hot"
                            className="absolute -top-2 -left-2"
                            style={{ backgroundColor: '#ef4444' }}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <Tag
                            className={`text-xs px-2 py-1 rounded-full ${getLevelColor(course.levelColor || 'red')}`}
                          >
                            {course.level}
                          </Tag>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-slate-600 dark:text-slate-400">
                              {course.rating?.toFixed(1)}
                            </span>
                          </div>
                        </div>

                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                          {course.title}
                        </h3>

                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {course.description}
                        </p>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {course.duration}
                              </div>
                              <div className="flex items-center">
                                <Users className="w-3 h-3 mr-1" />
                                {course.students}
                              </div>
                            </div>
                            <span className="text-xs">
                              {course.totalLessons} bài
                            </span>
                          </div>

                          {course.progress && course.progress > 0 && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-500 dark:text-slate-400">
                                  Tiến độ
                                </span>
                                <span className="font-medium text-indigo-500">
                                  {course.progress}%
                                </span>
                              </div>
                              <Progress
                                percent={course.progress}
                                showInfo={false}
                                strokeColor="#6366f1"
                                trailColor="#e2e8f0"
                                size="small"
                              />
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2">
                            <Button
                              type="primary"
                              size="small"
                              icon={<Play className="w-3 h-3" />}
                              className="bg-indigo-500 border-indigo-500 hover:bg-indigo-600"
                              onClick={e => {
                                e.stopPropagation();
                                navigate(`/courses/${course?._id}`);
                              }}
                            >
                              {course.progress && course.progress > 0
                                ? 'Tiếp tục'
                                : 'Bắt đầu'}
                            </Button>

                            {course.progress && course.progress > 0 && (
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {course.totalLessons -
                                  Math.floor(
                                    (course.totalLessons * course.progress) /
                                      100,
                                  )}{' '}
                                bài còn lại
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List view layout - redesigned for better UX
                    <div className="flex items-start w-full bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200">
                      {/* Image - 18% width */}
                      <div className="relative flex-shrink-0 w-1/6 mr-6">
                        <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
                          <img
                            alt={course.title}
                            src={course.image}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {course.isNew && (
                          <Badge
                            count="Mới"
                            className="absolute -top-2 -right-2"
                            style={{ backgroundColor: '#10b981' }}
                          />
                        )}
                        {course.isPopular && (
                          <Badge
                            count="Hot"
                            className="absolute -top-2 -left-2"
                            style={{ backgroundColor: '#ef4444' }}
                          />
                        )}
                      </div>

                      {/* Main content - 67% width */}
                      <div className="flex-1 min-w-0 mr-6">
                        {/* Header with title and rating */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Tag
                                className={`text-xs px-2 py-1 rounded-full ${getLevelColor(course.levelColor || 'red')}`}
                              >
                                {course.level}
                              </Tag>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                  {course.rating?.toFixed(1)}
                                </span>
                              </div>
                            </div>
                            <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-xl mb-2">
                              {course.title}
                            </h3>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-base text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                          {course.description}
                        </p>

                        {/* Metadata and progress */}
                        <div className="space-y-4">
                          {/* Metadata */}
                          <div className="flex items-center space-x-8 text-sm text-slate-500 dark:text-slate-400">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              <span className="font-medium">
                                {course.duration}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-2" />
                              <span className="font-medium">
                                {course.students} học viên
                              </span>
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="w-4 h-4 mr-2" />
                              <span className="font-medium">
                                {course.totalLessons} bài học
                              </span>
                            </div>
                          </div>

                          {/* Progress bar */}
                          {course.progress && course.progress > 0 && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                                  Tiến độ học tập
                                </span>
                                <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                                  {course.progress}%
                                </span>
                              </div>
                              <Progress
                                percent={course.progress}
                                showInfo={false}
                                strokeColor="#6366f1"
                                trailColor="#e2e8f0"
                                size="small"
                                className="w-full"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action buttons - 15% width */}
                      <div className="flex flex-col space-y-3 flex-shrink-0 w-1/6">
                        <Button
                          type="primary"
                          size="large"
                          icon={<Play className="w-5 h-5" />}
                          className="bg-indigo-500 border-indigo-500 hover:bg-indigo-600 w-full h-12 text-base font-medium"
                          onClick={e => {
                            e.stopPropagation();
                            navigate(`/courses/${course?._id}`);
                          }}
                        >
                          {course.progress && course.progress > 0
                            ? 'Tiếp tục'
                            : 'Bắt đầu'}
                        </Button>

                        {course.progress && course.progress > 0 && (
                          <div className="text-center">
                            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              {course.totalLessons -
                                Math.floor(
                                  (course.totalLessons * course.progress) / 100,
                                )}{' '}
                              bài còn lại
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              Hoàn thành khóa học
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-slate-500 dark:text-slate-400 mb-4">
                {searchTerm || selectedFilter !== 'all'
                  ? 'Không tìm thấy khóa học phù hợp với bộ lọc'
                  : 'Chưa có khóa học nào'}
              </div>
              {(searchTerm || selectedFilter !== 'all') && (
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedFilter('all');
                  }}
                >
                  Xóa bộ lọc
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Courses;
