import { Home, Trophy, User, BookOpen, ShoppingBag, BarChart3, Layout } from 'lucide-react';

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const navigationItems = [
    { id: 'entry', label: '홈', icon: '🏠' },
    { id: 'channel', label: '채널', icon: '🎯' },
    { id: 'matching', label: '매칭', icon: '🔄' },
    { id: 'play', label: '게임', icon: '🎮' },
    { id: 'result', label: '결과', icon: '🏆' },
    { id: 'mypage', label: '마이페이지', icon: '👤' },
    { id: 'report', label: '시즌 리포트', icon: '📊' },
    { id: 'recommendation', label: '강의', icon: '📚' },
    { id: 'avatarshop', label: '스토어', icon: '🛍️' },
  ];

  return (
    <nav className="bg-[#0A0F2A] border-b border-purple-500/30 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Studium
          </div>
        </div>
        <div className="flex gap-2">
          {navigationItems.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentScreen === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-purple-900/20 text-purple-300 hover:bg-purple-800/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}