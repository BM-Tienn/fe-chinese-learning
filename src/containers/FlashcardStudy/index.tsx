import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spin } from 'antd';
import { ArrowLeft, PartyPopper } from 'lucide-react';
import { flashcardsApi } from '../../services';
import { notifications } from '../../utils/notifications';
import { I_FlashcardStudySession } from '../../types/shared/studySession';

const FlashcardStudy: React.FC = () => {
  const { setId } = useParams<{ setId: string }>();
  const navigate = useNavigate();
  const [studySession, setStudySession] =
    useState<I_FlashcardStudySession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    if (!setId) {
      setError('Không tìm thấy bộ thẻ');
      setLoading(false);
      return;
    }

    const fetchStudySession = async () => {
      try {
        setLoading(true);
        const response = await flashcardsApi.getFlashcardsForStudy(setId, 10);
        // Transform API response to match our interface
        const transformedSession: I_FlashcardStudySession = {
          setId: response.setId,
          cards: response.cards.map(card => ({
            _id: card._id,
            front: card.front,
            back: card.back,
            pronunciation: card.pronunciation,
            example: card.example,
            difficulty: card.difficulty,
            lastReviewed: card.lastReviewed,
            reviewCount: card.reviewCount,
            correctCount: card.correctCount,
            incorrectCount: card.incorrectCount,
            nextReview: card.nextReview,
          })),
          totalCards: response.totalCards,
          currentIndex: response.currentIndex,
          sessionId: response.sessionId,
        };
        setStudySession(transformedSession);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Không thể tải dữ liệu học tập');
        notifications.general.error('Không thể tải dữ liệu học tập');
        console.error('Flashcard study fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudySession();
  }, [setId]);

  const currentCard = studySession?.cards[currentIndex];
  const progress = studySession
    ? ((currentIndex + 1) / studySession.cards.length) * 100
    : 0;

  const startStudy = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowCompletion(false);
  };

  const flipCard = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const nextCard = async (isCorrect: boolean) => {
    if (!studySession || !currentCard) return;

    try {
      // Update progress on backend
      await flashcardsApi.updateProgress(
        studySession.setId,
        currentCard._id,
        isCorrect,
      );
    } catch (err: any) {
      console.error('Failed to update progress:', err);
    }

    if (currentIndex < studySession.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setShowCompletion(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900">
        <header className="p-4 flex items-center justify-between flex-shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <Button
            type="text"
            icon={<ArrowLeft className="w-6 h-6" />}
            onClick={() => navigate('/flashcards')}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          />
          <div className="text-center">
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Đang tải...
            </h1>
          </div>
          <div className="w-10 h-10"></div>
        </header>
        <main className="flex-grow p-4 flex flex-col items-center justify-center">
          <Spin size="large" />
        </main>
      </div>
    );
  }

  if (error || !studySession) {
    return (
      <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900">
        <header className="p-4 flex items-center justify-between flex-shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <Button
            type="text"
            icon={<ArrowLeft className="w-6 h-6" />}
            onClick={() => navigate('/flashcards')}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          />
          <div className="text-center">
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Lỗi
            </h1>
          </div>
          <div className="w-10 h-10"></div>
        </header>
        <main className="flex-grow p-4 flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">
              {error || 'Không tìm thấy dữ liệu học tập'}
            </p>
            <Button onClick={() => navigate('/flashcards')}>Quay lại</Button>
          </div>
        </main>
      </div>
    );
  }

  if (showCompletion) {
    return (
      <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900">
        <header className="p-4 flex items-center justify-between flex-shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <Button
            type="text"
            icon={<ArrowLeft className="w-6 h-6" />}
            onClick={() => navigate('/flashcards')}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          />
          <div className="text-center">
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Hoàn thành
            </h1>
          </div>
          <div className="w-10 h-10"></div>
        </header>

        <main className="flex-grow p-4 flex flex-col items-center justify-center text-center">
          <PartyPopper className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Hoàn thành!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Bạn đã ôn tập xong bộ thẻ này.
          </p>
          <Button
            type="primary"
            size="large"
            onClick={startStudy}
            className="mt-6"
          >
            Học lại từ đầu
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900">
      {/* Header */}
      <header className="p-4 flex items-center justify-between flex-shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <Button
          type="text"
          icon={<ArrowLeft className="w-6 h-6" />}
          onClick={() => navigate('/flashcards')}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
        />
        <div className="text-center">
          <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            Học Flashcard
          </h1>
        </div>
        <div className="w-10 h-10 text-sm font-semibold flex items-center justify-center text-slate-800 dark:text-slate-200">
          {currentIndex + 1}/{studySession.cards.length}
        </div>
      </header>

      {/* Progress bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 flex-shrink-0">
        <div
          className="bg-indigo-500 h-1 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Main content */}
      <main className="flex-grow p-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-md h-64 mx-auto flashcard-scene">
          <div
            className={`relative w-full h-full flashcard ${isFlipped ? 'is-flipped' : ''}`}
            onClick={flipCard}
          >
            {/* Front of card */}
            <div className="flashcard-face absolute w-full h-full bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center p-4">
              <p className="font-hanzi text-7xl text-slate-800 dark:text-slate-200">
                {currentCard?.front}
              </p>
            </div>

            {/* Back of card */}
            <div className="flashcard-face flashcard-back absolute w-full h-full bg-white dark:bg-slate-800 rounded-xl shadow-lg flex flex-col items-center justify-center p-4 text-center">
              <p className="text-2xl text-slate-500 dark:text-slate-400">
                {currentCard?.pronunciation}
              </p>
              <p className="text-3xl font-semibold mt-2 text-slate-800 dark:text-slate-200">
                {currentCard?.back}
              </p>
              {currentCard?.example && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  {currentCard.example}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer controls */}
      <footer className="p-4 flex-shrink-0 flex flex-col items-center gap-4">
        {isFlipped && (
          <div className="flex space-x-4">
            <Button
              size="large"
              onClick={() => nextCard(false)}
              className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900 font-semibold"
            >
              Chưa thuộc
            </Button>
            <Button
              size="large"
              onClick={() => nextCard(true)}
              className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900 font-semibold"
            >
              Đã thuộc
            </Button>
          </div>
        )}
      </footer>
    </div>
  );
};

export default FlashcardStudy;
