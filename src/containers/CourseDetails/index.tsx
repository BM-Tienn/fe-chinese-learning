import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Progress, Spin } from 'antd';
import { ArrowLeft, Check, Play, Lock, ChevronRight } from 'lucide-react';
import { coursesApi } from '../../services';
import { notifications } from '../../utils/notifications';
import { I_LessonSimple } from '../../types/shared/lesson';

interface CourseDetail {
  _id: string;
  title: string;
  description: string;
  level: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  thumbnail?: string;
  lessons: Array<{
    _id: string;
    title: string;
    description: string;
    content: string;
    order: number;
    duration: number;
    isCompleted: boolean;
    vocabulary: string[];
    grammar: string[];
    exercises: any[];
    createdAt: string;
    updatedAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!id) {
        setError('Không tìm thấy ID khóa học');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await coursesApi.getCourse(id);
        // Transform API response to match our interface
        const transformedCourse: CourseDetail = {
          _id: response._id,
          title: response.title,
          description: response.description,
          level: response.level,
          totalLessons: response.totalLessons,
          completedLessons: 0, // Mock data - should come from API
          progress: 0, // Mock data - should come from API
          thumbnail: response.image,
          lessons: [], // Mock data - should come from API
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        };
        setCourse(transformedCourse);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Không thể tải chi tiết khóa học');
        notifications.general.error('Không thể tải chi tiết khóa học');
        console.error('Course details fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400';
      case 'current':
        return 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400';
      case 'locked':
        return 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400';
      default:
        return 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'current':
        return 'text-slate-800 dark:text-slate-200';
      case 'locked':
        return 'text-slate-600 dark:text-slate-400';
      default:
        return 'text-slate-600 dark:text-slate-400';
    }
  };

  const getLessonStatus = (lesson: I_LessonSimple, index: number) => {
    if (lesson.isCompleted) return 'completed';
    if (index === 0 || (index > 0 && course?.lessons[index - 1]?.isCompleted)) {
      return 'current';
    }
    return 'locked';
  };

  const getLessonIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return Check;
      case 'current':
        return Play;
      case 'locked':
        return Lock;
      default:
        return Lock;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <header className="flex items-center p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0">
          <Button
            type="text"
            icon={<ArrowLeft className="w-6 h-6" />}
            onClick={() => navigate('/courses')}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          />
          <h1 className="text-xl font-semibold ml-4 text-slate-800 dark:text-slate-200">
            Chi tiết Khóa học
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-100 dark:bg-slate-900">
          <div className="flex items-center justify-center h-full">
            <Spin size="large" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col h-full">
        <header className="flex items-center p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0">
          <Button
            type="text"
            icon={<ArrowLeft className="w-6 h-6" />}
            onClick={() => navigate('/courses')}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          />
          <h1 className="text-xl font-semibold ml-4 text-slate-800 dark:text-slate-200">
            Chi tiết Khóa học
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-100 dark:bg-slate-900">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-red-500 mb-4">
                {error || 'Không tìm thấy khóa học'}
              </p>
              <Button onClick={() => navigate('/courses')}>Quay lại</Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0">
        <Button
          type="text"
          icon={<ArrowLeft className="w-6 h-6" />}
          onClick={() => navigate('/courses')}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
        />
        <h1 className="text-xl font-semibold ml-4 text-slate-800 dark:text-slate-200">
          Chi tiết Khóa học
        </h1>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-100 dark:bg-slate-900">
        {/* Hero image */}
        <div
          className="h-48 bg-cover bg-center"
          style={{
            backgroundImage: `url('${course.thumbnail || `https://placehold.co/800x300/ef4444/ffffff?text=${course.title}`}')`,
          }}
        />

        {/* Course info */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {course.title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            {course.description}
          </p>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex justify-between mb-1">
              <span className="text-base font-medium text-indigo-700 dark:text-indigo-400">
                Tiến độ
              </span>
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-400">
                {course.progress}%
              </span>
            </div>
            <Progress
              percent={course.progress}
              showInfo={false}
              strokeColor="#6366f1"
              trailColor="#e2e8f0"
              className="progress-light"
            />
          </div>

          {/* Lessons list */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">
              Danh sách Bài học
            </h3>
            <div className="space-y-3">
              {course.lessons.map((lesson, index) => {
                const status = getLessonStatus(lesson, index);
                const Icon = getLessonIcon(status);
                return (
                  <div
                    key={lesson._id}
                    className={`
                      flex items-center p-4 rounded-lg transition-colors
                      ${
                        status === 'locked'
                          ? 'bg-slate-50 dark:bg-slate-800/50 opacity-60 cursor-not-allowed'
                          : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer border border-slate-200 dark:border-slate-700'
                      }
                    `}
                    onClick={() => {
                      if (status !== 'locked') {
                        navigate(`/lesson/${lesson._id}`);
                      }
                    }}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${getStatusColor(status)}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <p
                        className={`font-semibold ${getStatusTextColor(status)}`}
                      >
                        {lesson.title}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {lesson.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;
