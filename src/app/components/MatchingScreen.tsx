import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface MatchingScreenProps {
  onNavigate: (screen: string) => void;
}

export function MatchingScreen({ onNavigate }: MatchingScreenProps) {
  const [matchingProgress, setMatchingProgress] = useState(0);
  const [foundPlayers, setFoundPlayers] = useState(0);

  const players = [
    { name: '수학왕 김천재', level: 'Diamond III', character: '🐼', emoji: '😎', position: { top: '15%', left: '10%' } },
    { name: '공식마스터 이수리', level: 'Diamond II', character: '🦊', emoji: '🤗', position: { top: '25%', right: '15%' } },
    { name: '기하학신동 정증명', level: 'Platinum I', character: '🐰', emoji: '😊', position: { top: '50%', left: '20%' } },
    { name: '방정식킬러 박해법', level: 'Diamond I', character: '🐨', emoji: '😁', position: { top: '60%', right: '18%' } },
    { name: '미적분귀재 최극한', level: 'Diamond II', character: '🐯', emoji: '🥰', position: { top: '75%', left: '15%' } },
    { name: '확률천재 송통계', level: 'Platinum II', character: '🐻', emoji: '😄', position: { top: '70%', right: '12%' } },
  ];

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setMatchingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => onNavigate('play'), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(progressTimer);
  }, [onNavigate]);

  useEffect(() => {
    const playerTimer = setInterval(() => {
      setFoundPlayers((prev) => {
        if (prev >= 6) {
          clearInterval(playerTimer);
          return 6;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(playerTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F2A] via-[#1a1058] to-[#0A0F2A] relative overflow-hidden">
      {/* Space Background */}
      <div className="absolute inset-0">
        {/* Stars */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 2 + 's',
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
        
        {/* Planets */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-40 left-40 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-100"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-2xl animate-pulse delay-200"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-cyan-400 animate-spin" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              플레이어 매칭 중
            </h1>
            <Sparkles className="w-8 h-8 text-pink-400 animate-spin" />
          </div>
          <p className="text-purple-300 text-lg">
            {foundPlayers < 6 ? `${foundPlayers}/6명 찾는 중...` : '매칭 완료! 곧 시작됩니다...'}
          </p>
        </div>

        {/* Players in Space */}
        <div className="relative w-full max-w-5xl h-[600px] mb-8">
          {players.slice(0, foundPlayers).map((player, index) => (
            <div
              key={index}
              className="absolute animate-float"
              style={{
                ...player.position,
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {/* Speech Bubble */}
              <div className="relative">
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-purple-900/90 backdrop-blur-sm rounded-2xl px-4 py-2 border border-purple-400/50 shadow-lg shadow-purple-500/30 whitespace-nowrap animate-bounce">
                  <div className="text-white font-bold text-sm">{player.name}</div>
                  <div className="text-cyan-400 text-xs">{player.level}</div>
                  {/* Arrow */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-purple-900/90"></div>
                </div>

                {/* Character */}
                <div className="text-center">
                  {/* Head */}
                  <div className="text-6xl mb-2 relative">
                    {player.character}
                    <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                      {player.emoji}
                    </div>
                  </div>
                  {/* Body */}
                  <div className="text-4xl mb-1">👔</div>
                  {/* Legs */}
                  <div className="text-3xl">👖</div>
                  {/* Feet */}
                  <div className="text-2xl">👟</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md">
          <div className="bg-purple-900/30 rounded-full h-4 overflow-hidden border border-purple-500/30 mb-3">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${matchingProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <div className="text-center text-cyan-400 font-bold">{matchingProgress}%</div>
        </div>

        {/* Loading Animation */}
        <div className="flex gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}