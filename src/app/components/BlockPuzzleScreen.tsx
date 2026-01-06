import { useState, useEffect, useRef } from 'react';
import { Clock, Award } from 'lucide-react';
import problem1 from 'figma:asset/e1d4b7e7a3b9971d5074cfdc408860fcdd3081f1.png';
import problem2 from 'figma:asset/11ae85740dfb01504a5aff4ec90a609cf27e8306.png';
import problem3 from 'figma:asset/7614ea2b359b9415b329964d4441615c3aad1aa5.png';

interface BlockPuzzleScreenProps {
  onNavigate: (screen: string) => void;
}

export function BlockPuzzleScreen({ onNavigate }: BlockPuzzleScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(180);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownTime, setCountdownTime] = useState(10);
  const [answer, setAnswer] = useState('');
  const [firstSubmitted, setFirstSubmitted] = useState(false);
  const [selectedBlocks, setSelectedBlocks] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const problemImages = [problem1, problem2, problem3];

  const players = [
    { name: '수학왕 김천재', rank: 'Diamond III', score: 0, status: 'active', character: '🐼' },
    { name: '공식마스터 이수리', rank: 'Diamond II', score: 0, status: 'thinking', character: '🦊' },
    { name: '기하학신동 정증명', rank: 'Platinum I', score: 0, character: '🐰' },
    { name: '방정식킬러 박해법', rank: 'Diamond I', score: 0, character: '🐨' },
    { name: '미적분귀재 최극한', rank: 'Diamond II', score: 0, character: '🐯' },
    { name: '확률천재 송통계', rank: 'Platinum II', score: 0, character: '🐻' },
  ];

  // 블록 퍼즐 조각들
  const puzzleBlocks = [
    { id: 1, shape: '🟦', value: 'A' },
    { id: 2, shape: '🟪', value: 'B' },
    { id: 3, shape: '🟨', value: 'C' },
    { id: 4, shape: '🟩', value: 'D' },
    { id: 5, shape: '🟧', value: 'E' },
    { id: 6, shape: '🟥', value: 'F' },
  ];

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
      if (currentQuestion < 3) {
        setCurrentQuestion(currentQuestion + 1);
        setShowCountdown(false);
        setCountdownTime(10);
        setTimeLeft(180);
        setAnswer('');
        setFirstSubmitted(false);
        setSelectedBlocks([]);
      } else {
        onNavigate('result');
      }
    }
  }, [showCountdown, countdownTime, currentQuestion, onNavigate]);

  const handleBlockClick = (blockId: number) => {
    if (selectedBlocks.includes(blockId)) {
      setSelectedBlocks(selectedBlocks.filter(id => id !== blockId));
    } else {
      setSelectedBlocks([...selectedBlocks, blockId]);
    }
  };

  const handleSubmit = () => {
    if (!firstSubmitted) {
      setFirstSubmitted(true);
      setShowCountdown(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F2A] px-6 py-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Countdown Timer */}
        {showCountdown && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl px-12 py-6 shadow-2xl shadow-red-500/50 border-4 border-red-400 animate-pulse">
              <div className="text-center">
                <div className="text-white text-sm mb-2">1등 제출! 빠르게 제출하세요!</div>
                <div className="text-6xl font-bold text-white">{countdownTime}</div>
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
                <div className="text-white font-bold">점수: {player.score}</div>
              </div>
            ))}
          </div>

          {/* Center - Puzzle Area */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Question Header */}
            <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl p-4 border border-purple-500/30 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-purple-600 rounded-lg px-4 py-2">
                  <span className="text-white font-bold">블록 퍼즐 {currentQuestion}/3</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-900/50 rounded-lg px-4 py-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-bold text-lg">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Problem Image */}
            <div className="bg-white rounded-xl p-8 shadow-xl flex items-center justify-center" style={{ height: '400px' }}>
              <img 
                src={problemImages[currentQuestion - 1]} 
                alt="블록 퍼즐 문제" 
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Puzzle Blocks */}
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-6 border border-purple-500/30">
              <h3 className="text-white font-bold mb-4">블록을 선택하여 답을 완성하세요</h3>
              <div className="grid grid-cols-6 gap-4 mb-4">
                {puzzleBlocks.map((block) => (
                  <button
                    key={block.id}
                    onClick={() => handleBlockClick(block.id)}
                    className={`aspect-square rounded-xl text-4xl flex items-center justify-center transition-all ${
                      selectedBlocks.includes(block.id)
                        ? 'bg-green-600/50 border-2 border-green-400 scale-110'
                        : 'bg-purple-900/30 border-2 border-purple-500/30 hover:border-purple-400'
                    }`}
                  >
                    {block.shape}
                  </button>
                ))}
              </div>

              {/* Selected Blocks Display */}
              <div className="bg-purple-900/30 rounded-lg p-4 mb-4 min-h-[80px]">
                <div className="flex gap-2 flex-wrap">
                  {selectedBlocks.map((blockId) => {
                    const block = puzzleBlocks.find(b => b.id === blockId);
                    return block ? (
                      <div key={blockId} className="text-4xl">{block.shape}</div>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold py-4 rounded-lg shadow-lg shadow-cyan-500/30 transition-all"
                >
                  제출
                </button>
                <button 
                  onClick={() => setSelectedBlocks([])}
                  className="bg-blue-900/50 hover:bg-blue-800/60 text-blue-300 font-bold px-6 py-4 rounded-lg border border-blue-500/30 transition-all flex items-center gap-2"
                >
                  초기화
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
                <div className="text-white font-bold">점수: {player.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
