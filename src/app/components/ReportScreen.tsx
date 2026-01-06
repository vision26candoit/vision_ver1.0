import { useState } from 'react';
import { TrendingUp, Award, Clock, Lock, Sparkles, BookOpen } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface ReportScreenProps {
  onNavigate: (screen: string) => void;
}

export function ReportScreen({ onNavigate }: ReportScreenProps) {
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [userPoints, setUserPoints] = useState(350);

  const monthlyData = [
    { month: '7월', rate: 62 },
    { month: '8월', rate: 65 },
    { month: '9월', rate: 68 },
    { month: '10월', rate: 71 },
    { month: '11월', rate: 74 },
    { month: '12월', rate: 78 },
  ];

  const domainData = [
    { domain: '수와 연산', user: 75, average: 68, top1: 95 },
    { domain: '변화와 관계', user: 82, average: 72, top1: 98 },
    { domain: '도형과 측정', user: 68, average: 65, top1: 92 },
    { domain: '자료와 가능성', user: 71, average: 70, top1: 94 },
  ];

  const radarData = [
    { subject: '수와 연산', user: 75, average: 68 },
    { subject: '변화와 관계', user: 82, average: 72 },
    { subject: '도형과 측정', user: 68, average: 65 },
    { subject: '자료와 가능성', user: 71, average: 70 },
  ];

  const weakUnits = [
    {
      id: 1,
      unit: '정수의 곱셈',
      chapter: '중1-2. 정수와 유리수',
      weakness: '부호 규칙 혼동',
      advice: '기초부터 다시 학습하세요. 음수×음수=양수 규칙을 완벽히 익히세요.',
      studyMethod: `1단계: 부호 규칙의 원리 이해
- 수직선을 활용하여 음수의 의미를 시각화합니다
- (-1) × (-1) = +1이 되는 이유를 패턴으로 이해 
  (2×(-1)=-2, 1×(-1)=-1, 0×(-1)=0, (-1)×(-1)=?)
- 곱셈의 교환법칙과 결합법칙을 이용한 부호 규칙 유도

2단계: 체계적 연습
- 같은 부호끼리의 곱셈 (+)×(+), (-)×(-) 반복 연습 30문제
- 다른 부호끼리의 곱셈 (+)×(-), (-)×(+) 반복 연습 30문제
- 세 수 이상의 곱셈 연습 20문제 (부호의 개수 파악이 핵심)

3단계: 실수 방지 전략
- 계산 전 부호만 먼저 결정하는 습관 들이기
- 음수의 개수가 짝수면 양수, 홀수면 음수 규칙 암기
- 실전 문제 풀이 시 부호와 절댓값을 분리하여 계산

4단계: 심화 학습
- 분수와 소수가 포함된 정수 곱셈 연습
- 괄호가 있는 복잡한 식에서의 부호 처리
- 실생활 문제로 개념 적용 (온도 변화, 빚, 이익/손실 등)`,
      commonDifficulty: '많은 학생들이 음수의 곱셈에서 부호를 잘못 판단합니다.',
      lectureReason: '이 강의는 부호 규칙을 단계별로 설명하며, 실전 문제로 완벽히 마스터할 수 있습니다.',
      lectureName: '정수와 유리수 완벽 마스터',
      thumbnail: '📐',
    },
    {
      id: 2,
      unit: '소인수분해 응용',
      chapter: '중1-1. 소인수분해',
      weakness: '복잡한 수의 소인수분해',
      advice: '기본 소인수분해를 마스터한 후 응용 문제를 풀어보세요.',
      studyMethod: `1단계: 기본 원리 복습
- 소수와 합성수의 정의 확실히 하기
- 작은 수부터 나누어 떨어지는지 확인하는 습관
- 소인수분해의 유일성 이해

2단계: 체계적 연습
- 100 이하의 수 소인수분해 30문제
- 세 자리 수의 소인수분해 20문제
- 지수를 활용한 표현 연습

3단계: 응용 문제 해결
- 최대공약수, 최소공배수 구하기
- 제곱수 판별 문제
- 약수의 개수 구하기`,
      commonDifficulty: '큰 수의 소인수분해에서 어떤 소수로 나눠야 할지 막막해합니다.',
      lectureReason: '소인수분해의 기본부터 응용까지 체계적으로 학습할 수 있습니다.',
      lectureName: '소인수분해 심화 문제풀이',
      thumbnail: '🔢',
    },
    {
      id: 3,
      unit: '최대공약수 활용',
      chapter: '중1-1. 최대공약수와 최소공배수',
      weakness: '실생활 문제 적용',
      advice: '문제에서 최대공약수를 활용해야 하는 상황을 파악하는 연습이 필요합니다.',
      studyMethod: `1단계: 개념 정립
- 최대공약수의 의미 완벽히 이해
- 유클리드 호제법 학습
- 세 수 이상의 최대공약수 구하기

2단계: 문제 유형 분석
- "가장 큰", "최대로", "남김없이" 등의 키워드 파악
- 공통으로 나누는 상황 인지하기
- 문제를 수식으로 변환하는 연습

3단계: 실전 응용
- 물건 나누기 문제 20문제
- 정사각형 만들기 문제 15문제
- 배열 문제 15문제`,
      commonDifficulty: '최대공약수와 최소공배수 중 어느 것을 써야 할지 헷갈려합니다.',
      lectureReason: '실생활 문제를 통해 최대공약수 활용법을 완벽히 익힐 수 있습니다.',
      lectureName: '최대공약수·최소공배수 활용',
      thumbnail: '🎯',
    },
  ];

  const handleUnlockPremium = () => {
    if (userPoints >= 150) {
      setIsPremiumUnlocked(true);
      setUserPoints(userPoints - 150);
    }
  };

  const handlePurchaseLecture = (price: number) => {
    if (userPoints >= price) {
      setUserPoints(userPoints - price);
      alert('강의가 구매되었습니다!');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F2A] px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              시즌 리포트
            </h1>
            <p className="text-purple-300">2025년 누적 학습 분석</p>
          </div>
          <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl px-6 py-3 border border-purple-500/30">
            <span className="text-cyan-400 font-bold text-xl">포인트: {userPoints}P</span>
          </div>
        </div>

        {/* Free Section - Summary Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 rounded-2xl p-6 border border-cyan-500/30">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
              <span className="text-cyan-300">평균 점수</span>
            </div>
            <div className="text-4xl font-bold text-white mb-1">73.5점</div>
            <div className="text-cyan-400 text-sm">전월 대비 +5.2점</div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-2xl p-6 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-8 h-8 text-purple-400" />
              <span className="text-purple-300">정답률</span>
            </div>
            <div className="text-4xl font-bold text-white mb-1">74.2%</div>
            <div className="text-purple-400 text-sm">상위 15% 수준</div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 rounded-2xl p-6 border border-orange-500/30">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-8 h-8 text-orange-400" />
              <span className="text-orange-300">학습 시간</span>
            </div>
            <div className="text-4xl font-bold text-white mb-1">42시간</div>
            <div className="text-orange-400 text-sm">이번 달: 12시간</div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-purple-500/30 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">월별 정답률 추이</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="month" stroke="#a0aec0" />
              <YAxis stroke="#a0aec0" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Line type="monotone" dataKey="rate" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Domain Performance */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-4">영역별 성취도</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={domainData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey="domain" stroke="#a0aec0" tick={{ fontSize: 12 }} />
                <YAxis stroke="#a0aec0" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="user" fill="#06b6d4" name="내 점수" />
                <Bar dataKey="average" fill="#8b5cf6" name="평균" />
                <Bar dataKey="top1" fill="#ec4899" name="상위 1%" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-4">역량 분석</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#4a5568" />
                <PolarAngleAxis dataKey="subject" stroke="#a0aec0" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis stroke="#a0aec0" />
                <Radar name="내 점수" dataKey="user" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
                <Radar name="평균" dataKey="average" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Premium Section */}
        <div className="relative">
          {!isPremiumUnlocked && (
            <div className="absolute inset-0 backdrop-blur-sm bg-purple-900/20 rounded-2xl z-10 flex items-center justify-center">
              <button
                onClick={handleUnlockPremium}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-8 py-4 rounded-xl shadow-2xl shadow-yellow-500/50 transition-all transform hover:scale-105 flex items-center gap-3"
              >
                <Sparkles className="w-6 h-6" />
                <div>
                  <div className="font-bold text-lg">프리미엄 피드백 잠금 해제</div>
                  <div className="text-sm">150 포인트</div>
                </div>
              </button>
            </div>
          )}

          <div className={`bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-2xl p-6 border-2 border-yellow-500/40 mb-8 ${!isPremiumUnlocked ? 'blur-sm' : ''}`}>
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-yellow-400" />
              <h3 className="text-2xl font-bold text-white">AI 프리미엄 피드백</h3>
            </div>

            {/* Rank Insights - 맨 위로 이동 */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-yellow-400 mb-3">🎯 랭크별 학습자 분석</h4>
              <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30">
                <p className="text-white mb-2">Diamond 랭크 학습자들이 어려워하는 포인트:</p>
                <ul className="text-yellow-100 text-sm space-y-1 ml-4">
                  <li>• 정수와 유리수의 혼합 계산 (평균 정답률 62%)</li>
                  <li>• 복잡한 소인수분해 문제 (평균 정답률 58%)</li>
                  <li>• 최대공약수·최소공배수 응용 (평균 정답률 65%)</li>
                </ul>
              </div>
            </div>

            {/* Weak Points - 블럭 형태로 변경 */}
            <div className="space-y-6">
              {weakUnits.map((unit, index) => (
                <div key={unit.id} className="bg-yellow-900/20 rounded-2xl p-6 border-2 border-yellow-500/40">
                  <div className="mb-4">
                    <h4 className="text-2xl font-bold text-yellow-300 mb-2">📌 {unit.unit}</h4>
                    <p className="text-yellow-200 text-sm">{unit.chapter}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-yellow-100 mb-2">
                        <span className="font-bold text-yellow-300">취약점:</span> {unit.weakness}
                      </p>
                      <p className="text-yellow-100">
                        <span className="font-bold text-yellow-300">💡 조언:</span> {unit.advice}
                      </p>
                    </div>

                    <div className="bg-yellow-900/30 rounded-lg p-4 border border-yellow-500/20">
                      <h5 className="font-bold text-yellow-300 mb-2">📚 공부 방법:</h5>
                      <pre className="text-yellow-100 text-sm whitespace-pre-wrap leading-relaxed font-sans">
                        {unit.studyMethod}
                      </pre>
                    </div>

                    <div className="bg-orange-900/20 rounded-lg p-3 border border-orange-500/30">
                      <p className="text-orange-200 text-sm">
                        <span className="font-bold">⚠️ 친구들의 어려움:</span> {unit.commonDifficulty}
                      </p>
                    </div>

                    {/* Lecture Recommendation - Thumbnail Style */}
                    <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-4 border border-purple-500/30">
                      <div className="flex items-center gap-4">
                        <div className="bg-purple-600 rounded-xl w-24 h-24 flex items-center justify-center text-5xl flex-shrink-0">
                          {unit.thumbnail}
                        </div>
                        <div className="flex-1">
                          <h5 className="text-white font-bold text-lg mb-1">{unit.lectureName}</h5>
                          <p className="text-purple-300 text-sm mb-2">
                            <span className="font-bold text-yellow-300">🎯 추천 이유:</span> {unit.lectureReason}
                          </p>
                          <button
                            onClick={() => handlePurchaseLecture(50)}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all inline-flex items-center gap-2"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>50P로 구매하기</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}