import React, { useState } from 'react';
import { NavTab } from './types';
import Feed from './components/Feed';
import OutfitDesigner from './components/OutfitDesigner';
import Routines from './components/Routines';
import Consultation from './components/Consultation';
import BusinessHub from './components/BusinessHub';
import Membership from './components/Membership';
import Profile from './components/Profile';
import SearchResults from './components/SearchResults';
import { 
  Home, 
  Shirt, 
  Calendar, 
  Mic2, 
  Briefcase, 
  Crown, 
  Bell, 
  Search, 
  PlusCircle, 
  UserCircle,
  X,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const AIChat: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 w-[calc(100vw-32px)] md:w-96 bg-white border border-slate-200 rounded-[2.5rem] shadow-[0_10px_50px_rgba(0,0,0,0.1)] z-[100] animate-in slide-in-from-bottom-4 duration-300 flex flex-col overflow-hidden">
      <div className="bg-orange-600 p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl"><Sparkles className="w-5 h-5 text-white" /></div>
          <div>
            <h4 className="font-black text-white leading-none">AI Stylist</h4>
            <p className="text-[10px] text-white/70 font-bold uppercase mt-1 tracking-widest">Online Assistant</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-white" /></button>
      </div>
      <div className="flex-1 p-6 h-80 overflow-y-auto space-y-4 bg-slate-50">
        <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 max-w-[80%] shadow-sm">
          <p className="text-sm text-slate-700">Hello Alex! Ready for a glow up today? I remember you were looking at "Streetwear" outfits yesterday. Need a suggestion?</p>
        </div>
      </div>
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="bg-slate-50 flex items-center gap-2 p-2 rounded-2xl border border-slate-200">
          <input placeholder="Ask me anything..." className="bg-transparent border-none outline-none text-sm px-3 flex-1 text-slate-900" />
          <button className="bg-orange-600 p-2 rounded-xl"><ArrowRight className="w-4 h-4 text-white" /></button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>(NavTab.FEED);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    setSearchQuery('');
  };

  const renderContent = () => {
    if (searchQuery.trim().length > 0) {
      return (
        <SearchResults 
          query={searchQuery} 
          onNavigate={(tab) => {
            setActiveTab(tab);
            setSearchQuery('');
          }} 
        />
      );
    }
    switch (activeTab) {
      case NavTab.FEED: return <Feed />;
      case NavTab.STYLING: return <OutfitDesigner />;
      case NavTab.ROUTINES: return <Routines />;
      case NavTab.LIVE: return <Consultation />;
      case NavTab.BUSINESS: return <BusinessHub />;
      case NavTab.MEMBERSHIP: return <Membership />;
      case NavTab.PROFILE: return <Profile />;
      default: return <Feed />;
    }
  };

  const navItems = [
    { id: NavTab.FEED, icon: Home, label: 'Feed' },
    { id: NavTab.STYLING, icon: Shirt, label: 'Styling' },
    { id: NavTab.LIVE, icon: Mic2, label: 'Consult' },
    { id: NavTab.BUSINESS, icon: Briefcase, label: 'Gigs' },
    { id: NavTab.ROUTINES, icon: Calendar, label: 'Routine' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-72 h-screen flex-col bg-white border-r border-slate-200 p-6 sticky top-0 overflow-y-auto z-40">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent uppercase">HelpQuirk</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold group ${
                activeTab === item.id && !searchQuery
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110`} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-2">
          <button 
            onClick={() => handleTabChange(NavTab.MEMBERSHIP)}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group border-2 ${
              activeTab === NavTab.MEMBERSHIP && !searchQuery
              ? 'bg-gradient-to-r from-orange-500 to-amber-600 border-orange-400 text-white shadow-md' 
              : 'border-orange-500/20 text-orange-600 hover:bg-orange-50'
            }`}
          >
            <Crown className="w-5 h-5 fill-current" />
            <span className="font-bold uppercase tracking-widest text-[10px]">Upgrade Elite</span>
          </button>
          
          <button 
            onClick={() => handleTabChange(NavTab.PROFILE)}
            className={`w-full p-4 rounded-2xl flex items-center gap-3 transition-all ${
              activeTab === NavTab.PROFILE && !searchQuery ? 'bg-slate-100 ring-1 ring-orange-500/50' : 'bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300">
              <img src="https://picsum.photos/seed/alex/100/100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 overflow-hidden text-left">
              <p className="text-sm font-bold truncate text-slate-900">Alex Style</p>
              <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Free User</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 bg-slate-50 relative">
        <div className="hidden md:flex p-6 justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
           <div className="flex items-center gap-4 bg-slate-100 px-5 py-3 rounded-full border border-slate-200 w-[450px] focus-within:ring-2 focus-within:ring-orange-500 transition-all">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search styles, experts, or gigs..." 
                className="bg-transparent border-none outline-none text-sm w-full font-medium text-slate-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && <X className="w-4 h-4 cursor-pointer text-slate-400" onClick={() => setSearchQuery('')} />}
           </div>
           <div className="flex items-center gap-6">
              <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
                <Bell className="w-5 h-5 text-slate-500" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <button className="bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-2xl flex items-center gap-3 text-sm font-black text-white transition-all active:scale-95 shadow-xl shadow-orange-600/20">
                <PlusCircle className="w-4 h-4" />
                POST LOOK
              </button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-24 md:pb-10">
          {renderContent()}
        </div>

        {/* Global Floating Actions */}
        <button 
          onClick={() => setIsChatOpen(true)}
          className={`fixed bottom-24 right-4 md:bottom-8 md:right-8 bg-orange-600 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 ${isChatOpen ? 'scale-0' : 'scale-100'}`}
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </button>
        
        <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

        {/* Bottom Nav - Mobile */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-slate-200 p-2 px-6 flex justify-between items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`flex flex-col items-center p-2 transition-all ${
                activeTab === item.id ? 'text-orange-600 scale-110' : 'text-slate-400'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[9px] mt-1 font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
          <button onClick={() => handleTabChange(NavTab.PROFILE)} className={`flex flex-col items-center p-2 ${activeTab === NavTab.PROFILE ? 'text-orange-600' : 'text-slate-400'}`}>
            <UserCircle className="w-6 h-6" />
            <span className="text-[9px] mt-1 font-black uppercase tracking-widest">Me</span>
          </button>
        </nav>
      </main>
    </div>
  );
};

export default App;