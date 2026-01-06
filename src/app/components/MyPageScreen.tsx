import { useState } from 'react';
import { User, BookOpen, ShoppingBag, BarChart3, Lock, Unlock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import problem1 from 'figma:asset/93952f3c9743bfeb9635cff67bb53bb162aa2416.png';
import problem2 from 'figma:asset/377a63f34365e22a90fcbf884f4242e928ed2f70.png';

interface MyPageScreenProps {
  onNavigate: (screen: string) => void;
}

export function MyPageScreen({ onNavigate }: MyPageScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 11, 25)); // Dec 25, 2024
  const [currentMonth, setCurrentMonth] = useState(11); // December
  const [currentYear, setCurrentYear] = useState(2024);
  const [unlockedGames, setUnlockedGames] = useState<number[]>([]);
  const [showGameDetails, setShowGameDetails] = useState(false);
  const [userPoints, setUserPoints] = useState(350);
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null);

  const profile = {
    name: '수학왕 김천재',
    rank: 'Diamond III',
    topPercent: '상위 2.3%',
    character: '🐼'
  };

  const stats = {
    winRate: '68.5%',
    totalWins: 147,
    maxStreak: 12
  };

  const dailyGames = [
    { id: 1, name: '다이아몬드 랭킹', score: 48, maxScore: 60 },
    { id: 2, name: '아레나 랭킹', score: 42, maxScore: 60 },
    { id: 3, name: '주간 챌린지', score: 35, maxScore: 60 },
  ];

  const problems = [
    { id: 1, title: '자연수의 소인수분해', difficulty: '중', correct: true, image: problem1 },
    { id: 2, title: '최대공약수와 최소공배수', difficulty: '중', correct: true, image: problem2 },
    { id: 3, title: '유리수의 사칙연산', difficulty: '하', correct: false, image: problem1 },
    { id: 4, title: '정수의 곱셈과 나눗셈', difficulty: '상', correct: true, image: problem2 },
    { id: 5, title: '유리수와 순환소수', difficulty: '중', correct: true, image: problem1 },
    { id: 6, title: '복합 연산 문제', difficulty: '상', correct: false, image: problem2 },
  ];

  const participatedDates = [5, 8, 12, 15, 18, 22, 25, 28];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleUnlockGame = (gameId: number) => {
    if (userPoints >= 100 && !unlockedGames.includes(gameId)) {
      setUnlockedGames([...unlockedGames, gameId]);
      setUserPoints(userPoints - 100);
    }
  };

  const handleUnlockAI = () => {
    if (userPoints >= 100) {
      setUserPoints(userPoints - 100);
      alert('AI 복기 & 트윈 문제가 열렸습니다!');
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isParticipated = participatedDates.includes(day);
      const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth;

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(new Date(currentYear, currentMonth, day))}
          className={`h-12 rounded-lg transition-all ${
            isSelected
              ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold'
              : isParticipated
              ? 'bg-cyan-900/40 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-800/50'
              : 'bg-purple-900/20 text-purple-400 hover:bg-purple-800/30'
          }`}
        >
          {day}
          {isParticipated && !isSelected && (
            <div className="text-xs">⭐</div>
          )}
        </button>
      );
    }

    return days;
  };

  const changeMonth = (delta: number) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  return (
    <div className="min-h-screen bg-[#0A0F2A] px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-72 flex flex-col gap-4">
            {/* Profile */}
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl p-6 border border-purple-500/30">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">{profile.character}</div>
                <h2 className="text-xl font-bold text-white mb-1">{profile.name}</h2>
                <div className="text-yellow-400 font-bold mb-1">{profile.rank}</div>
                <div className="text-cyan-400 text-sm">{profile.topPercent}</div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => onNavigate('report')}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-4 rounded-xl shadow-lg shadow-cyan-500/30 transition-all flex items-center gap-3"
            >
              <BarChart3 className="w-5 h-5" />
              <span>학습 리포트</span>
            </button>

            <button
              onClick={() => onNavigate('recommendation')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-4 rounded-xl shadow-lg shadow-purple-500/30 transition-all flex items-center gap-3"
            >
              <BookOpen className="w-5 h-5" />
              <span>내가 구매한 강의</span>
            </button>

            <button
              onClick={() => onNavigate('avatar')}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-6 py-4 rounded-xl shadow-lg shadow-yellow-500/30 transition-all flex items-center gap-3"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>아바타 상점</span>
            </button>
          </div>

          {/* Center - Daily Status */}
          <div className="flex-1">
            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 rounded-xl p-4 border border-cyan-500/30">
                <div className="text-cyan-300 text-sm mb-1">누적 승률</div>
                <div className="text-2xl font-bold text-white">{stats.winRate}</div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-xl p-4 border border-purple-500/30">
                <div className="text-purple-300 text-sm mb-1">총 승수</div>
                <div className="text-2xl font-bold text-white">{stats.totalWins}승</div>
              </div>
              <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 rounded-xl p-4 border border-orange-500/30">
                <div className="text-orange-300 text-sm mb-1">최고 연승</div>
                <div className="text-2xl font-bold text-white">{stats.maxStreak}연승</div>
              </div>
            </div>

            {/* Daily Games */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-purple-500/30 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl text-white font-bold">
                  {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 경기
                </h3>
                <div className="text-cyan-400 font-bold">포인트: {userPoints}P</div>
              </div>

              <div className="space-y-3">
                {dailyGames.map((game) => (
                  <div
                    key={game.id}
                    className="bg-purple-900/30 rounded-xl p-4 border border-purple-500/20 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <Checkbox
                        checked={unlockedGames.includes(game.id)}
                        onCheckedChange={() => handleUnlockGame(game.id)}
                        disabled={unlockedGames.includes(game.id)}
                      />
                      <div className="flex-1">
                        <div className="text-white font-bold mb-1">{game.name}</div>
                        <div className="text-purple-300 text-sm">점수: {game.score}/{game.maxScore}</div>
                      </div>
                    </div>
                    {!unlockedGames.includes(game.id) ? (
                      <div className="flex items-center gap-2 text-yellow-400 text-sm">
                        <Lock className="w-4 h-4" />
                        <span>100P</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowGameDetails(!showGameDetails)}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm transition-all"
                      >
                        문제 보기
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {unlockedGames.length > 0 && (
                <button
                  onClick={handleUnlockAI}
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg transition-all"
                >
                  🤖 AI 복기 & 트윈 문제 열기 (100P)
                </button>
              )}

              {/* Problem Details */}
              {showGameDetails && unlockedGames.length > 0 && (
                <div className="mt-6 bg-purple-900/40 rounded-xl p-4 border border-purple-500/20">
                  <h4 className="text-white font-bold mb-3">문제 목록</h4>
                  <div className="space-y-2">
                    {problems.map((problem) => (
                      <div
                        key={problem.id}
                        className={`p-3 rounded-lg ${
                          problem.correct ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-white">{problem.id}. {problem.title}</span>
                            <span className={`ml-3 text-xs px-2 py-1 rounded ${
                              problem.difficulty === '상' ? 'bg-red-500/30 text-red-300' :
                              problem.difficulty === '중' ? 'bg-yellow-500/30 text-yellow-300' :
                              'bg-green-500/30 text-green-300'
                            }`}>
                              {problem.difficulty}
                            </span>
                          </div>
                          <span className={problem.correct ? 'text-green-400' : 'text-red-400'}>
                            {problem.correct ? '✓ 정답' : '✗ 오답'}
                          </span>
                        </div>
                        <div className="mt-2">
                          <img
                            src={problem.image}
                            alt={problem.title}
                            className="w-full h-auto"
                            onClick={() => setSelectedProblem(problem.id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right - Calendar */}
          <div className="w-80">
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-2 hover:bg-purple-800/50 rounded-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-purple-300" />
                </button>
                <h3 className="text-lg font-bold text-white">
                  {currentYear}년 {currentMonth + 1}월
                </h3>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-2 hover:bg-purple-800/50 rounded-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-purple-300" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                  <div key={day} className="text-center text-purple-300 text-sm font-bold">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {renderCalendar()}
              </div>

              <div className="mt-4 pt-4 border-t border-purple-500/30">
                <div className="flex items-center gap-2 text-sm text-purple-300 mb-2">
                  <div className="w-4 h-4 bg-cyan-900/40 border border-cyan-500/30 rounded"></div>
                  <span>참여한 날</span>
                </div>
                <div className="text-sm text-purple-400">
                  이번 달 참여: {participatedDates.length}일
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Detail Dialog */}
      {selectedProblem !== null && (
        <Dialog open={selectedProblem !== null} onOpenChange={() => setSelectedProblem(null)}>
          <DialogContent className="bg-[#0A0F2A] text-white">
            <DialogHeader>
              <DialogTitle>문제 상세보기</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <img
                src={problems.find((p) => p.id === selectedProblem)?.image || ''}
                alt="Problem"
                className="w-full h-auto"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}