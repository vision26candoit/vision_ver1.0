import { useState, useEffect, useRef } from 'react';
import { Clock, Award, Pencil, Eraser, Undo } from 'lucide-react';
import problem1 from 'figma:asset/93952f3c9743bfeb9635cff67bb53bb162aa2416.png';
import problem2 from 'figma:asset/377a63f34365e22a90fcbf884f4242e928ed2f70.png';
import problem3 from 'figma:asset/e1d4b7e7a3b9971d5074cfdc408860fcdd3081f1.png';
import problem4 from 'figma:asset/11ae85740dfb01504a5aff4ec90a609cf27e8306.png';
import problem5 from 'figma:asset/7614ea2b359b9415b329964d4441615c3aad1aa5.png';

interface PlayScreenProps {
  onNavigate: (screen: string) => void;
}

export function PlayScreen({ onNavigate }: PlayScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(180);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownTime, setCountdownTime] = useState(10);
  const [answer, setAnswer] = useState('');
  const [firstSubmitted, setFirstSubmitted] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingEnabled, setDrawingEnabled] = useState(false);
  const [penColor, setPenColor] = useState('#ff0000');
  const [penSize, setPenSize] = useState(3);
  const [showFirstPlaceAnswer, setShowFirstPlaceAnswer] = useState(false);
  const [firstPlaceAnswer, setFirstPlaceAnswer] = useState('62°');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [playerScores, setPlayerScores] = useState([0, 0, 0, 0, 0, 0]);

  const problemImages = [problem1, problem2, problem3, problem4, problem5, problem1];

  const players = [
    { name: '수학왕 김천재', rank: 'Diamond III', character: '🐼' },
    { name: '공식마스터 이수리', rank: 'Diamond II', character: '🦊' },
    { name: '기하학신동 정증명', rank: 'Platinum I', character: '🐰' },
    { name: '방정식킬러 박해법', rank: 'Diamond I', character: '🐨' },
    { name: '미적분귀재 최극한', rank: 'Diamond II', character: '🐯' },
    { name: '확률천재 송통계', rank: 'Platinum II', character: '🐻' },
  ];

  const calculatorButtons = [
    ['7', '8', '9', '÷', 'π'],
    ['4', '5', '6', '×', '√'],
    ['1', '2', '3', '-', 'x²'],
    ['0', '.', '=', '+', '('],
    ['C', 'DEL', 'sin', 'cos', ')'],
  ];

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        setContext(ctx);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft > 0 && !showCountdown) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showCountdown]);

  useEffect(() => {
    if (showCountdown && countdownTime > 0) {
      const timer = setTimeout(() => setCountdownTime(countdownTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showCountdown && countdownTime === 0) {
      // Show first place answer for 5 seconds
      setShowFirstPlaceAnswer(true);
      setTimeout(() => {
        setShowFirstPlaceAnswer(false);
        // Move to next question
        if (currentQuestion < 6) {
          setCurrentQuestion(currentQuestion + 1);
          setShowCountdown(false);
          setCountdownTime(10);
          setTimeLeft(180);
          setAnswer('');
          setFirstSubmitted(false);
          clearCanvas();
        } else {
          onNavigate('result');
        }
      }, 5000);
    }
  }, [showCountdown, countdownTime, currentQuestion, onNavigate]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawingEnabled || !context) return;
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      context.beginPath();
      context.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context || !drawingEnabled) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      context.strokeStyle = penColor;
      context.lineWidth = penSize;
      context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleSubmit = () => {
    if (!firstSubmitted) {
      // First person to submit - gets +10 points
      setFirstSubmitted(true);
      setShowCountdown(true);
      const newScores = [...playerScores];
      newScores[0] = playerScores[0] + 10;
      setPlayerScores(newScores);
    } else {
      // Submitted within 10 seconds - gets +5 points
      const newScores = [...playerScores];
      newScores[0] = playerScores[0] + 5;
      setPlayerScores(newScores);
    }
  };

  const handleCalculatorClick = (value: string) => {
    if (value === 'C') {
      setAnswer('');
    } else if (value === 'DEL') {
      setAnswer(answer.slice(0, -1));
    } else if (value === '=') {
      try {
        const result = eval(answer.replace('×', '*').replace('÷', '/'));
        setAnswer(result.toString());
      } catch {
        // Invalid expression
      }
    } else {
      setAnswer(answer + value);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F2A] px-6 py-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Countdown Timer */}
        {showCountdown && !showFirstPlaceAnswer && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl px-12 py-6 shadow-2xl shadow-red-500/50 border-4 border-red-400 animate-pulse">
              <div className="text-center">
                <div className="text-white text-sm mb-2">1등 제출! 빠르게 제출하세요!</div>
                <div className="text-6xl font-bold text-white">{countdownTime}</div>
              </div>
            </div>
          </div>
        )}

        {/* First Place Answer Display */}
        {showFirstPlaceAnswer && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 rounded-3xl p-12 border-4 border-yellow-400 shadow-2xl shadow-yellow-500/50 max-w-4xl">
              <div className="text-center mb-6">
                <div className="text-yellow-400 text-3xl font-bold mb-2">🏆 1등 답안</div>
                <div className="text-white text-xl">{players[1].name}님의 풀이</div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 mb-6 relative">
                <img 
                  src={problemImages[currentQuestion - 1]} 
                  alt="문제" 
                  className="max-w-full h-auto mx-auto"
                  style={{ maxHeight: '400px' }}
                />
                {/* Simulated drawing on top */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 800 600">
                    <path d="M 200 200 L 250 180 L 280 220" stroke="red" strokeWidth="3" fill="none" />
                    <circle cx="300" cy="250" r="30" stroke="blue" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>

              <div className="bg-cyan-900/50 rounded-xl p-6 border-2 border-cyan-400">
                <div className="text-cyan-300 text-lg mb-2">제출한 답:</div>
                <div className="text-white text-4xl font-bold text-center">{firstPlaceAnswer}</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Layout */}
        <div className="flex gap-6">
          {/* Left Side - Players 1-3 */}
          <div className="w-56 flex flex-col gap-4">
            {players.slice(0, 3).map((player, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${
                  index === 0
                    ? 'from-yellow-900/40 to-yellow-800/20 border-yellow-500/40'
                    : index === 1
                    ? 'from-purple-900/40 to-purple-800/20 border-purple-500/30'
                    : 'from-blue-900/40 to-blue-800/20 border-blue-500/30'
                } rounded-xl p-4 border`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">{player.character}</div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-bold truncate">{player.name}</div>
                    <div className={`text-xs ${
                      index === 0 ? 'text-yellow-400' : index === 1 ? 'text-purple-400' : 'text-blue-400'
                    }`}>
                      {player.rank}
                    </div>
                  </div>
                </div>
                <div className="text-white font-bold text-xl">{playerScores[index]}점</div>
              </div>
            ))}
          </div>

          {/* Center - Problem Area */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Question Header */}
            <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl p-4 border border-purple-500/30 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-purple-600 rounded-lg px-4 py-2">
                  <span className="text-white font-bold">문제 {currentQuestion}/6</span>
                </div>
                <div className="flex gap-5">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        i < currentQuestion - 1 ? 'bg-green-500' : i === currentQuestion - 1 ? 'bg-cyan-500' : 'bg-gray-700'
                      }`}
                    >
                      <span className="text-white text-xs">{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-900/50 rounded-lg px-4 py-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-bold text-lg">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Drawing Tools */}
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-4 border border-purple-500/30">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setDrawingEnabled(!drawingEnabled)}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    drawingEnabled 
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white' 
                      : 'bg-purple-900/50 text-purple-300'
                  }`}
                >
                  <Pencil className="w-4 h-4" />
                  <span>필기 모드</span>
                </button>
                
                {drawingEnabled && (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-300 text-sm">색상:</span>
                      {['#ff0000', '#0000ff', '#00ff00', '#ffff00', '#000000'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setPenColor(color)}
                          className={`w-8 h-8 rounded-full border-2 ${
                            penColor === color ? 'border-white' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-purple-300 text-sm">굵기:</span>
                      {[2, 3, 5, 8].map((size) => (
                        <button
                          key={size}
                          onClick={() => setPenSize(size)}
                          className={`w-8 h-8 rounded flex items-center justify-center ${
                            penSize === size 
                              ? 'bg-cyan-600 text-white' 
                              : 'bg-purple-900/50 text-purple-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={clearCanvas}
                      className="px-4 py-2 rounded-lg bg-red-600/50 hover:bg-red-600/70 text-white transition-all flex items-center gap-2"
                    >
                      <Eraser className="w-4 h-4" />
                      <span>지우기</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Problem Image with Canvas Overlay */}
            <div className="bg-white rounded-xl p-8 shadow-xl flex-1 flex items-center justify-center relative">
              <img 
                src={problemImages[currentQuestion - 1]} 
                alt="수학 문제" 
                className="max-w-full max-h-full object-contain"
              />
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="absolute top-0 left-0 w-full h-full cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{ pointerEvents: drawingEnabled ? 'auto' : 'none' }}
              />
            </div>

            {/* Calculator Input */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-6 border border-gray-700">
              <div className="mb-4">
                <div className="bg-gray-950 rounded-lg p-4 mb-4 border border-gray-700">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="답을 입력하세요..."
                    className="w-full bg-transparent text-white text-2xl text-right outline-none"
                  />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {calculatorButtons.map((row, rowIndex) =>
                    row.map((btn, btnIndex) => (
                      <button
                        key={`${rowIndex}-${btnIndex}`}
                        onClick={() => handleCalculatorClick(btn)}
                        className={`py-3 rounded-lg font-bold transition-all ${
                          btn === '=' || btn === 'C'
                            ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500'
                            : ['÷', '×', '-', '+', '(', ')'].includes(btn)
                            ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500'
                            : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`}
                      >
                        {btn}
                      </button>
                    ))
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold py-4 rounded-lg shadow-lg shadow-cyan-500/30 transition-all"
                >
                  제출
                </button>
                <button className="bg-blue-900/50 hover:bg-blue-800/60 text-blue-300 font-bold px-6 py-4 rounded-lg border border-blue-500/30 transition-all flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  힌트 (2P)
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Players 4-6 */}
          <div className="w-56 flex flex-col gap-4">
            {players.slice(3, 6).map((player, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-4 border border-purple-500/30"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">{player.character}</div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-bold truncate">{player.name}</div>
                    <div className="text-purple-400 text-xs">{player.rank}</div>
                  </div>
                </div>
                <div className="text-white font-bold text-xl">{playerScores[index + 3]}점</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
