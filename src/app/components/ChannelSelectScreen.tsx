import { useState } from 'react';
import { Trophy, TrendingUp, Flame, Target, User, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface ChannelSelectScreenProps {
  onNavigate: (screen: string) => void;
}

export function ChannelSelectScreen({ onNavigate }: ChannelSelectScreenProps) {
  const [showFriendsDialog, setShowFriendsDialog] = useState(false);

  const studentInfo = {
    name: '수학왕 김천재',
    rank: 'Diamond III',
    topPercent: '상위 2.3%'
  };

  const stats = {
    todayWinRate: '75%',
    weeklyWins: 12,
    winStreak: 5
  };

  const friends = [
    { name: '공식마스터 이수리', rank: 'Diamond II', character: '🦊', status: '온라인' },
    { name: '기하학신동 정증명', rank: 'Platinum I', character: '🐰', status: '게임 중' },
    { name: '방정식킬러 박해법', rank: 'Diamond I', character: '🐨', status: '오프라인' },
    { name: '미적분귀재 최극한', rank: 'Diamond II', character: '🐯', status: '온라인' },
    { name: '확률천재 송통계', rank: 'Platinum II', character: '🐻', status: '오프라인' },
  ];

  const middleSchoolGrades = [
    { grade: '중1', color: 'from-cyan-600 to-blue-600', borderColor: 'border-cyan-400' },
    { grade: '중2', color: 'from-blue-600 to-purple-600', borderColor: 'border-blue-400' },
    { grade: '중3', color: 'from-purple-600 to-pink-600', borderColor: 'border-purple-400' },
  ];

  const highSchoolGrades = [
    { grade: '고1', color: 'from-pink-600 to-red-600', borderColor: 'border-pink-400' },
    { grade: '고2', color: 'from-red-600 to-orange-600', borderColor: 'border-red-400' },
    { grade: '고3', color: 'from-orange-600 to-yellow-600', borderColor: 'border-orange-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F2A] px-8 py-8">
      {/* Student Info Section */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-purple-500/30 shadow-lg shadow-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{studentInfo.name}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-yellow-400 font-bold">{studentInfo.rank}</span>
                  <span className="text-cyan-400">{studentInfo.topPercent}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => onNavigate('mypage')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                <span>마이페이지</span>
              </button>
              <button
                onClick={() => setShowFriendsDialog(true)}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                <span>친구보기</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 rounded-xl p-6 border border-cyan-500/30">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
              <span className="text-cyan-300 text-sm">오늘의 승률</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.todayWinRate}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-purple-400" />
              <span className="text-purple-300 text-sm">이번 주 승수</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.weeklyWins}승</div>
          </div>
          <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 rounded-xl p-6 border border-orange-500/30">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-6 h-6 text-orange-400" />
              <span className="text-orange-300 text-sm">연속 우승</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.winStreak}연승</div>
          </div>
        </div>
      </div>

      {/* Game Selection */}
      <div className="max-w-5xl mx-auto mb-8">
        <h3 className="text-xl text-purple-300 mb-6">게임 선택</h3>
        
        {/* Middle School */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-t-xl p-4 border-t border-x border-cyan-500/30">
            <h4 className="text-white font-bold text-lg flex items-center gap-2">
              <span>📚</span>
              <span>중학교 경쟁전</span>
            </h4>
          </div>
          <div className="grid grid-cols-3 gap-4 bg-cyan-900/10 rounded-b-xl p-4 border-b border-x border-cyan-500/20">
            {middleSchoolGrades.map((item) => (
              <button
                key={item.grade}
                onClick={() => onNavigate('matching')}
                className={`group relative overflow-hidden bg-gradient-to-r ${item.color} rounded-xl p-8 border-2 ${item.borderColor} shadow-lg hover:shadow-2xl transition-all transform hover:scale-105`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 text-center">
                  <div className="text-4xl font-bold text-white mb-2">{item.grade}</div>
                  <div className="text-white/80 text-sm">경쟁전 참여</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* High School */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-pink-900/30 to-orange-900/30 rounded-t-xl p-4 border-t border-x border-pink-500/30">
            <h4 className="text-white font-bold text-lg flex items-center gap-2">
              <span>🎓</span>
              <span>고등학교 경쟁전</span>
            </h4>
          </div>
          <div className="grid grid-cols-3 gap-4 bg-pink-900/10 rounded-b-xl p-4 border-b border-x border-pink-500/20">
            {highSchoolGrades.map((item) => (
              <button
                key={item.grade}
                onClick={() => onNavigate('matching')}
                className={`group relative overflow-hidden bg-gradient-to-r ${item.color} rounded-xl p-8 border-2 ${item.borderColor} shadow-lg hover:shadow-2xl transition-all transform hover:scale-105`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 text-center">
                  <div className="text-4xl font-bold text-white mb-2">{item.grade}</div>
                  <div className="text-white/80 text-sm">경쟁전 참여</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Challenge Section */}
        <div className="mb-8">
          <h3 className="text-xl text-purple-300 mb-6">챌린지</h3>
          <button
            onClick={() => onNavigate('blockpuzzle')}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 rounded-2xl p-10 border-2 border-yellow-400/50 shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/70 transition-all transform hover:scale-102"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Target className="w-12 h-12 text-yellow-200" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white mb-1">주간 챌린지</h3>
                  <p className="text-yellow-100">블록 퍼즐 맞추기 - 특별 보상 획득!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-yellow-200 text-sm">참여 가능</div>
                <div className="text-3xl font-bold text-white">⭐</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Friends Dialog */}
      <Dialog open={showFriendsDialog} onOpenChange={setShowFriendsDialog}>
        <DialogContent className="bg-[#1a1f4a] border-purple-500/50 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              친구 목록
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
            {friends.map((friend, index) => (
              <div
                key={index}
                className="bg-purple-900/30 rounded-xl p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{friend.character}</div>
                  <div>
                    <div className="text-white font-bold">{friend.name}</div>
                    <div className="text-purple-400 text-sm">{friend.rank}</div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-lg text-sm ${
                  friend.status === '온라인' ? 'bg-green-500/30 text-green-300' :
                  friend.status === '게임 중' ? 'bg-blue-500/30 text-blue-300' :
                  'bg-gray-500/30 text-gray-300'
                }`}>
                  {friend.status}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
