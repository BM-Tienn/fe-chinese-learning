/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Badge, Tag, Progress, Spin } from 'antd';
import {
  ArrowLeft,
  Layers,
  Filter,
  Clock,
  Target,
  Star,
  Play,
  BookOpen,
  Zap,
} from 'lucide-react';
import { flashcardsApi, configurationsApi } from '../../services';
import { I_FlashcardSetSimple } from '../../types/shared/flashcard';
import { I_Configuration } from '../../types/shared/configuration';
import { notifications } from '../../utils/notifications';

const Flashcards: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const [flashcardSets, setFlashcardSets] = useState<I_FlashcardSetSimple[]>(
    [],
  );
  const [error, setError] = useState<string | null>(null);

  const [topics, setTopics] = useState<I_Configuration[]>([]);
  const [wordTypes, setWordTypes] = useState<I_Configuration[]>([]);

  // Fetch flashcard sets and configurations
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch flashcard sets and configurations in parallel
      const [setsResponse, configResponse] = await Promise.all([
        flashcardsApi.getUserFlashcardSets(),
        configurationsApi.getConfigurationsByType('topic'),
      ]);

      // Transform API data to match our interface
      const transformedSets: I_FlashcardSetSimple[] = setsResponse?.map(
        set => ({
          _id: set._id,
          title: set.title,
          description: set.description,
          category: set.category,
          level: set.level,
          totalCards: set.cardCount || 0,
          masteredCards: 0, // Mock data - should come from API
          learningCards: 0, // Mock data - should come from API
          notStartedCards: set.cardCount || 0, // Mock data - should come from API
          createdAt: set.createdAt,
          updatedAt: set.updatedAt,
          // Additional properties for display
          isNew:
            new Date(set.createdAt).getTime() >
            Date.now() - 7 * 24 * 60 * 60 * 1000, // New if created within 7 days
          isRecommended: set.isRecommended || false,
          difficulty:
            (set.cardCount || 0) <= 10
              ? 'Dễ'
              : (set.cardCount || 0) <= 20
                ? 'Trung bình'
                : 'Khó',
          timeEstimate:
            set.timeEstimate || `${Math.ceil((set.cardCount || 0) / 5)} phút`,
          lastStudied: '2 giờ trước', // Mock data
          mastery: 0, // Mock data - should come from API
          color: set.color || 'red',
        }),
      );

      // Transform configuration data to match our interfaces
      const topicsData: I_Configuration[] = configResponse.filter(
        config => config.type === 'topic',
      );

      const wordTypesData: I_Configuration[] = configResponse.filter(
        config => config.type === 'wordType',
      );

      setFlashcardSets(transformedSets);
      setTopics(topicsData);
      setWordTypes(wordTypesData);

      setError(null);
    } catch (err: any) {
      setError(err.message || 'Không thể tải dữ liệu');
      notifications.general.error('Không thể tải dữ liệu');
      console.error('Data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'bg-red-50 dark:bg-red-900/20 text-red-500',
      blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-500',
      green: 'bg-green-50 dark:bg-green-900/20 text-green-500',
    };
    return colors[color as keyof typeof colors] || colors.red;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Dễ: 'text-green-500 bg-green-50 dark:bg-green-900/20',
      'Trung bình': 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
      Khó: 'text-red-500 bg-red-50 dark:bg-red-900/20',
    };
    return colors[difficulty as keyof typeof colors] || colors['Dễ'];
  };

  // Filter flashcard sets based on selected filters
  const filteredSets = flashcardSets.filter(set => {
    const matchesTopic =
      selectedTopic === 'all' || set.category === selectedTopic;
    const matchesType = selectedType === 'all'; // For now, we don't have type filtering
    return matchesTopic && matchesType;
  });

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0">
          <div className="flex items-center">
            <Button
              type="text"
              icon={<ArrowLeft className="w-5 h-5" />}
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            />
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Flashcard
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Ôn tập từ vựng hiệu quả
              </p>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900">
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
            <Button
              type="text"
              icon={<ArrowLeft className="w-5 h-5" />}
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            />
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Flashcard
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Ôn tập từ vựng hiệu quả
              </p>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900">
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
          <Button
            type="text"
            icon={<ArrowLeft className="w-5 h-5" />}
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
          />
          <div className="ml-4">
            <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Flashcard
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Ôn tập từ vựng hiệu quả
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            type={viewMode === 'grid' ? 'primary' : 'default'}
            size="small"
            icon={<Layers className="w-4 h-4" />}
            onClick={() => setViewMode('grid')}
            className="h-8 w-8 p-0 hidden md:flex"
          />
          <Button
            type={viewMode === 'list' ? 'primary' : 'default'}
            size="small"
            icon={<BookOpen className="w-4 h-4" />}
            onClick={() => setViewMode('list')}
            className="h-8 w-8 p-0 hidden md:flex"
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900">
        {/* Filters */}
        <div className="mb-6 space-y-4">
          {/* Topic filters */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Chủ đề
              </h3>
              <Button
                type="link"
                size="small"
                icon={<Filter className="w-3 h-3" />}
                className="text-xs p-0 h-auto"
              >
                Tất cả
              </Button>
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {topics.map(topic => (
                <Button
                  key={topic.key}
                  type={selectedTopic === topic.key ? 'primary' : 'default'}
                  size="small"
                  onClick={() => setSelectedTopic(topic.key)}
                  className={`
                    whitespace-nowrap h-8 px-3
                    ${
                      selectedTopic === topic.key
                        ? 'bg-indigo-500 border-indigo-500'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }
                  `}
                >
                  {topic.label}
                  <Badge
                    count={topic.count || 0}
                    size="small"
                    className="ml-2"
                  />
                </Button>
              ))}
            </div>
          </div>

          {/* Word type filters */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Loại từ
              </h3>
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {wordTypes.map(type => (
                <Button
                  key={type.key}
                  type={selectedType === type.key ? 'primary' : 'default'}
                  size="small"
                  onClick={() => setSelectedType(type.key)}
                  className={`
                    whitespace-nowrap h-8 px-3
                    ${
                      selectedType === type.key
                        ? 'bg-indigo-500 border-indigo-500'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }
                  `}
                >
                  {type.label}
                  <Badge
                    count={type.count || 0}
                    size="small"
                    className="ml-2"
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Flashcard sets */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-4'
          }
        >
          {filteredSets.length > 0 ? (
            filteredSets.map(set => {
              const Icon = Layers; // Default icon
              return (
                <div
                  key={set._id}
                  className={viewMode === 'list' ? 'w-full' : ''}
                >
                  <Card
                    className={`
                      bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 
                      shadow-sm hover:shadow-md transition-all duration-200
                      ${viewMode === 'list' ? 'w-full' : ''}
                    `}
                    bodyStyle={{
                      padding: viewMode === 'list' ? '20px' : '12px',
                      width: viewMode === 'list' ? '100%' : 'auto',
                    }}
                  >
                    {viewMode === 'grid' ? (
                      // Grid view layout
                      <div className="space-y-3">
                        {/* Icon and badges */}
                        <div className="relative">
                          <div
                            className={`p-3 rounded-lg ${getColorClasses(set.color || 'red')}`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          {set.isNew && (
                            <Badge
                              count="Mới"
                              className="absolute -top-2 -right-2"
                              style={{ backgroundColor: '#10b981' }}
                            />
                          )}
                          {set.isRecommended && (
                            <Badge
                              count="Đề xuất"
                              className="absolute -top-2 -left-2"
                              style={{ backgroundColor: '#f59e0b' }}
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <Tag
                              className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(set.difficulty || 'Dễ')}`}
                            >
                              {set.difficulty}
                            </Tag>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-slate-600 dark:text-slate-400">
                                {set.mastery}%
                              </span>
                            </div>
                          </div>

                          <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                            {set.title}
                          </h3>

                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                            {set.description}
                          </p>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {set.timeEstimate}
                                </div>
                                <div className="flex items-center">
                                  <Target className="w-3 h-3 mr-1" />
                                  {set.totalCards} thẻ
                                </div>
                              </div>
                              <span className="text-xs">{set.lastStudied}</span>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-500 dark:text-slate-400">
                                  Mức độ thành thạo
                                </span>
                                <span className="font-medium text-indigo-500">
                                  {set.mastery}%
                                </span>
                              </div>
                              <Progress
                                percent={set.mastery}
                                showInfo={false}
                                strokeColor={
                                  set.mastery && set.mastery >= 80
                                    ? '#10b981'
                                    : set.mastery && set.mastery >= 50
                                      ? '#f59e0b'
                                      : '#ef4444'
                                }
                                trailColor="#e2e8f0"
                                size="small"
                              />
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              <Button
                                type="primary"
                                size="small"
                                icon={<Play className="w-3 h-3" />}
                                className="bg-indigo-500 border-indigo-500 hover:bg-indigo-600"
                                onClick={() => navigate('/flashcards/study')}
                              >
                                Học ngay
                              </Button>

                              <Button
                                type="default"
                                size="small"
                                icon={<Zap className="w-3 h-3" />}
                                className="text-xs"
                              >
                                Ôn nhanh
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // List view layout - redesigned for better UX
                      <div className="flex items-start w-full bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200">
                        {/* Icon and badges - 15% width */}
                        <div className="relative flex-shrink-0 w-1/6 mr-6">
                          <div className="aspect-square w-full rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                            <div
                              className={`w-full h-full flex items-center justify-center ${getColorClasses(set.color || 'red')}`}
                            >
                              <Icon className="w-8 h-8" />
                            </div>
                          </div>
                          {set.isNew && (
                            <Badge
                              count="Mới"
                              className="absolute -top-2 -right-2"
                              style={{ backgroundColor: '#10b981' }}
                            />
                          )}
                          {set.isRecommended && (
                            <Badge
                              count="Đề xuất"
                              className="absolute -top-2 -left-2"
                              style={{ backgroundColor: '#f59e0b' }}
                            />
                          )}
                        </div>

                        {/* Main content - 70% width */}
                        <div className="flex-1 min-w-0 mr-6">
                          {/* Header with title and mastery */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <Tag
                                  className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(set.difficulty || 'Dễ')}`}
                                >
                                  {set.difficulty}
                                </Tag>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                    {set.mastery}%
                                  </span>
                                </div>
                              </div>
                              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-xl mb-2">
                                {set.title}
                              </h3>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-base text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                            {set.description}
                          </p>

                          {/* Metadata and progress */}
                          <div className="space-y-4">
                            {/* Metadata */}
                            <div className="flex items-center space-x-8 text-sm text-slate-500 dark:text-slate-400">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                <span className="font-medium">
                                  {set.timeEstimate}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Target className="w-4 h-4 mr-2" />
                                <span className="font-medium">
                                  {set.totalCards} thẻ
                                </span>
                              </div>
                              <div className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-2" />
                                <span className="font-medium">
                                  {set.lastStudied}
                                </span>
                              </div>
                            </div>

                            {/* Progress bar */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                                  Mức độ thành thạo
                                </span>
                                <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                                  {set.mastery}%
                                </span>
                              </div>
                              <Progress
                                percent={set.mastery}
                                showInfo={false}
                                strokeColor={
                                  set.mastery && set.mastery >= 80
                                    ? '#10b981'
                                    : set.mastery && set.mastery >= 50
                                      ? '#f59e0b'
                                      : '#ef4444'
                                }
                                trailColor="#e2e8f0"
                                size="small"
                                className="w-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Action buttons - 15% width */}
                        <div className="flex flex-col space-y-3 flex-shrink-0 w-1/6">
                          <Button
                            type="primary"
                            size="large"
                            icon={<Play className="w-5 h-5" />}
                            className="bg-indigo-500 border-indigo-500 hover:bg-indigo-600 w-full h-12 text-base font-medium"
                            onClick={() => navigate('/flashcards/study')}
                          >
                            Học ngay
                          </Button>

                          <Button
                            type="default"
                            size="large"
                            icon={<Zap className="w-5 h-5" />}
                            className="w-full h-12 text-base font-medium"
                          >
                            Ôn nhanh
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-slate-500 dark:text-slate-400 mb-4">
                {selectedTopic !== 'all' || selectedType !== 'all'
                  ? 'Không tìm thấy bộ thẻ phù hợp với bộ lọc'
                  : 'Chưa có bộ thẻ nào'}
              </div>
              {(selectedTopic !== 'all' || selectedType !== 'all') && (
                <Button
                  onClick={() => {
                    setSelectedTopic('all');
                    setSelectedType('all');
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
});

export default Flashcards;
