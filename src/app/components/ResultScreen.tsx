import { Trophy, Medal, Award } from 'lucide-react';

interface ResultScreenProps {
  onNavigate: (screen: string) => void;
}

export function ResultScreen({ onNavigate }: ResultScreenProps) {
  const topThree = [
    { name: '수학왕 김천재', score: 48, correct: 6, character: '🐼', rank: 'Diamond III' },
    { name: '공식마스터 이수리', score: 42, correct: 5, character: '🦊', rank: 'Diamond II' },
    { name: '기하학신동 정증명', score: 35, correct: 5, character: '🐰', rank: 'Platinum I' },
  ];

  const bottomThree = [
    { name: '방정식킬러 박해법', score: 28, correct: 4, character: '🐨', rank: 'Diamond I' },
    { name: '미적분귀재 최극한', score: 22, correct: 3, character: '🐯', rank: 'Diamond II' },
    { name: '확률천재 송통계', score: 15, correct: 3, character: '🐻', rank: 'Platinum II' },
  ];

  const rankedPlayers = [...topThree, ...bottomThree];

  return (
    <div className="min-h-screen bg-[#0A0F2A] px-8 py-12 relative overflow-hidden">
      {/* Confetti Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.3
            }}
          >
            {['🎉', '⭐', '🏆', '✨'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            게임 종료!
          </h1>
          <p className="text-purple-300 text-lg">최종 순위가 발표되었습니다</p>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-8 flex items-end justify-center gap-8 px-12">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="text-6xl mb-3 animate-bounce delay-100">
              {topThree[1].character}
            </div>
            <div className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-t-2xl px-8 pb-8 pt-6 border-4 border-gray-300 shadow-2xl shadow-gray-500/50 min-w-[200px]" style={{ height: '180px' }}>
              <div className="text-center">
                <div className="text-6xl font-bold text-white mb-2">2</div>
                <div className="text-white font-bold text-lg mb-1">{topThree[1].name}</div>
                <div className="text-gray-200 text-sm mb-2">{topThree[1].rank}</div>
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <div className="text-white font-bold text-2xl">{topThree[1].score}점</div>
                </div>
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <div className="text-8xl mb-4 animate-bounce">
              {topThree[0].character}
            </div>
            <div className="text-4xl mb-2">👑</div>
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-t-2xl px-10 pb-10 pt-8 border-4 border-yellow-300 shadow-2xl shadow-yellow-500/60 min-w-[220px]" style={{ height: '240px' }}>
              <div className="text-center">
                <div className="text-7xl font-bold text-white mb-3">1</div>
                <div className="text-white font-bold text-xl mb-2">{topThree[0].name}</div>
                <div className="text-yellow-100 text-sm mb-3">{topThree[0].rank}</div>
                <div className="bg-white/30 rounded-lg px-5 py-2">
                  <div className="text-white font-bold text-3xl">{topThree[0].score}점</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="text-6xl mb-3 animate-bounce delay-200">
              {topThree[2].character}
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-t-2xl px-8 pb-8 pt-6 border-4 border-orange-400 shadow-2xl shadow-orange-500/50 min-w-[200px]" style={{ height: '140px' }}>
              <div className="text-center">
                <div className="text-6xl font-bold text-white mb-2">3</div>
                <div className="text-white font-bold text-lg mb-1">{topThree[2].name}</div>
                <div className="text-orange-200 text-sm mb-2">{topThree[2].rank}</div>
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <div className="text-white font-bold text-2xl">{topThree[2].score}점</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4th-6th Place */}
        <div className="max-w-3xl mx-auto space-y-3">
          {bottomThree.map((player, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{player.character}</div>
                  <div>
                    <div className="text-white font-bold text-lg">{player.name}</div>
                    <div className="text-purple-400 text-sm">{player.rank}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-white font-bold text-2xl">{player.score}점</div>
                  <div className="bg-purple-600 rounded-lg px-4 py-2 min-w-[60px] text-center">
                    <div className="text-white font-bold text-xl">{index + 4}위</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={() => onNavigate('channel')}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-105"
          >
            다시 하기
          </button>
          <button
            onClick={() => onNavigate('mypage')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl shadow-lg shadow-purple-500/30 transition-all transform hover:scale-105"
          >
            마이페이지
          </button>
        </div>
      </div>
    </div>
  );
}