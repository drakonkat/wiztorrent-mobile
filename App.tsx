import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { IonApp, IonContent, IonPage, IonFab, IonFabButton, IonIcon, setupIonicReact } from '@ionic/react';
import { add } from 'ionicons/icons';
import Header from './components/Header';
import TorrentCard from './components/TorrentCard';
import AddSheet from './components/AddSheet';
import DeleteModal from './components/DeleteModal';
import { translations } from './translations';
import { Plus } from 'lucide-react';
import { torrentStore } from './store';

// Initialize Ionic
setupIonicReact();

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
    <IonApp>
      <IonPage>
        <Header 
          isDark={isDark} 
          toggleTheme={torrentStore.toggleTheme} 
          lang={lang} 
          setLang={torrentStore.setLanguage}
          title={t.title}
        />

        <IonContent fullscreen className="bg-background">
          <div className="p-4 pb-24 min-h-full bg-background transition-colors duration-300">
            {torrents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
                <div className="w-20 h-20 bg-surfaceHighlight rounded-full flex items-center justify-center mb-4 text-primary animate-[pulse_3s_infinite]">
                  <Plus size={32} />
                </div>
                <p className="text-lg font-medium">{t.emptyState}</p>
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
          </div>

          {/* Ionic Floating Action Button */}
          <IonFab slot="fixed" vertical="bottom" horizontal="end" className="mb-4 mr-4">
            <IonFabButton 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Safe state update
                setTimeout(() => {
                    torrentStore.setAddSheetOpen(true);
                }, 0);
              }}
              className="animate-[fadeIn_0.5s_ease-out]"
              style={{
                '--background': 'linear-gradient(to top right, var(--color-primary), #60a5fa)',
                '--box-shadow': '0 10px 15px -3px rgba(167, 174, 240, 0.4)'
              }}
            >
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        </IonContent>

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
      </IonPage>
    </IonApp>
  );
});

export default App;