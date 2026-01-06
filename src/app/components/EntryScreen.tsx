import { useState } from 'react';
import { Sparkles, LogIn } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface EntryScreenProps {
  onNavigate: (screen: string) => void;
}

export function EntryScreen({ onNavigate }: EntryScreenProps) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F2A] via-[#1a1f4a] to-[#0A0F2A] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-100"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-200"></div>
      </div>

      {/* Neon Grid Lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center mb-12">
          <div className="mb-8">
            <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Studium
            </h1>
            <p className="text-2xl text-purple-300">
              Just play · Learn with AI
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-md">
          <button
            onClick={() => setShowLoginDialog(true)}
            className="relative group overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-center justify-center gap-2">
              <LogIn className="w-5 h-5" />
              <span className="text-lg font-bold">게임 시작</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('channel')}
            className="bg-cyan-600/80 hover:bg-cyan-600 text-white px-8 py-4 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
          >
            <span className="text-lg font-bold">회원가입</span>
          </button>

          <button
            onClick={() => onNavigate('channel')}
            className="bg-purple-900/50 hover:bg-purple-800/60 text-purple-300 hover:text-white px-8 py-4 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all"
          >
            <span className="text-lg">게스트로 플레이</span>
          </button>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 text-6xl opacity-20 animate-bounce">🎓</div>
        <div className="absolute top-1/3 right-10 text-5xl opacity-20 animate-bounce delay-100">📊</div>
        <div className="absolute bottom-1/4 left-20 text-5xl opacity-20 animate-bounce delay-200">🏆</div>
      </div>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="bg-[#1a1f4a] border-purple-500/50 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              로그인
            </DialogTitle>
            <DialogDescription className="text-sm text-purple-300">
              계정 정보를 입력하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <div>
              <label className="text-sm text-purple-300 mb-2 block">아이디</label>
              <Input 
                placeholder="아이디를 입력하세요" 
                className="bg-purple-900/20 border-purple-500/30 text-white placeholder:text-purple-400/50"
              />
            </div>
            <div>
              <label className="text-sm text-purple-300 mb-2 block">비밀번호</label>
              <Input 
                type="password"
                placeholder="비밀번호를 입력하세요" 
                className="bg-purple-900/20 border-purple-500/30 text-white placeholder:text-purple-400/50"
              />
            </div>
            <Button 
              onClick={() => {
                setShowLoginDialog(false);
                onNavigate('channel');
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/50"
            >
              로그인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}