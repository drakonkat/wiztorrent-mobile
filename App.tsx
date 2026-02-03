import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Header from './components/Header';
import TorrentCard from './components/TorrentCard';
import AddSheet from './components/AddSheet';
import DeleteModal from './components/DeleteModal';
import { translations } from './translations';
import { Plus } from 'lucide-react';
import { torrentStore } from './store';

const App: React.FC = observer(() => {
  const { 
    torrents, 
    isDark, 
    lang, 
    isAddSheetOpen, 
    torrentToDelete 
  } = torrentStore;

  const t = translations[lang];

  // Side effect for DOM manipulation (Theme)
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background text-slate-800 dark:text-slate-200 font-sans selection:bg-primary/30 transition-colors duration-300">
      
      {/* Mobile Frame Container */}
      <div className="max-w-2xl mx-auto min-h-screen bg-background shadow-2xl relative flex flex-col transition-colors duration-300">
        
        <Header 
          isDark={isDark} 
          toggleTheme={torrentStore.toggleTheme} 
          lang={lang} 
          setLang={torrentStore.setLanguage}
          title={t.title}
        />

        <main className="flex-1 p-4 pb-24 overflow-y-auto">
          {torrents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500 mt-20">
               <div className="w-20 h-20 bg-surfaceHighlight rounded-full flex items-center justify-center mb-4 text-primary">
                 <Plus size={32} />
               </div>
               <p className="text-lg">{t.emptyState}</p>
               <p className="text-sm opacity-60">{t.emptyStateSub}</p>
            </div>
          ) : (
            torrents.map(torrent => (
              <TorrentCard 
                key={torrent.id} 
                torrent={torrent} 
                onToggle={torrentStore.togglePause}
                onDelete={torrentStore.promptDelete} 
                lang={lang}
              />
            ))
          )}
        </main>

        <div className="absolute bottom-6 right-6 z-30">
          <button 
            onClick={() => torrentStore.setAddSheetOpen(true)}
            className="group flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-blue-600 text-white shadow-lg shadow-primary/40 hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <Plus size={28} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <AddSheet 
          isOpen={isAddSheetOpen} 
          onClose={() => torrentStore.setAddSheetOpen(false)} 
          onAdd={torrentStore.addTorrent}
          lang={lang}
        />

        <DeleteModal 
          isOpen={!!torrentToDelete}
          torrentName={torrentStore.torrentToDeleteName}
          onClose={torrentStore.cancelDelete}
          onConfirm={torrentStore.confirmDelete}
          lang={lang}
        />

      </div>
    </div>
  );
});

export default App;