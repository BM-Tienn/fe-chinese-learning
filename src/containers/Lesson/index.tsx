/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Radio, Input, Spin } from 'antd';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { I_LessonData } from '../../types/shared/lesson';
import { notifications } from '../../utils/notifications';

const Lesson = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('vocabulary');
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState<I_LessonData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch lesson data
  useEffect(() => {
    const fetchLesson = async () => {
      if (!id) {
        setError('Không tìm thấy ID bài học');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // For now, we'll use a mock lesson since the API structure might be different
        // In a real implementation, you would call: const response = await coursesApi.getLesson(courseId, id);
        const mockLesson: I_LessonData = {
          _id: id,
          title: 'Bài 1: 你好 (Nǐ hǎo)',
          description: 'Giáo trình Hán ngữ 1',
          content: 'Bài học về cách chào hỏi cơ bản',
          order: 1,
          duration: 30,
          isCompleted: false,
          vocabulary: [
            {
              _id: '1',
              chinese: '你',
              pinyin: 'nǐ',
              meaning: {
                primary: 'bạn, anh, chị...',
                secondary: [],
                partOfSpeech: 'pronoun',
              },
              category: 'Basic',
              difficulty: 'Easy',
              isActive: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              _id: '2',
              chinese: '好',
              pinyin: 'hǎo',
              meaning: {
                primary: 'tốt, đẹp, hay',
                secondary: [],
                partOfSpeech: 'adjective',
              },
              category: 'Basic',
              difficulty: 'Easy',
              isActive: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              _id: '3',
              chinese: '您',
              pinyin: 'nín',
              meaning: {
                primary: 'ngài, ông, bà',
                secondary: [],
                partOfSpeech: 'pronoun',
              },
              category: 'Basic',
              difficulty: 'Easy',
              isActive: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
          grammar: [
            {
              title: 'Cách chào hỏi',
              description: 'Sử dụng 你好 để chào hỏi',
              examples: ['你好！', '您好！'],
            },
          ],
          exercises: [
            {
              type: 'multiple-choice',
              question: 'Từ "你好" có nghĩa là gì?',
              options: ['Tạm biệt', 'Xin chào', 'Cảm ơn'],
              answer: 'Xin chào',
            },
            {
              type: 'fill-in-blank',
              question: '... 好!',
              sentence_parts: ['', ' hǎo!'],
              answer: '你',
            },
            {
              type: 'pinyin-writing',
              question: 'Viết phiên âm cho chữ Hán sau:',
              char: '您',
              answer: 'nín',
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setLesson(mockLesson);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Không thể tải chi tiết bài học');
        notifications.general.error('Không thể tải chi tiết bài học');
        console.error('Lesson fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const renderVocabulary = () => (
    <div className="space-y-4">
      {lesson?.vocabulary.map((word, index) => (
        <Card
          key={index}
          className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-hanzi text-3xl font-bold text-slate-800 dark:text-slate-200">
                {word.chinese}
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                {word.pinyin}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {word.meaning.primary}
              </p>
            </div>
            <Button
              type="text"
              icon={<Volume2 className="w-6 h-6" />}
              className="text-indigo-500 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
            />
          </div>
        </Card>
      ))}
    </div>
  );

  const renderPractice = () => (
    <div className="space-y-8">
      {lesson?.exercises.map((exercise, index) => (
        <Card
          key={index}
          className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
        >
          {exercise.type === 'multiple-choice' && (
            <div>
              <p className="font-semibold mb-3 text-slate-800 dark:text-slate-200">
                {index + 1}. {exercise.question}
              </p>
              <Radio.Group className="space-y-2">
                {exercise.options?.map((option, optionIndex) => (
                  <Radio key={optionIndex} value={option}>
                    {option}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          )}

          {exercise.type === 'fill-in-blank' && (
            <div>
              <p className="font-semibold mb-3 text-slate-800 dark:text-slate-200">
                {index + 1}. Điền vào chỗ trống:
              </p>
              <div className="flex items-center gap-2 font-hanzi text-2xl text-slate-800 dark:text-slate-200">
                <Input
                  className="w-16 text-center border-b-2 bg-transparent border-slate-300 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 dark:bg-slate-700 dark:text-slate-200"
                  style={{
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                  }}
                />
                {exercise.sentence_parts?.[1]}
              </div>
            </div>
          )}

          {exercise.type === 'pinyin-writing' && (
            <div>
              <p className="font-semibold mb-3 text-slate-800 dark:text-slate-200">
                {index + 1}. {exercise.question}
              </p>
              <div className="flex items-center gap-4">
                <p className="font-hanzi text-5xl text-slate-800 dark:text-slate-200">
                  {exercise.char}
                </p>
                <Input
                  placeholder="pinyin"
                  className="border-b-2 bg-transparent border-slate-300 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 text-xl dark:bg-slate-700 dark:text-slate-200"
                  style={{
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                  }}
                />
              </div>
            </div>
          )}
        </Card>
      ))}

      <Button type="primary" size="large" className="w-full">
        Kiểm tra đáp án
      </Button>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <header className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between flex-shrink-0 bg-white dark:bg-slate-800">
          <Button
            type="text"
            icon={<ArrowLeft className="w-6 h-6" />}
            onClick={() => navigate('/courses')}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          />
          <div className="text-center">
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Đang tải...
            </h1>
          </div>
          <div className="w-10 h-10"></div>
        </header>
        <main className="flex-grow overflow-y-auto custom-scrollbar p-6 bg-slate-100 dark:bg-slate-900">
          <div className="flex items-center justify-center h-full">
            <Spin size="large" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="flex flex-col h-full">
        <header className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between flex-shrink-0 bg-white dark:bg-slate-800">
          <Button
            type="text"
            icon={<ArrowLeft className="w-6 h-6" />}
            onClick={() => navigate('/courses')}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          />
          <div className="text-center">
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Lỗi
            </h1>
          </div>
          <div className="w-10 h-10"></div>
        </header>
        <main className="flex-grow overflow-y-auto custom-scrollbar p-6 bg-slate-100 dark:bg-slate-900">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-red-500 mb-4">
                {error || 'Không tìm thấy bài học'}
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
      <header className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between flex-shrink-0 bg-white dark:bg-slate-800">
        <Button
          type="text"
          icon={<ArrowLeft className="w-6 h-6" />}
          onClick={() => navigate('/courses')}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
        />
        <div className="text-center">
          <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            {lesson.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {lesson.description}
          </p>
        </div>
        <div className="w-10 h-10"></div>
      </header>

      {/* Navigation tabs */}
      <nav className="flex border-b border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white dark:bg-slate-800">
        <button
          onClick={() => setActiveTab('vocabulary')}
          className={`
            flex-1 p-4 text-center font-semibold border-b-2 transition-colors
            ${
              activeTab === 'vocabulary'
                ? 'border-indigo-500 text-indigo-500'
                : 'border-transparent text-slate-500 hover:border-slate-300 dark:hover:border-slate-600'
            }
          `}
        >
          Từ vựng
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`
            flex-1 p-4 text-center font-semibold border-b-2 transition-colors
            ${
              activeTab === 'practice'
                ? 'border-indigo-500 text-indigo-500'
                : 'border-transparent text-slate-500 hover:border-slate-300 dark:hover:border-slate-600'
            }
          `}
        >
          Luyện tập
        </button>
      </nav>

      {/* Main content */}
      <main className="flex-grow overflow-y-auto custom-scrollbar p-6 bg-slate-100 dark:bg-slate-900">
        {activeTab === 'vocabulary' ? renderVocabulary() : renderPractice()}
      </main>
    </div>
  );
};

export default Lesson;
