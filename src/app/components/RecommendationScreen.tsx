import { Play, CheckCircle, Lock } from 'lucide-react';

interface RecommendationScreenProps {
  onNavigate: (screen: string) => void;
}

export function RecommendationScreen({ onNavigate }: RecommendationScreenProps) {
  const purchasedLectures = [
    {
      id: 1,
      unit: '소인수분해',
      title: '소인수분해 기초와 활용',
      instructor: '김수학 선생님',
      duration: '45분',
      progress: 100,
      difficulty: '중',
      isPurchased: true,
      isCompleted: true,
      thumbnail: '📐'
    },
    {
      id: 2,
      unit: '최대공약수와 최소공배수',
      title: '최대공약수·최소공배수 완벽 정복',
      instructor: '이공식 선생님',
      duration: '38분',
      progress: 65,
      difficulty: '중',
      isPurchased: true,
      isCompleted: false,
      thumbnail: '🔢'
    },
    {
      id: 3,
      unit: '정수와 유리수',
      title: '정수와 유리수의 사칙연산',
      instructor: '박해법 선생님',
      duration: '50분',
      progress: 30,
      difficulty: '중하',
      isPurchased: true,
      isCompleted: false,
      thumbnail: '🎯'
    },
  ];

  const recommendedLectures = [
    {
      id: 4,
      unit: '소인수분해 심화',
      title: '소인수분해 심화 문제풀이',
      instructor: '김수학 선생님',
      duration: '42분',
      price: 50,
      difficulty: '중상',
      isPurchased: false,
      reason: '소인수분해 기초 강의를 완료하셨습니다. 다음 단계로 심화 과정을 추천합니다.',
      thumbnail: '📚'
    },
    {
      id: 5,
      unit: '최대공약수·최소공배수 응용',
      title: '실전 문제로 배우는 최대공약수·최소공배수',
      instructor: '이공식 선생님',
      duration: '35분',
      price: 50,
      difficulty: '중상',
      isPurchased: false,
      reason: '기본 강의를 65% 진행하셨습니다. 응용 과정을 함께 수강하면 효과적입니다.',
      thumbnail: '🎓'
    },
    {
      id: 6,
      unit: '정수와 유리수 심화',
      title: '정수와 유리수 고난도 문제 정복',
      instructor: '최극한 선생님',
      duration: '48분',
      price: 50,
      difficulty: '상',
      isPurchased: false,
      reason: '기본 개념을 학습 중이시군요. 이 강의는 기본 강의 완료 후 수강을 추천합니다.',
      thumbnail: '🏆'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F2A] px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            내가 구매한 강의
          </h1>
          <p className="text-purple-300">중1 수학 - 1학기 과정</p>
        </div>

        {/* Purchased Lectures - Thumbnail Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6">📚 수강 중인 강의</h2>
          <div className="grid grid-cols-3 gap-6">
            {purchasedLectures.map((lecture) => (
              <div
                key={lecture.id}
                className={`bg-gradient-to-br ${
                  lecture.isCompleted 
                    ? 'from-green-900/30 to-green-800/20 border-green-500/40' 
                    : 'from-purple-900/40 to-pink-900/40 border-purple-500/30'
                } rounded-2xl overflow-hidden border hover:scale-105 transition-all cursor-pointer`}
              >
                {/* Thumbnail */}
                <div className={`h-48 flex items-center justify-center text-8xl ${
                  lecture.isCompleted ? 'bg-green-600/20' : 'bg-purple-600/20'
                }`}>
                  {lecture.thumbnail}
                  {lecture.isCompleted && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                      lecture.isCompleted ? 'bg-green-500/30 text-green-300' : 'bg-cyan-500/30 text-cyan-300'
                    }`}>
                      {lecture.unit}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">{lecture.title}</h3>
                  <div className="space-y-2 text-sm text-purple-300 mb-4">
                    <div>👨‍🏫 {lecture.instructor}</div>
                    <div>⏱️ {lecture.duration}</div>
                    <div className={`inline-block px-2 py-1 rounded ${
                      lecture.difficulty === '중' ? 'bg-yellow-500/30 text-yellow-300' :
                      lecture.difficulty === '중하' ? 'bg-green-500/30 text-green-300' :
                      'bg-orange-500/30 text-orange-300'
                    }`}>
                      {lecture.difficulty}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-purple-300">진행률</span>
                      <span className="text-sm font-bold text-white">{lecture.progress}%</span>
                    </div>
                    <div className="bg-purple-900/30 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          lecture.isCompleted 
                            ? 'bg-gradient-to-r from-green-400 to-green-500' 
                            : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                        }`}
                        style={{ width: `${lecture.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    <span>{lecture.isCompleted ? '다시 보기' : '이어서 보기'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Lectures - Thumbnail Grid */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">💡 추천 강의 (1단계 높은 난이도)</h2>
          <div className="grid grid-cols-3 gap-6">
            {recommendedLectures.map((lecture) => (
              <div
                key={lecture.id}
                className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 rounded-2xl overflow-hidden border border-yellow-500/30 hover:border-yellow-400/50 hover:scale-105 transition-all cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="h-48 bg-yellow-600/20 flex items-center justify-center text-8xl relative">
                  {lecture.thumbnail}
                  <div className="absolute top-4 right-4 bg-yellow-500/30 text-yellow-300 px-3 py-1 rounded-lg text-sm font-bold">
                    ⭐ 추천
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-lg text-sm font-bold bg-yellow-500/30 text-yellow-300">
                      {lecture.unit}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">{lecture.title}</h3>
                  <div className="space-y-2 text-sm text-yellow-200 mb-4">
                    <div>👨‍🏫 {lecture.instructor}</div>
                    <div>⏱️ {lecture.duration}</div>
                    <div className={`inline-block px-2 py-1 rounded ${
                      lecture.difficulty === '중상' ? 'bg-orange-500/40 text-orange-200' : 'bg-red-500/40 text-red-200'
                    }`}>
                      {lecture.difficulty}
                    </div>
                  </div>

                  <div className="bg-yellow-900/30 rounded-lg p-3 border border-yellow-500/20 mb-4">
                    <p className="text-yellow-100 text-sm line-clamp-3">
                      <span className="font-bold text-yellow-300">추천 이유:</span> {lecture.reason}
                    </p>
                  </div>

                  <button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                    <span>{lecture.price}P</span>
                    <span>구매하기</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 rounded-full p-3">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold mb-2">강의 구매 안내</h4>
                <p className="text-purple-300 text-sm leading-relaxed">
                  각 소단원별 강의는 50 포인트로 구매할 수 있습니다. 
                  게임 참여, 우승, 학습 완료 등으로 포인트를 획득하세요. 
                  구매한 강의는 언제든지 무제한으로 시청할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}