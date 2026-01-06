import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { EntryScreen } from './components/EntryScreen';
import { ChannelSelectScreen } from './components/ChannelSelectScreen';
import { MatchingScreen } from './components/MatchingScreen';
import { PlayScreen } from './components/PlayScreen';
import { BlockPuzzleScreen } from './components/BlockPuzzleScreen';
import { ResultScreen } from './components/ResultScreen';
import { MyPageScreen } from './components/MyPageScreen';
import { ReportScreen } from './components/ReportScreen';
import { RecommendationScreen } from './components/RecommendationScreen';
import { AvatarShopScreen } from './components/AvatarShopScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('entry');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'entry':
        return <EntryScreen onNavigate={setCurrentScreen} />;
      case 'channel':
        return <ChannelSelectScreen onNavigate={setCurrentScreen} />;
      case 'matching':
        return <MatchingScreen onNavigate={setCurrentScreen} />;
      case 'play':
        return <PlayScreen onNavigate={setCurrentScreen} />;
      case 'blockpuzzle':
        return <BlockPuzzleScreen onNavigate={setCurrentScreen} />;
      case 'result':
        return <ResultScreen onNavigate={setCurrentScreen} />;
      case 'mypage':
        return <MyPageScreen onNavigate={setCurrentScreen} />;
      case 'report':
        return <ReportScreen onNavigate={setCurrentScreen} />;
      case 'recommendation':
        return <RecommendationScreen onNavigate={setCurrentScreen} />;
      case 'avatarshop':
        return <AvatarShopScreen onNavigate={setCurrentScreen} />;
      default:
        return <EntryScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F2A]">
      {currentScreen !== 'entry' && (
        <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}
      {renderScreen()}
    </div>
  );
}