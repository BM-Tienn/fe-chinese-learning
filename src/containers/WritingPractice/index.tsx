import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeft, Trash2 } from 'lucide-react';

const WritingPractice: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeChar, setActiveChar] = useState('你');
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const charactersToPractice = ['你', '好', '一', '人', '大', '天'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;

      const size = container.clientWidth;
      canvas.width = size;
      canvas.height = size;
      drawGuideCharacter(ctx, size);
    };

    const drawGuideCharacter = (
      ctx: CanvasRenderingContext2D,
      size: number,
    ) => {
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = '#e2e8f0'; // Light gray for guide
      ctx.font = `${size * 0.8}px 'Noto Sans SC'`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(activeChar, size / 2, size / 2 + size * 0.05);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [activeChar]);

  const getMousePos = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDrawing = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    e.preventDefault();
    setIsDrawing(true);
    setLastPos(getMousePos(e));
  };

  const draw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPos = getMousePos(e);
    ctx.strokeStyle = '#4f46e5';
    ctx.lineWidth = canvas.width * 0.03;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();
    setLastPos(currentPos);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw guide character
    ctx.fillStyle = '#e2e8f0';
    ctx.font = `${canvas.width * 0.8}px 'Noto Sans SC'`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      activeChar,
      canvas.width / 2,
      canvas.height / 2 + canvas.height * 0.05,
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between flex-shrink-0 bg-white dark:bg-slate-800">
        <Button
          type="text"
          icon={<ArrowLeft className="w-6 h-6" />}
          onClick={() => navigate('/dashboard')}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
        />
        <div className="text-center">
          <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            {'Luyện Viết Chữ Hán'}
          </h1>
        </div>
        <div className="w-10 h-10"></div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden bg-slate-100 dark:bg-slate-900">
        {/* Canvas area */}
        <div className="flex-1 flex flex-col p-4 items-center justify-center">
          <div className="relative w-full max-w-sm aspect-square bg-slate-50 dark:bg-slate-700/50 rounded-lg shadow-inner">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              style={{ touchAction: 'none' }}
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <Button
              icon={<Trash2 className="w-5 h-5 mr-2" />}
              onClick={clearCanvas}
              className="flex items-center"
            >
              Xóa
            </Button>
          </div>
        </div>

        {/* Character selection */}
        <aside className="w-full md:w-48 p-4 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-800">
          <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">
            {'Chọn chữ:'}
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
            {charactersToPractice.map(char => (
              <button
                key={char}
                onClick={() => setActiveChar(char)}
                className={`
                  p-2 font-hanzi text-2xl rounded-lg border-2 transition-colors
                  ${
                    activeChar === char
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 border-indigo-500 text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                  }
                `}
              >
                {char}
              </button>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default WritingPractice;
