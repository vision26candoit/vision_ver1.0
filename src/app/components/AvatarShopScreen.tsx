import { useState } from 'react';
import { Coins, ShoppingCart, Sparkles, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface AvatarShopScreenProps {
  onNavigate: (screen: string) => void;
}

interface AvatarItem {
  id: number;
  name: string;
  emoji: string;
  price: number;
  category: string;
  isPurchased: boolean;
  isEquipped: boolean;
}

export function AvatarShopScreen({ onNavigate }: AvatarShopScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('character');
  const [userPoints, setUserPoints] = useState(350);
  const [selectedCharacter, setSelectedCharacter] = useState('🐼');
  const [showChargeDialog, setShowChargeDialog] = useState(false);
  const [selectedChargeAmount, setSelectedChargeAmount] = useState(100);
  const [equippedItems, setEquippedItems] = useState({
    hair: '🎩',
    accessory: '🕶️',
    outfit: '👔',
    makeup: '',
    vehicle: '🏍️',
  });

  const [items, setItems] = useState<AvatarItem[]>([
    // Characters
    { id: 1, name: '판다', emoji: '🐼', price: 0, category: 'character', isPurchased: true, isEquipped: true },
    { id: 2, name: '여우', emoji: '🦊', price: 100, category: 'character', isPurchased: true, isEquipped: false },
    { id: 3, name: '토끼', emoji: '🐰', price: 100, category: 'character', isPurchased: false, isEquipped: false },
    { id: 4, name: '코알라', emoji: '🐨', price: 150, category: 'character', isPurchased: false, isEquipped: false },
    { id: 5, name: '호랑이', emoji: '🐯', price: 150, category: 'character', isPurchased: false, isEquipped: false },
    { id: 6, name: '곰', emoji: '🐻', price: 100, category: 'character', isPurchased: false, isEquipped: false },
    
    // Hair
    { id: 11, name: '파티모자', emoji: '🎩', price: 0, category: 'hair', isPurchased: true, isEquipped: true },
    { id: 12, name: '왕관', emoji: '👑', price: 50, category: 'hair', isPurchased: false, isEquipped: false },
    { id: 13, name: '모자', emoji: '🧢', price: 30, category: 'hair', isPurchased: false, isEquipped: false },
    { id: 14, name: '헬멧', emoji: '⛑️', price: 40, category: 'hair', isPurchased: false, isEquipped: false },
    
    // Accessories
    { id: 21, name: '선글라스', emoji: '🕶️', price: 0, category: 'accessory', isPurchased: true, isEquipped: true },
    { id: 22, name: '안경', emoji: '👓', price: 30, category: 'accessory', isPurchased: false, isEquipped: false },
    { id: 23, name: '목도리', emoji: '🧣', price: 40, category: 'accessory', isPurchased: false, isEquipped: false },
    { id: 24, name: '넥타이', emoji: '👔', price: 35, category: 'accessory', isPurchased: false, isEquipped: false },
    
    // Outfits
    { id: 31, name: '정장', emoji: '👔', price: 0, category: 'outfit', isPurchased: true, isEquipped: true },
    { id: 32, name: '반팔티', emoji: '👕', price: 30, category: 'outfit', isPurchased: false, isEquipped: false },
    { id: 33, name: '반바지', emoji: '🩳', price: 30, category: 'outfit', isPurchased: false, isEquipped: false },
    { id: 34, name: '힙한 옷', emoji: '🧥', price: 60, category: 'outfit', isPurchased: false, isEquipped: false },
    { id: 35, name: '운동복', emoji: '🥋', price: 45, category: 'outfit', isPurchased: false, isEquipped: false },
    { id: 36, name: '드레스', emoji: '👗', price: 60, category: 'outfit', isPurchased: false, isEquipped: false },
    { id: 37, name: '후디', emoji: '🧣', price: 50, category: 'outfit', isPurchased: false, isEquipped: false },
    
    // Makeup
    { id: 41, name: '립스틱', emoji: '💄', price: 25, category: 'makeup', isPurchased: false, isEquipped: false },
    { id: 42, name: '블러셔', emoji: '😊', price: 20, category: 'makeup', isPurchased: false, isEquipped: false },
    
    // Vehicles
    { id: 51, name: '오토바이', emoji: '🏍️', price: 0, category: 'vehicle', isPurchased: true, isEquipped: true },
    { id: 52, name: '서핑보드', emoji: '🏄', price: 80, category: 'vehicle', isPurchased: false, isEquipped: false },
    { id: 53, name: '제트스키', emoji: '🚤', price: 120, category: 'vehicle', isPurchased: false, isEquipped: false },
    { id: 54, name: '스케이트보드', emoji: '🛹', price: 60, category: 'vehicle', isPurchased: false, isEquipped: false },
    { id: 55, name: '스쿠터', emoji: '🛴', price: 70, category: 'vehicle', isPurchased: false, isEquipped: false },
    { id: 56, name: '자전거', emoji: '🚲', price: 50, category: 'vehicle', isPurchased: false, isEquipped: false },
  ]);

  const categories = [
    { id: 'character', name: '캐릭터', icon: '🐾' },
    { id: 'hair', name: '헤어', icon: '👑' },
    { id: 'accessory', name: '악세사리', icon: '🕶️' },
    { id: 'outfit', name: '옷', icon: '👔' },
    { id: 'makeup', name: '메이크업', icon: '💄' },
    { id: 'vehicle', name: '탈것', icon: '🏍️' },
  ];

  const handlePurchase = (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    if (item && !item.isPurchased && userPoints >= item.price) {
      setUserPoints(userPoints - item.price);
      setItems(items.map(i => 
        i.id === itemId ? { ...i, isPurchased: true } : i
      ));
    }
  };

  const handleEquip = (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    if (item && item.isPurchased) {
      if (item.category === 'character') {
        setSelectedCharacter(item.emoji);
        setItems(items.map(i => 
          i.category === 'character' 
            ? { ...i, isEquipped: i.id === itemId } 
            : i
        ));
      } else {
        const categoryMap: { [key: string]: keyof typeof equippedItems } = {
          'hair': 'hair',
          'accessory': 'accessory',
          'outfit': 'outfit',
          'makeup': 'makeup',
          'vehicle': 'vehicle',
        };
        
        const key = categoryMap[item.category];
        setEquippedItems({ ...equippedItems, [key]: item.emoji });
        setItems(items.map(i => 
          i.category === item.category 
            ? { ...i, isEquipped: i.id === itemId } 
            : i
        ));
      }
    }
  };

  const handleUnequip = (category: string) => {
    const categoryMap: { [key: string]: keyof typeof equippedItems } = {
      'hair': 'hair',
      'accessory': 'accessory',
      'outfit': 'outfit',
      'makeup': 'makeup',
      'vehicle': 'vehicle',
    };
    
    const key = categoryMap[category];
    setEquippedItems({ ...equippedItems, [key]: '' });
    setItems(items.map(i => 
      i.category === category ? { ...i, isEquipped: false } : i
    ));
  };

  const filteredItems = items.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0A0F2A] px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              아바타 상점
            </h1>
            <p className="text-purple-300">캐릭터를 꾸미고 게임에서 나만의 스타일을 뽐내세요</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 rounded-xl px-6 py-3 border border-yellow-500/30 flex items-center gap-3">
              <Coins className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-xl">{userPoints} 포인트</span>
            </div>
            <button
              onClick={() => setShowChargeDialog(true)}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>충전하기</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Left - Character Preview */}
          <div className="w-96">
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl p-8 border border-purple-500/30 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-6 text-center">미리보기</h3>
              
              {/* Character Display */}
              <div className="bg-purple-900/30 rounded-2xl p-8 mb-6 relative overflow-hidden">
                {/* Background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"></div>
                
                <div className="relative z-10 text-center">
                  {/* Character with accessories */}
                  <div className="relative inline-block mb-4">
                    {/* Hair */}
                    {equippedItems.hair && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl animate-bounce">
                        {equippedItems.hair}
                      </div>
                    )}
                    
                    {/* Main Character */}
                    <div className="text-9xl">{selectedCharacter}</div>
                    
                    {/* Accessory */}
                    {equippedItems.accessory && (
                      <div className="absolute top-8 right-2 text-3xl animate-pulse">
                        {equippedItems.accessory}
                      </div>
                    )}
                    
                    {/* Makeup */}
                    {equippedItems.makeup && (
                      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-2xl">
                        {equippedItems.makeup}
                      </div>
                    )}
                  </div>
                  
                  {/* Outfit */}
                  {equippedItems.outfit && (
                    <div className="text-5xl mb-4">{equippedItems.outfit}</div>
                  )}
                  
                  {/* Vehicle */}
                  {equippedItems.vehicle && (
                    <div className="text-6xl animate-bounce">{equippedItems.vehicle}</div>
                  )}
                </div>
              </div>

              {/* Equipped Items List */}
              <div className="bg-purple-900/20 rounded-xl p-4 border border-purple-500/20 mb-4">
                <h4 className="text-white font-bold mb-3 text-sm">착용 중인 아이템</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-purple-300">
                    <span>헤어:</span>
                    <span className="text-white">{equippedItems.hair || '없음'}</span>
                  </div>
                  <div className="flex items-center justify-between text-purple-300">
                    <span>악세사리:</span>
                    <span className="text-white">{equippedItems.accessory || '없음'}</span>
                  </div>
                  <div className="flex items-center justify-between text-purple-300">
                    <span>옷:</span>
                    <span className="text-white">{equippedItems.outfit || '없음'}</span>
                  </div>
                  <div className="flex items-center justify-between text-purple-300">
                    <span>메이크업:</span>
                    <span className="text-white">{equippedItems.makeup || '없음'}</span>
                  </div>
                  <div className="flex items-center justify-between text-purple-300">
                    <span>탈것:</span>
                    <span className="text-white">{equippedItems.vehicle || '없음'}</span>
                  </div>
                </div>
              </div>
              
              {/* MyPage Button */}
              <button
                onClick={() => onNavigate('mypage')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <User className="w-5 h-5" />
                <span>마이페이지</span>
              </button>
            </div>
          </div>

          {/* Right - Shop Items */}
          <div className="flex-1">
            {/* Category Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-purple-900/30 text-purple-300 hover:bg-purple-800/40 border border-purple-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span className="font-bold">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-gradient-to-br rounded-xl p-6 border transition-all ${
                    item.isEquipped
                      ? 'from-green-900/40 to-green-800/30 border-green-500/50 shadow-lg shadow-green-500/30'
                      : item.isPurchased
                      ? 'from-purple-900/40 to-pink-900/40 border-purple-500/30 hover:border-purple-400/50'
                      : 'from-gray-900/40 to-gray-800/30 border-gray-500/30 hover:border-gray-400/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-3">{item.emoji}</div>
                    <h4 className="text-white font-bold mb-2">{item.name}</h4>
                    
                    {item.isEquipped ? (
                      <button
                        onClick={() => handleUnequip(item.category)}
                        className="w-full bg-green-600/50 hover:bg-green-600/70 text-white px-4 py-2 rounded-lg font-bold transition-all"
                      >
                        착용 중 ✓
                      </button>
                    ) : item.isPurchased ? (
                      <button
                        onClick={() => handleEquip(item.id)}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-bold transition-all"
                      >
                        착용하기
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePurchase(item.id)}
                        disabled={userPoints < item.price}
                        className={`w-full px-4 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                          userPoints >= item.price
                            ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white'
                            : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>{item.price}P</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charge Dialog */}
      <Dialog open={showChargeDialog} onOpenChange={setShowChargeDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>포인트 충전하기</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setSelectedChargeAmount(100)}
              className={`bg-yellow-600/50 hover:bg-yellow-600/70 text-white px-3 py-2 rounded-lg text-sm transition-all ${
                selectedChargeAmount === 100 ? 'bg-yellow-600/70' : ''
              }`}
            >
              +100P
            </button>
            <button 
              onClick={() => setSelectedChargeAmount(500)}
              className={`bg-yellow-600/50 hover:bg-yellow-600/70 text-white px-3 py-2 rounded-lg text-sm transition-all ${
                selectedChargeAmount === 500 ? 'bg-yellow-600/70' : ''
              }`}
            >
              +500P
            </button>
          </div>
          <button
            onClick={() => {
              setUserPoints(userPoints + selectedChargeAmount);
              setShowChargeDialog(false);
            }}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-4 py-2 rounded-lg font-bold transition-all mt-4"
          >
            충전하기
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}